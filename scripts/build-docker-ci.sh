IMAGE_NAME=$1

docker build \
  --tag $IMAGE_NAME \
  --build-arg BUILD_ENV=production \
  --build-arg NEXUS_ACCESS_TOKEN=$NEXUS_ACCESS_TOKEN \
  --build-arg NODE_ENV=ppe \
  --build-arg REACT_APP_API_URL=/api \
  --build-arg REACT_APP_WS_URL=/socket.io \
  --build-arg PUBLIC_URL=/ \
  --file dockerfiles/pma-frontend_docker_build.Dockerfile \
  .;
