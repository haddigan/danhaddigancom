/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Email: {
      sender: string
      type: "sst.aws.Email"
    }
    EncryptionSecret: {
      type: "sst.sst.Secret"
      value: string
    }
    ImageBucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    Post: {
      name: string
      type: "sst.aws.Dynamo"
    }
    SessionSecret: {
      type: "sst.sst.Secret"
      value: string
    }
    Trpc: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
  }
}
export {}