import { Resource } from "sst";
import { Table, Entity } from "dynamodb-toolbox";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

export const DocumentClient = DynamoDBDocument.from(new DynamoDBClient({}));

export const PostsTable = new Table({
  name: Resource.Post.name,
  partitionKey: "PK",
  sortKey: "SK",
  DocumentClient,
});

export const Post = new Entity({
  name: "Post",
  attributes: {
    PK: { partitionKey: true },
    SK: { sortKey: true },
    PhotoURL: { type: "string" },
    Title: { type: "string" },
    Caption: { type: "string" },
  },
  table: PostsTable,
} as const);
