/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    ImageBucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    Post: {
      name: string
      type: "sst.aws.Dynamo"
    }
  }
}
export {}