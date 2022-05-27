#!/bin/bash

DEFAULT_HTTP_PROXY=http://10.251.0.42:80
DOCKER_ARGS=""
DOCKER_BUILD_ARGS=""

for var in "$@"
do
  params=(${var//=/ })
  param_name=`echo "${params[0]}" | sed "s/-/_/g" | awk '{print substr($0, 3)}' | tr [:lower:] [:upper:]`
  param_value="${params[1]}"
  #echo " --> ${param_name} = \"${param_value}\""
  case "$param_name" in
    NO_CACHE )
      DOCKER_ARGS+="--no-cache "
      ;;
    PLAIN )
      DOCKER_ARGS+="--progress plain "
      ;;
    NPM_ACCESS_TOKEN | NEXUS_ACCESS_TOKEN )
      NPM_ACCESS_TOKEN="${param_value}"
      ;; 
    IMAGE_NAME )
      IMAGE_NAME="${param_value}"
      ;;
    USE_PROXY )
      USE_PROXY="${param_value}"
      if [ -z ${USE_PROXY} ]; then
        USE_PROXY=true
      fi
      HTTP_PROXY=${DEFAULT_HTTP_PROXY}
      HTTPS_PROXY=${DEFAULT_HTTP_PROXY}
      ;;
    HTTP_PROXY )
      HTTP_PROXY="${param_value}"
      ;;
    HTTPS_PROXY )
      HTTPS_PROXY="${param_value}"
      ;;
    # APP specific props.
    REACT_APP* )
      DOCKER_BUILD_ARGS+="--build-arg ${param_name}=${param_value} "
      ;;
  esac
done

if [ -z "$IMAGE_NAME" ]; then
  IMAGE_NAME="pma-frontend:latest"
fi

if [ -z "$NPM_ACCESS_TOKEN" ]; then
  echo "Required parameter is missing: --npm-access-token"
  exit -1
fi

echo "Docker environment properties:"
echo "  IMAGE_NAME: ${IMAGE_NAME}"
if [ "$USE_PROXY" = "true" ]; then
  echo "  USE_PROXY: ${USE_PROXY}"
  echo "  HTTP_PROXY: ${HTTP_PROXY}"
  echo "  HTTPS_PROXY: ${HTTPS_PROXY}"
fi
if [ -n "$DOCKER_BUILD_ARGS" ]; then
  echo "Application build properties:"
  echo "  ${DOCKER_BUILD_ARGS}"
fi

export DOCKER_BUILDKIT=1

DOCKER_CMD="docker build $DOCKER_ARGS "
DOCKER_CMD+="--tag $IMAGE_NAME " 
if [ "$USE_PROXY" = "true" ]; then
  DOCKER_CMD+="--build-arg HTTP_PROXY=${HTTP_PROXY} " 
  DOCKER_CMD+="--build-arg HTTPS_PROXY=${HTTP_PROXY} "
fi
DOCKER_CMD+="--build-arg BUILD_ENV=production " 
DOCKER_CMD+="--build-arg NPM_ACCESS_TOKEN=$NPM_ACCESS_TOKEN " 
DOCKER_CMD+="${DOCKER_BUILD_ARGS}" 
DOCKER_CMD+="--file `dirname $0`/../dockerfiles/pma-frontend_docker_multistage_debian.Dockerfile " 
DOCKER_CMD+="`dirname $0`/.. "

printf "\nStarting docker build...\n"
eval ${DOCKER_CMD}
