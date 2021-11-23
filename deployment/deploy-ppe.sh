#!/bin/sh
kubectl config use-context euw-ppe-214-pma-aks-admin
helm upgrade --install pma-frontend-service ./pma-frontend/ -f ./pma-frontend/values-ppe.yaml --set image.tag=$1 -n api

