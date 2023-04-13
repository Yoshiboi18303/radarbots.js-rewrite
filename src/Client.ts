import Discord from "discord.js";
import superagent, { Response } from "superagent";

type ReadOnlyArray<T = unknown> = readonly T[];
interface Review {
  /**
   * The content of the review.
   */
  content: string;
  /**
   * How many stars the review has.
   */
  stars: number;
  /**
   * The Discord ID of the user that posted the review.
   */
  reviewer: Discord.Snowflake;
}

const apiLink: string = "https://radarcord.net/api";

async function makeRadarPost(
  id: string,
  token: string,
  serverCount: number,
  shardCount: number = 0
): Promise<Response> {
  const request = superagent
    .post(`${apiLink}/bot/${id}/stats`)
    .set("Authorization", token)
    .send({ shards: shardCount, guilds: serverCount });
  return await request;
}

async function getRadarReviews(id: string): Promise<Response> {
  const request = superagent.get(`${apiLink}/bot/${id}/reviews`);
  return await request;
}

export default class Client {
  /**
   * All reviews on your client.
   */
  public reviews: ReadOnlyArray<Review> | null = null;

  // Private properties
  private client: Discord.Client;
  private token: string;
  private autopostId: NodeJS.Timer | null = null;

  /**
   * Initializes the `Radar` client.
   * @param client Your `discord.js` client.
   * @param token The token found on your profile page on the Radar Bot Directory website.
   */
  constructor(client: Discord.Client, token: string) {
    if (!(client instanceof Discord.Client))
      throw new Error(
        "The `client` argument must be a instance of `Discord.Client`!"
      );
    if (!token) throw new Error("Token is required, please pass one in!");
    this.client = client;
    this.token = token;
  }

  /**
   * Posts stats to the API
   * @param shardCount How many shards your bot has, defaults to `0`.
   * @param autopostInterval How long in-between posts to post another set of stats, defaults to `null`. If `null`, this will send one post and then return.
   * @returns The `Response` from the API.
   */
  async postStats(
    autopostInterval: number | null = null,
    shardCount: number = 0
  ): Promise<Response> {
    if (!autopostInterval) {
      return await makeRadarPost(
        this.client.user!.id,
        this.token,
        this.client.guilds.cache.size,
        shardCount
      );
    } else {
      const initialResponse = await makeRadarPost(
        this.client.user!.id,
        this.token,
        this.client.guilds.cache.size,
        shardCount
      );
      this.autopostId = setInterval(async () => {
        await makeRadarPost(
          this.client.user!.id,
          this.token,
          this.client.guilds.cache.size,
          shardCount
        );
      }, autopostInterval);
      return initialResponse;
    }
  }

  /**
   * Stops autoposting, if `this.autopostId` is `null`, this function will throw an error.
   */
  stopPosting(): void {
    if (!this.autopostId)
      throw new Error("This package is not autoposting currently!");
    clearInterval(this.autopostId);
  }

  /**
   * Gets all the reviews from your client on the Radar Bot Directory API, and updates `this.reviews` with the reviews.
   * @returns A **READ ONLY** array of `Review`s
   */
  async getReviews(): Promise<ReadOnlyArray<Review>> {
    return new Promise<ReadOnlyArray<Review>>(async (resolve, reject) => {
      const response = await getRadarReviews(this.client.user!.id);

      if (response.notFound) reject(`Bot ID not found: ${response.body}`);

      const reviewsOnApi = response.body.reviews;

      const reviews: Review[] = [];

      for (const review of reviewsOnApi) {
        const newReview: Review = {
          content: review.content,
          stars: parseInt(review.stars),
          reviewer: review.userid,
        };

        reviews.push(newReview);
      }

      const value = Object.freeze(reviews);

      this.reviews = value;

      resolve(value);
    });
  }
}
