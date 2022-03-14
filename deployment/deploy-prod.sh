#!/bin/sh

kubectl config use-context euw-prod-214-pma-aks-admin

helm secrets upgrade \
    --install pma-frontend-service ./pma-frontend/ \
    --set image.tag=$1 \
    -f ./pma-frontend/values-prod.yaml \
    -f ./pma-frontend/secrets-prod.yaml \
    -n api
