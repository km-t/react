FROM node:14-alpine

WORKDIR /usr/src/app

ENV appName=sample-react

RUN yarn global add create-react-app && \
    create-react-app ${appName} && \
    yarn add 'react-router-dom@^5.2.0'

COPY ./src/* ./${appName}/src
COPY ./public/* ./${appName}/public


ENTRYPOINT [ "yarn", "--cwd", "./sample-react", "start" ]