@echo off

setlocal

cd ..

if "%NPM_ACCESS_TOKEN%"=="" (
    set NPM_ACCESS_TOKEN=%*
)

if "%NPM_ACCESS_TOKEN%"=="" (
    echo ERROR: Nexus accest token is not set.
    echo Set NPM_ACCESS_TOKEN environment variable or pass access token as a parameter
    goto completed
)

docker build ^
   --tag pma_local:latest ^
   --build-arg NPM_ACCESS_TOKEN=%NPM_ACCESS_TOKEN% ^
   --build-arg NODE_ENV=ppe ^
   --build-arg REACT_APP_API_URL=/api ^
   --build-arg REACT_APP_MY_INBOX_API_PATH=/api/colleague-inbox ^
   --build-arg PUBLIC_URL=/ ^
   --file dockerfiles/pma-frontend_docker_build.Dockerfile ^
   .

:completed

endlocal
