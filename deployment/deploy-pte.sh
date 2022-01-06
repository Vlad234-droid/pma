#!/bin/sh

kubectl config use-context euw-pte-214-pma-aks-admin

helm secrets upgrade \
    --install pma-frontend-service ./pma-frontend/ \
    --set image.tag=$1 \
    -f ./pma-frontend/values-pte.yaml \
    -f ./pma-frontend/secrets-pte.yaml \
    -n api
