#!/bin/sh
git fetch origin && git reset --hard origin/develop && git clean -f -d
docker-compose -f docker-compose.yml up --build -d