/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "danhaddigancom",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "orb-dev",
        },
      },
    };
  },
  async run() {
    const encryption_secret = new sst.Secret(
      "EncryptionSecret",
      "NOT_A_STRONG_SECRET"
    );

    const bucket = new sst.aws.Bucket("ImageBucket", {
      public: true,
    });

    const table = new sst.aws.Dynamo("Post", {
      fields: {
        PK: "string",
        SK: "string",
        CreatedAt: "string",
        GSI1PK: "string",
      },
      primaryIndex: { hashKey: "PK", rangeKey: "SK" },
      globalIndexes: {
        GSI1: { hashKey: "GSI1PK", rangeKey: "CreatedAt" },
      },
    });

    const trpc = new sst.aws.Function("Trpc", {
      url: true,
      handler: "api/index.handler",
      link: [table, encryption_secret],
    });

    const email = new sst.aws.Email("Email", {
      sender: "auth@haddigan.email",
    });

    const site = new sst.aws.Remix("MyWeb", {
      link: [bucket, trpc, email, encryption_secret],
    });

    return {
      api: trpc.url,
      client: site.url,
    };
  },
});
