# Radarbots.js

An unofficial package for interacting with the [Radar Bot Directory](https://radarcord.net) API, rewritten to TypeScript.

---

## Table of Contents

[Features](#features)

[Installation](#installation)

[Usage](#usage)

[License](#license)

[Note](#note)

---

## Features

- Actual TypeScript support (not provided in the old package).

- Support for the new site URL ([located here](https://radarcord.net)).

- Autoposting stats supported (not provided in the old package).

---

## Installation

**NPM:**

```powershell
npm install @yoshiboi18303/radarbots.js
```

**Yarn:**

```powershell
yarn add @yoshiboi18303/radarbots.js
```

**PNPM:**

```powershell
pnpm install @yoshiboi18303/radarbots.js
```

---

## Usage

```ts
import Discord from "discord.js";
import Radar from "@yoshiboi18303/radarbots.js";

const client = new Discord.Client({
  intents: new Discord.IntentsBitField(["Guilds"]),
});
const radar = new Radar(client, "your token goes here");

client.on("ready", async () => {
  console.log("The client is ready!");

  // Post stats to the API
  await radar.postStats().catch(console.error);
});

// Login to Discord
client.login("your bot token");
```

**More examples in the [examples](https://github.com/Yoshiboi18303/radarbots.js-rewrite/tree/main/examples)**

---

## License

This package is licensed with the [MIT License](https://github.com/Yoshiboi18303/radarbots.js-rewrite/blob/main/LICENSE).

---

## Note

This is my first attempt at TypeScript support, so don't expect perfection, if you find any issues, please open and issue and/or let me know.

---

Made with ❤️ _(and TypeScript)_ by [Yoshiboi18303](https://github.com/Yoshiboi18303).
