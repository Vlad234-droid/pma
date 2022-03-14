#!/bin/sh

sops --decrypt \
  --output ./pma-frontend/secrets-pte.dec.yaml \
  ./pma-frontend/secrets-pte.yaml
