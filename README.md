# Node People Web

[![BuildStatus](https://travis-ci.org/stevenalexander/node-people-web.svg?branch=master)](https://travis-ci.org/stevenalexander/node-people-web?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Simple [Express](https://expressjs.com/) People HTML application using [node-people-api](https://github.com/stevenalexander/node-people-api) for data.

Using as part of testing various build/containerisation PoCs.

## Requires

* [Node](https://nodejs.org/en/)
* [Docker](https://www.docker.com/) (optional)

## Run

```
npm install

# available http://localhost:3000
npm start
```

### Run in container

```
# Spin up MySql, node-people-api and node-people-web containers
docker-compose up
```

## Test

```
npm test
```