#!/bin/sh

kubectl config use-context euw-dev-214-pma-aks-admin

helm secrets upgrade \
    --install pma-frontend-service ./pma-frontend/ \
    --set image.tag=$1 \
    -f ./pma-frontend/values-dev.yaml \
    -f ./pma-frontend/secrets-dev.yaml \
    -n api
