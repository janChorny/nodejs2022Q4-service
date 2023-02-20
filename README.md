# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.


## Downloading

```
git clone {repository URL}
```

## Changing directory

```
cd nodejs2022Q4-service
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Testing with swagger

Run Postgress Admin 4

than run the server in dev or prod mode:

```
npm run start
```

or

```
npm run start:dev
```

After that visit `http://localhost:${PORT}/api/docs` and test API


### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Docker

! Tested on docker 4.13.1 release

Compose

```
docker-compose build
```

Run

```
docker-compose up
```

Stop

```
docker-compose down
```

Check image size

```
docker container ls -s
```

Add images to Docker Hub

```
docker container commit <container id> <repo-name>
```
```
docker image tag <repo-name> <repo-name>:<tag-name>
```
```
docker push <repo-name>:<tag-name>
```
Repository with docker images is available on Docker Hub by the link 
https://hub.docker.com/repository/docker/janchorny/nodejs2022q4/general
