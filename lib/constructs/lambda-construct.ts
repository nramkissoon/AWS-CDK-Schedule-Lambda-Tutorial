import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { Construct } from "constructs";

export class SimpleLambdaConstruct extends cdk.Construct {
  public lambda: lambda.Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.lambda = new lambda.Function(this, "lambdaFunction", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lib/lambda-code"),
      handler: "code.handler",
    });
  }
}
