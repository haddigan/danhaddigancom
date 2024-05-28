import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst/resource";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const loader = async () => {
  const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  const data = await client.send(
    new QueryCommand({
      TableName: Resource.PostTable.name,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": "POST",
      },
      ScanIndexForward: false,
      Limit: 10,
    })
  );

  return json(data);
};
