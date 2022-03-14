#!/bin/sh

sops --decrypt \
  --output ./pma-frontend/secrets-dev.dec.yaml \
  ./pma-frontend/secrets-dev.yaml
