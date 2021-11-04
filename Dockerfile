FROM node:14-alpine

WORKDIR /usr/src/app
RUN yarn global add create-react-app && \
    create-react-app sample-react
#CMD [ "yarn", "start" ]