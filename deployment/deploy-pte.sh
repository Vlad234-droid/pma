#!/bin/sh

kubectl config use-context euw-pte-214-pma-aks-admin

helm secrets upgrade \
    --install pma-frontend-service ./pma-frontend/ \
    --set image.tag=$1 \
    --set azdevops.build.buildId=${BUILD_BUILDID} \
    --set azdevops.build.buildNumber=${BUILD_BUILDNUMBER} \
    --set azdevops.build.buildDefinitionName=${BUILD_DEFINITIONNAME} \
    --set azdevops.build.sourceBranchName=${BUILD_SOURCEBRANCHNAME} \
    --set azdevops.build.sourceBranch=${BUILD_SOURCEBRANCH} \
    --set azdevops.build.sourceVersion=${BUILD_SOURCEVERSION} \
    --set azdevops.release.releaseId=${RELEASE_RELEASEID} \
    --set azdevops.release.releaseName=${RELEASE_RELEASENAME} \
    --set azdevops.release.releaseDefinitionName=${RELEASE_DEFINITIONNAME} \
    --set azdevops.release.environmentName=${RELEASE_ENVIRONMENTNAME} \
    -f ./pma-frontend/values-pte.yaml \
    -f ./pma-frontend/secrets-pte.yaml \
    -n api
