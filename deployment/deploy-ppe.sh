#!/bin/sh

kubectl config use-context euw-ppe-214-pma-aks-admin

helm secrets upgrade \
    --install pma-frontend-service ./pma-frontend/ \
    --set image.tag=$1 \
    -f ./pma-frontend/values-ppe.yaml \
    -f ./pma-frontend/secrets-ppe.yaml \
    -n api
