FROM node:8.9.0-stretch

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
COPY yarn.lock /usr/app
COPY server.js /usr/app/
COPY .env /usr/app/
ADD lib /usr/app/lib

RUN npm install --production

# NOTE: must use ENTRYPOINT not CMD so that SIGTERM is propagated
ENTRYPOINT ["node", "server.js"]
