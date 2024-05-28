/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    ImageBucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    PostTable: {
      name: string
      type: "sst.aws.Dynamo"
    }
  }
}
export {}