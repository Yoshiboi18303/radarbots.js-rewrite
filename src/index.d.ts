import Discord from "discord.js";
import type { Response } from "superagent";

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

declare module "@yoshiboi18303/radarbots.js" {
  class Client {
    public reviews: ReadOnlyArray<Review> | null;
    private client: Discord.Client;
    private token: string;
    private autopostId: NodeJS.Timer | null;

    /**
     * Initializes the `Radar` client.
     * @param client Your `discord.js` client.
     * @param token The token found on your profile page on the Radar Bot Directory website.
     */
    constructor(client: Discord.Client, token: string);

    /**
     * Posts stats to the API
     * @param shardCount How many shards your bot has, defaults to `0`.
     * @param autopostInterval How long in-between posts to post another set of stats, defaults to `null`. If `null`, this will send one post and then return.
     * @returns The `Response` from the API.
     */
    postStats(
      autopostInterval?: number | null,
      shardCount?: number
    ): Promise<Response>;

    /**
     * Stops autoposting, if `this.autopostId` is `null`, this function will throw an error.
     */
    stopPosting(): void;

    /**
     * Gets all the reviews from your client on the Radar Bot Directory API, and updates `this.reviews` with the reviews.
     * @returns A **READ ONLY** array of `Review`s
     */
    getReviews(): Promise<ReadOnlyArray<Review>>;
  }
}
