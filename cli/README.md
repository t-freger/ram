A command-line interface for interfacing with the self-hosted photo manager [ram](https://ram.app/).

Please see the [ram CLI documentation](https://ram.app/docs/features/command-line-interface).

# For developers

To run the ram CLI from source, run the following in the cli folder:

    $ npm run build
    $ ts-node .

You'll need ts-node, the easiest way to install it is to use npm:

    $ npm i -g ts-node

You can also build and install the CLI using

    $ npm run build
    $ npm install -g .
