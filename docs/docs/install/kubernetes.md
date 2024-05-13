---
sidebar_position: 40
---

# Kubernetes

You can deploy ram on Kubernetes using [the official Helm chart](https://github.com/ram-app/ram-charts/blob/main/README.md).

You can view some [examples](https://kubesearch.dev/#/ram) of how other people run ram on Kubernetes, using the official chart or otherwise.

:::caution DNS in Alpine containers
ram makes use of Alpine container images. These can encounter [a DNS resolution bug](https://stackoverflow.com/a/65593511) on Kubernetes clusters if the host
nodes have a search domain set, like:

```
$ cat /etc/resolv.conf
search home.lan
nameserver 192.168.1.1
```

:::
