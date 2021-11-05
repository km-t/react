FROM node:14-alpine

WORKDIR /usr/src/app

ENV appName=sample-react

RUN yarn global add create-react-app && \
    create-react-app ${appName} && \
    yarn add 'react-router-dom@^5.2.0' && \
    rm -rf ./${appName}/src/*

COPY ./src/* ./${appName}/src
COPY ./public/* ./${appName}/public
COPY ./entry-point.sh ./
RUN chmod 777 entry-point.sh

ENTRYPOINT ["sh", "entry-point.sh", "sample-react"]