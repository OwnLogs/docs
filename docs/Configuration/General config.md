# Environment variables

By default, environment variables are generated randomly when building the app first and stores in the root `.env` file. If you want to change them you can and they will be automatically transferred to the child containers when building.

# Docker config

All of the Docker config takes place in the `docker-compose.yaml` file. You can change pots, services and others although we **DO NOT RECOMMEND IT**. You can change the default config at your risks and perils.

# Backend config

The backend configuration is very straight forward and is done in a single file : `shared/backend.config.ts`.

## Server

The server caches data to reduce the number of requests to the database.By default this cache is kept for `5 minutes`. You can change this by setting the `cachingTime` field in the config. This field is a duration in **seconds**.

### IP filtering

By default, when using the package to post logs to the server, only localhost is allowed. Other ip's are filtered. To allow ip's, add the `allowedIps` in the config. This field represents an array of ip's who are allowed to save logs to the database. When an unauthorized server makes a request, a message detailing the request and the server's ip to make it easier to allow it.

## Database

The database object field in the config is made of 4 different fields :

- `max_database_size` : This field represents the maximum allowed size that the database can grow up to. If this database exceeds this size, the oldest logs will be pruned. (Default: `1 * 1024 * 1024 * 1024`: `1Gb`)
- `prune_batch_size` : When pruning old logs, the server will automatically delete them by batch. This fields represents the number of logs deleted each time. (Default: `1000`)
- `prune_interval` : This is the interval at witch the server will check the database size and prune logs if necessary

## SMTP

The SMTP is used to send email alerts when **error** and **fatal** logs. To configure it, yo need to specify the following fields :

- `host` : The url of your SMTP.
- `port` : The port used by the SMTP. (Default: `587`).
- `secure` : If the SMTP uses SSL. (Default: `false`).
- `auth`
  - `user` : The username used to log into the SMTP.
  - `pass` : The password used to log into the SMTP.

## Monitoring

Server monitoring is done automatically. at regular interval. The monitoring configuration is done thru the `monitoring` object in the config.
This object contains the following field :

- `check_interval` : The interval in seconds at witch all of the server fill be check to see if they're online or not. (Default: `1000 * 60 * 5` (`5 minutes`))
