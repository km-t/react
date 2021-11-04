FROM node:14-alpine

WORKDIR /usr/src/app

ENV appName=sample-react

RUN yarn global add create-react-app && \
    create-react-app ${appName}

COPY ./src/* ./${appName}/src

ENTRYPOINT [ "yarn", "--cwd", "./sample-react", "start" ]