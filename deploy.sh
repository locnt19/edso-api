#!/bin/bash

# Defaults
ENVIRONMENT=stg

# Put all arguments in a new array (because BASH_ARGV is read only)
ARGS=( "$@" )

for i in "${!ARGS[@]}"; do
  case "${ARGS[i]}" in
    '')
      continue
      ;;
    -e|--environment)
      ENVIRONMENT="${ARGS[i+1]}"
      unset 'ARGS[i+1]'
      ;;
    --)             # End of arguments
      unset 'ARGS[i]'
      break
      ;;
    *)
      continue
      ;;
    esac
    unset 'ARGS[i]'
done

TASK_FAMILY=tncc-$ENVIRONMENT-chat-service
CLUSTER=tncc-$ENVIRONMENT
ECR_URL=066130180125.dkr.ecr.ap-southeast-1.amazonaws.com
IMAGE_NAME=tncc-chat-service
IMAGE_TAG=066130180125.dkr.ecr.ap-southeast-1.amazonaws.com/$IMAGE_NAME:$ENVIRONMENT
SERVICE_NAME=chat-service

sed -i "s/ENVIRONMENT/$ENVIRONMENT/" taskDefinition.json

aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin "$ECR_URL"
echo Build docker image and push to ECR
docker build -t "$IMAGE_TAG" -f Dockerfile .
docker push "$IMAGE_TAG"
# shellcheck disable=SC2216
docker rmi "$IMAGE_TAG" | true
CurrTaskDef=$(aws ecs describe-task-definition --task-definition "$TASK_FAMILY" | egrep "revision" | tr "," " " | awk "{print \$2}")
CurrTask=$(aws ecs list-tasks --cluster "$CLUSTER" --family "$TASK_FAMILY" --output text | egrep "TASKARNS" | awk "{print \$2}")
if [ -n "$CurrTaskDef" ]
then
  aws ecs update-service --cluster "$CLUSTER" --service "$SERVICE_NAME" --task-definition "$TASK_FAMILY:$CurrTaskDef" --desired-count 0
  aws ecs deregister-task-definition --task-definition "$TASK_FAMILY:$CurrTaskDef"
fi
if [ -n "$CurrTask" ]
then
  aws ecs stop-task --cluster "$CLUSTER" --task "$CurrTask"
fi
aws ecs register-task-definition --family "$TASK_FAMILY" --cli-input-json "file://taskDefinition.json"
TaskRevision=$(aws ecs describe-task-definition --task-definition "$TASK_FAMILY" | egrep "revision" | tr "," " " | awk "{print \$2}")
TaskDefinition="$TASK_FAMILY:$TaskRevision"
aws ecs update-service --cluster "$CLUSTER" --service "$SERVICE_NAME" --task-definition "$TaskDefinition" --desired-count 1
echo "Delete old images"
IMAGES_TO_DELETE=$(aws ecr list-images --region ap-southeast-1 --repository-name "$IMAGE_NAME" --filter "tagStatus=UNTAGGED" --query 'imageIds[*]' --output json)
aws ecr batch-delete-image --region ap-southeast-1 --repository-name "$IMAGE_NAME" --image-ids "$IMAGES_TO_DELETE"
