@echo off

setlocal

cd ..

if "%NEXUS_ACCESS_TOKEN%"=="" (
    set NEXUS_ACCESS_TOKEN=%*
)

if "%NEXUS_ACCESS_TOKEN%"=="" (
    echo ERROR: Nexus accest token is not set.
    echo Set NEXUS_ACCESS_TOKEN environment variable or pass access token as a parameter
    goto completed
)

docker build ^
   --tag pma_local:latest ^
   --build-arg NEXUS_ACCESS_TOKEN=%NEXUS_ACCESS_TOKEN% ^
   --build-arg NODE_ENV=ppe ^
   --build-arg REACT_APP_API_URL=/api ^
   --build-arg PUBLIC_URL=/ ^
   --file dockerfiles/pma-frontend_docker_build.Dockerfile ^
   .

:completed

endlocal
