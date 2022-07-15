#!/bin/sh

if [ -z "$NPM_ACCESS_TOKEN" ]
then
    NPM_ACCESS_TOKEN=$1
fi

if [ -z "$NPM_ACCESS_TOKEN" ]
then
    echo ERROR: Nexus accest token is not set.
    echo Set NPM_ACCESS_TOKEN environment variable or pass access token as a parameter
    exit 1
fi

cd ..

DOCKER_BUILDKIT=1

#    --build-arg HTTP_PROXY=http://10.251.0.42:80 \
#    --build-arg HTTPS_PROXY=http://10.251.0.42:80 \


docker build \
    --progress plain \
    --tag pma-frontend:latest \
    --network=host \
    --build-arg NPM_ACCESS_TOKEN=$NPM_ACCESS_TOKEN \
    --build-arg NODE_ENV=ppe \
    --build-arg REACT_APP_API_URL=/experience/yourcontribution/api/yoc/v1 \
    --build-arg REACT_APP_MY_INBOX_API_PATH=/experience/yourcontribution/api/colleague-inbox \
    --build-arg PUBLIC_URL=/experience/yourcontribution \
    --file dockerfiles/pma-frontend_docker_multistage_alpine.Dockerfile \
   .
