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
    --progress plain ^
    --tag pma_local:latest ^
    --network=host ^
    --build-arg HTTP_PROXY=http://10.251.0.42:80 ^
    --build-arg HTTPS_PROXY=http://10.251.0.42:80 ^
    --build-arg NPM_ACCESS_TOKEN=%NPM_ACCESS_TOKEN% ^
    --build-arg NODE_ENV=ppe ^
    --build-arg REACT_APP_API_URL=/experience/myperformance/api/v1 ^
    --build-arg PUBLIC_URL=/experience/myperformance ^
    --file dockerfiles/pma-frontend_docker_multistage_build.Dockerfile ^
   .

:completed

endlocal
