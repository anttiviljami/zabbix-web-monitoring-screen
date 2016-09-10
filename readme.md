# Zabbix Web Monitoring Screen
[![License](http://img.shields.io/:license-mit-blue.svg)](http://mit-license.org)

A tiny React single page app that can be used to monitor Zabbix web scenarios from a single screen.

## Screenshots

![Screenshot 1](/assets/screenshot-1.png)

## Building and running the Docker image

This is the easiest way to run the node app. Just build the image:

```
docker build -t anttiviljami/zabbix-web-monitoring-screen .
```

... and run the app on your desired port.

```
docker run -e NODE_ENV=production -e ZABBIX_URL=https://zabbix.example.com -e ZABBIX_USER=swd -e ZABBIX_PASS=xxx -e ZABBIX_HOST=xxx -p <myport>:3001 -d anttiviljami/zabbix-web-monitoring-screen
```

## Install

Clone repository and run:

```sh
$ npm install
```

Alternatively, you can deploy your own copy with one click using this button:

## Requirements

node 5+

## Development

```sh
$ npm start
```

Go to [http://localhost:3001](http://localhost:3001) and see the magic happen.

## Production

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`.

```sh
$ NODE_ENV=production npm start
```

Also build the production bundle:

```sh
$ npm run dist
```

## Tests

```sh
$ npm test
```

Only run specific tests

```sh
$ npm test -- NotFoundComponent
```

Coverage

```sh
$ npm test -- --coverage
```
