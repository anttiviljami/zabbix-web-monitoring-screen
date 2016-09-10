# Zabbix Web Monitoring Screen
[![License](http://img.shields.io/:license-mit-blue.svg)](http://mit-license.org)

A tiny React single page app that can be used to monitor Zabbix web scenarios from a single screen.

## Screenshots

![Screenshot 1](/assets/screenshot-1.png)

## Running the Docker image

This is the easiest way to run the node app. Simply run the anttiviljami/zabbix-web-monitoring-screen:latest docker image with your settings

```
docker run -e ZABBIX_URL=https://zabbix.example.com -e ZABBIX_USER=<user> -e ZABBIX_PASS=<pass> -e ZABBIX_HOST=<hostid> -p 3001:3001 -d anttiviljami/zabbix-web-monitoring-screen
```

You can now visit http://localhost:3001 to see the app running.

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
