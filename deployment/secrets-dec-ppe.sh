#!/bin/sh

sops --decrypt \
  --output ./pma-frontend/secrets-ppe.dec.yaml \
  ./pma-frontend/secrets-ppe.yaml
