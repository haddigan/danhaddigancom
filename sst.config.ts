/// <reference path="./.sst/platform/config.d.ts" />

const getAwsProfile = (stage: string) => {
  switch (stage) {
    case "production":
      return "orb-prod";
    case "":
    case "dev":
    case "dan":
    case "local":
    case "orb-dev":
    default:
      return "orb-dev";
  }
};

export default $config({
  app(input) {
    return {
      name: "danhaddigancom",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: getAwsProfile(input?.stage),
        },
      },
    };
  },
  async run() {
    const encryption_secret = new sst.Secret(
      "EncryptionSecret",
      "NOT_A_STRONG_SECRET"
    );

    const session_secret = new sst.Secret(
      "SessionSecret",
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
      link: [bucket, trpc, email, encryption_secret, session_secret],
      environment: {
        ADMIN_EMAIL: "auth@haddigan.email",
      },
    });

    return {
      api: trpc.url,
      client: site.url,
    };
  },
});
