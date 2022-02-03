FROM node:14.17-alpine

# Ourtesco NEXUS repository access token
ARG NEXUS_ACCESS_TOKEN
ARG HTTP_PROXY
ARG HTTPS_PROXY

ARG NODE_ENV

ARG REACT_APP_API_URL=/api
ARG REACT_APP_MY_INBOX_API_PATH=/api/colleague-inbox
ARG PUBLIC_URL=/

WORKDIR /home/app

RUN apk --update --no-cache add \
    bash \
    dos2unix \
    git 

#COPY --chmod=0644 ./codebase ./
#COPY --chmod=0755 ./scripts/create-npmrc.sh ./create-npmrc.sh
#COPY --chmod=0755 ./scripts/start.sh ./start.sh
COPY ./codebase ./
COPY ./scripts/create-npmrc.sh ./create-npmrc.sh
COPY ./scripts/start.sh ./start.sh

ENV NEXUS_ACCESS_TOKEN=$NEXUS_ACCESS_TOKEN
ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

RUN dos2unix ./start.sh && dos2unix ./create-npmrc.sh && bash ./create-npmrc.sh --token $NEXUS_ACCESS_TOKEN

RUN yarn bootstrap:dev

ENV BUILD_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_MY_INBOX_API_PATH=$REACT_APP_MY_INBOX_API_PATH
ENV PUBLIC_URL=$PUBLIC_URL

ENV SKIP_PREFLIGHT_CHECK=true

RUN yarn build:prod

#ENTRYPOINT [ "yarn", "run:prod" ]
CMD /bin/sh ./start.sh

EXPOSE 9000
