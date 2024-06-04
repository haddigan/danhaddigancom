import type { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import type { APIGatewayEvent } from "aws-lambda";

export const createContext = (
  opts: CreateAWSLambdaContextOptions<APIGatewayEvent>
) => opts;
