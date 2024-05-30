/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Email: {
      sender: string
      type: "sst.aws.Email"
    }
    ImageBucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    Post: {
      name: string
      type: "sst.aws.Dynamo"
    }
    Trpc: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
  }
}
export {}