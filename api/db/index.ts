import { Resource } from "sst";
import { Table, Entity } from "dynamodb-toolbox";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

export const DocumentClient = DynamoDBDocument.from(new DynamoDBClient({}));

export const PostsTable = new Table({
  name: Resource.Post.name,
  partitionKey: "PK",
  sortKey: "SK",
  indexes: {
    GSI1: { partitionKey: "GSI1PK" },
  },
  DocumentClient,
});

export const Post = new Entity({
  name: "Post",
  attributes: {
    PK: { partitionKey: true, hidden: true },
    SK: { sortKey: true, hidden: true },
    GSI1PK: { type: "string", hidden: true },
    PostID: { type: "string", alias: "id" },
    Title: { type: "string", alias: "title" },
    Caption: { type: "string", alias: "caption" },
    PhotoURL: { type: "string", alias: "photoUrl" },
    CreatedAt: { type: "string", alias: "createdAt" },
  },
  table: PostsTable,
} as const);
