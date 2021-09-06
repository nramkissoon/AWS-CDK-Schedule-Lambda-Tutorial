import * as cdk from "@aws-cdk/core";
import * as targets from "@aws-cdk/aws-events-targets";
import * as events from "@aws-cdk/aws-events";
import { EventConstruct } from "./constructs/event-construct";
import { SimpleLambdaConstruct } from "./constructs/lambda-construct";

export class LambdaScheduleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaConstruct = new SimpleLambdaConstruct(
      this,
      "SimpleLambdaConstruct"
    );
    const eventRule = new EventConstruct(this, "EventConstruct");

    // add the Lambda function as a target for the Event Rule
    eventRule.eventRule.addTarget(
      new targets.LambdaFunction(lambdaConstruct.lambda, {
        event: events.RuleTargetInput.fromObject({ message: "Hello Lambda" }),
      })
    );

    // allow the Event Rule to invoke the Lambda function
    targets.addLambdaPermission(eventRule.eventRule, lambdaConstruct.lambda);
  }
}
