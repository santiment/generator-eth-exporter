# Export ETH events to an analytics DB

This is an exporter for Ethereum events to an analytics DB. The pipeline provides real-time updates to the data in the DB, so the events can be queries using SQL as they are decoded.

## Usage

You need to connect to an ETH full node. Either run an ETH node yourself or reguster for an (https://infura.io)[Infura] account. After you get the URL to the full node, set that as an ENV variable in the `docker-compose.yaml` file for the `PARITY_URL`.

Other useful ENV variables when running this:

* `KAFKA_TOPIC` - the name of the topic in which to export the data. If you change this, don't forget to also change the `create_tables.sql` file and set the name of the correct topic the DB need to read from.
* `START_BLOCK` - the block from which to start exporting the events

To run the exporter do:

```
$ docker-compose up --build
```

This is going to run the whole pipeline, including the analytics DB.

To connect to the analytics DB and make queries:

```
$ docker-compose exec clickhouse clickhouse-client
```

See the documentation of the DB for details how to run queries: https://clickhouse.yandex/docs/en/