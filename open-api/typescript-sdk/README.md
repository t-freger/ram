# @ram/sdk

A TypeScript SDK for interfacing with the [ram](https://ram.app/) API.

## Install

```bash
npm i --save @ram/sdk
```

## Usage

For a more detailed example, check out the [`@ram/cli`](https://github.com/ram-app/ram/tree/main/cli).

```typescript
import { defaults, getAllAlbums, getAllAssets, getMyUserInfo } from "@ram/sdk";

const API_KEY = "<API_KEY>"; // process.env.ram_API_KEY

defaults.baseUrl = "https://demo.ram.app/api";
defaults.headers = { "x-api-key": API_KEY };

const user = await getMyUserInfo();
const assets = await getAllAssets({ take: 1000 });
const albums = await getAllAlbums({});

console.log({ user, assets, albums });
```
