#!/bin/sh

sops --encrypt \
  --azure-kv https://euw-dev-214-pma-kv.vault.azure.net/keys/euw-dev-214-pma-sops/b24f7c8fb15547d79040a1dd1dc475d0 \
  --output ./pma-frontend/secrets-dev.yaml \
  ./pma-frontend/secrets-dev.dec.yaml
