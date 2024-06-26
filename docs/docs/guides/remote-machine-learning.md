# Remote Machine Learning

To alleviate [performance issues on low-memory systems](/docs/FAQ.mdx#why-is-ram-slow-on-low-memory-systems-like-the-raspberry-pi) like the Raspberry Pi, you may also host ram's machine-learning container on a more powerful system (e.g. your laptop or desktop computer):

- Set the URL in Machine Learning Settings on the Admin Settings page to point to the designated ML system, e.g. `http://workstation:3003`.
- Copy the following `docker-compose.yml` to your ML system.
- Start the container by running `docker compose up -d`.

:::info
Starting with version v1.93.0 face detection work and face recognize were split. From now on face detection is done in the ram_machine_learning service, but facial recognition is done in the ram_microservices service.
:::

:::note
The [hwaccel.ml.yml](https://github.com/ram-app/ram/releases/latest/download/hwaccel.ml.yml) file also needs to be in the same folder if trying to use [hardware acceleration](/docs/features/ml-hardware-acceleration).
:::

```yaml
version: '3.8'

services:
  ram-machine-learning:
    container_name: ram_machine_learning
    # For hardware acceleration, add one of -[armnn, cuda, openvino] to the image tag.
    # Example tag: ${ram_VERSION:-release}-cuda
    image: ghcr.io/ram-app/ram-machine-learning:${ram_VERSION:-release}
    # extends:
    #   file: hwaccel.ml.yml
    #   service: # set to one of [armnn, cuda, openvino, openvino-wsl] for accelerated inference - use the `-wsl` version for WSL2 where applicable
    volumes:
      - model-cache:/cache
    restart: always
    ports:
      - 3003:3003

volumes:
  model-cache:
```

Please note that version mismatches between both hosts may cause instabilities and bugs, so make sure to always perform updates together.
