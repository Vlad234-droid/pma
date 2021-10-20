FROM node:14.17-alpine

# Ourtesco NEXUS repository access token
ARG NEXUS_ACCESS_TOKEN
ARG NODE_ENV

ARG REACT_APP_API_URL=/api
ARG PUBLIC_URL=/

WORKDIR /home/app

RUN apk --update add bash && apk --no-cache add dos2unix

#COPY --chmod=0644 ./codebase ./
#COPY --chmod=0755 ./scripts/create-npmrc.sh ./create-npmrc.sh
#COPY --chmod=0755 ./scripts/run.sh ./run.sh
COPY ./codebase ./
COPY ./scripts/create-npmrc.sh ./create-npmrc.sh
COPY ./scripts/run.sh ./run.sh

ENV NEXUS_ACCESS_TOKEN=$NEXUS_ACCESS_TOKEN

RUN dos2unix ./run.sh && dos2unix ./create-npmrc.sh && bash ./create-npmrc.sh --token $NEXUS_ACCESS_TOKEN

RUN yarn bootstrap

ENV BUILD_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV PUBLIC_URL=$PUBLIC_URL

ENV SKIP_PREFLIGHT_CHECK=true

RUN yarn build:prod

#ENTRYPOINT [ "yarn", "run:prod" ]
CMD /bin/sh ./run.sh

EXPOSE 9000
