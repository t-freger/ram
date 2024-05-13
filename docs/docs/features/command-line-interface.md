# The ram CLI

ram has a command line interface (CLI) that allows you to perform certain actions from the command line.

## Features

- Upload photos and videos to ram
- Check server version

More features are planned for the future.

:::tip Google Photos Takeout
If you are looking to import your Google Photos takeout, we recommend this community maintained tool [ram-go](https://github.com/simulot/ram-go)
:::

## Requirements

- Node.js 20 or above
- Npm

If you can't install node/npm, there is also a Docker version available below.

## Installation (NPM)

```bash
npm i -g @ram/cli
```

NOTE: if you previously installed the legacy CLI, you will need to uninstall it first:

```bash
npm uninstall -g ram
```

## Installation (Docker)

If npm is not available on your system you can try the Docker version

```bash
docker run -it -v "$(pwd)":/import:ro -e ram_INSTANCE_URL=https://your-ram-instance/api -e ram_API_KEY=your-api-key ghcr.io/ram-app/ram-cli:latest
```

Please modify the `ram_INSTANCE_URL` and `ram_API_KEY` environment variables as suitable. You can also use a Docker env file to store your sensitive API key.

## Usage

<details>
<summary>Usage</summary>

```
$ ram
Usage: ram [options] [command]

Command line interface for ram

Options:
  -V, --version                       output the version number
  -d, --config-directory <directory>  Configuration directory where auth.yml will be stored (default: "~/.config/ram/", env:
                                      ram_CONFIG_DIR)
  -u, --url [url]                     ram server URL (env: ram_INSTANCE_URL)
  -k, --key [key]                     ram API key (env: ram_API_KEY)
  -h, --help                          display help for command

Commands:
  login|login-key <url> <key>         Login using an API key
  logout                              Remove stored credentials
  server-info                         Display server information
  upload [options] [paths...]         Upload assets
  help [command]                      display help for command
```

</details>

## Commands

The upload command supports the following options:

<details>
<summary>Options</summary>

```
Usage: ram upload [paths...] [options]

Upload assets

Arguments:
paths                       One or more paths to assets to be uploaded

Options:
-r, --recursive             Recursive (default: false, env: ram_RECURSIVE)
-i, --ignore [paths...]     Paths to ignore (default: [], env: ram_IGNORE_PATHS)
-h, --skip-hash             Don't hash files before upload (default: false, env: ram_SKIP_HASH)
-H, --include-hidden        Include hidden folders (default: false, env: ram_INCLUDE_HIDDEN)
-a, --album                 Automatically create albums based on folder name (default: false, env: ram_AUTO_CREATE_ALBUM)
-A, --album-name <name>     Add all assets to specified album (env: ram_ALBUM_NAME)
-n, --dry-run               Don't perform any actions, just show what will be done (default: false, env: ram_DRY_RUN)
-c, --concurrency <number>  Number of assets to upload at the same time (default: 4, env: ram_UPLOAD_CONCURRENCY)
--delete                    Delete local assets after upload (env: ram_DELETE_ASSETS)
--help                      display help for command
```

</details>

Note that the above options can read from environment variables as well.

## Quick Start

You begin by authenticating to your ram server. For instance:

```bash
# ram login [url] [key]
ram login http://192.168.1.216:2283/api HFEJ38DNSDUEG
```

This will store your credentials in a `auth.yml` file in the configuration directory which defaults to `~/.config/`. The directory can be set with the `-d` option or the environment variable `ram_CONFIG_DIR`. Please keep the file secure, either by performing the logout command after you are done, or deleting it manually.

Once you are authenticated, you can upload assets to your ram server.

```bash
ram upload file1.jpg file2.jpg
```

By default, subfolders are not included. To upload a directory including subfolder, use the --recursive option:

```bash
ram upload --recursive directory/
```

If you are unsure what will happen, you can use the `--dry-run` option to see what would happen without actually performing any actions.

```bash
ram upload --dry-run --recursive directory/
```

By default, the upload command will hash the files before uploading them. This is to avoid uploading the same file multiple times. If you are sure that the files are unique, you can skip this step by passing the `--skip-hash` option. Note that ram always performs its own deduplication through hashing, so this is merely a performance consideration. If you have good bandwidth it might be faster to skip hashing.

```bash
ram upload --skip-hash --recursive directory/
```

You can automatically create albums based on the folder name by passing the `--album` option. This will automatically create albums for each uploaded asset based on the name of the folder they are in.

```bash
ram upload --album --recursive directory/
```

You can also choose to upload all assets to a specific album with the `--album-name` option.

```bash
ram upload --album-name "My summer holiday" --recursive directory/
```

It is possible to skip assets matching a glob pattern by passing the `--ignore` option. See [the library documentation](docs/features/libraries.md) on how to use glob patterns. You can add several exclusion patterns if needed.

```bash
ram upload --ignore **/Raw/** --recursive directory/
```

```bash
ram upload --ignore **/Raw/** **/*.tif --recursive directory/
```

By default, hidden files are skipped. If you want to include hidden files, use the `--include-hidden` option:

```bash
ram upload --include-hidden --recursive directory/
```

### Obtain the API Key

The API key can be obtained in the user setting panel on the web interface.

![Obtain Api Key](./img/obtain-api-key.png)
