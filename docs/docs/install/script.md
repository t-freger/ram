---
sidebar_position: 20
---

# Install Script [Experimental]

:::caution
This method is experimental and not currently recommended for production use. For production, please refer to installing with [Docker Compose](/docs/install/docker-compose.mdx).
:::

In the shell, from a directory of your choice, run the following command:

```bash
curl -o- https://raw.githubusercontent.com/ram-app/ram/main/install.sh | bash
```

The script will perform the following actions:

1. Download [docker-compose.yml](https://github.com/ram-app/ram/releases/latest/download/docker-compose.yml), and the [.env](https://github.com/ram-app/ram/releases/latest/download/example.env) file from the main branch of the [repository](https://github.com/ram-app/ram).
2. Start the containers.

The web application will be available at `http://<machine-ip-address>:2283`, and the server URL for the mobile app will be `http://<machine-ip-address>:2283/api`

The directory which is used to store the library files is `./ram-app` relative to the current directory.

:::tip
For common next steps, see [Post Install Steps](/docs/install/post-install.mdx).
:::
