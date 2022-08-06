# Index
- [Introducction](#renew-API-KEY-AppSync)
- [References](#References)

# renew-API-KEY-AppSync  

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

-  `handlers` - Code for the application's Lambda function.

-  `events` - Invocation events that you can use to invoke the function.

-  `template.yaml` - A template that defines the application's AWS resources.

This scheduled task is responsible for periodically updating `(every 300 days)` all `(25)` AppSync Api Keys for a period of one year from the moment it is executed.

# References

- Building lambdas with infrastructure as code: [Serverless Application Model (SAM) - Lambda](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html)
- Create scheduled events: [Schedule - AWS Serverless Application Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-property-function-schedule.html)
- Role policies: [AWS SAM policy templates - AWS Serverless Application Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html)