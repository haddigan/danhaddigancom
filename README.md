# README

## Architecture

- SST to bootstrap and maintain infrastructure
  - Cloudfront
  - API Gateway
  - S3
  - DynamoDB
- Remix to handle the UI layer frontend and backend
  - Remix uses React to create the frontend UI
  - Frontend UI makes requests to backend handled by Remix's server side application
  - Server side application connects to a tRPC API
  - tRPC API connects to DynamoDB
