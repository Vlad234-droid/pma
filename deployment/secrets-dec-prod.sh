#!/bin/sh

sops --decrypt \
  --output ./pma-frontend/secrets-prod.dec.yaml \
  ./pma-frontend/secrets-prod.yaml
