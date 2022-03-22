#!/bin/sh

npx prisma migrate deploy
echo "migrations applied"
npm run start
