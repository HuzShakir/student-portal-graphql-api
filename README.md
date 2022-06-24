<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

## Serverless Student Portal

This Project is a the back-end section of Student Portal built with Serverless.

---
# Student Portal



## Features

- Allow Super Admin User to log in

- Allow Super Admin User to create Faculty Users

- Allow Faculty Users to create other Faculty Users

- Allow Faculty Users to create Student User Account with Department and Class No.

- Allow Faculty Users to update Student User Account with Class No

- Allow Students to log in and check their current Department and Class No

- Allow Faculty Users to Add/Edit Student detail with “key/value” like combinations

  - For example, they can set these detail
  - Key: “Semester 1 Result”, Value: JSON object data 
  - Key: “Year 1 Report”, Value: JSON object data
  - Key: “Workshop ABC Report” Value: JSON object data

- Students can log in and check all the detail created for their user and view the UI

- Students CAN ONLY VIEW the detail, they can not modify the data

- Faculty members can ADD/UPDATE/VIEW detail for any student based on the Student ID or Email address


## AWS Services

- Amazon Cognito 

  - To create user accounts with Cognito Group assignment

- Amazon Lambda

  - To run the NodeJS code to interact with DynamoDB

- Amazon DynamoDB

  - To save the Student detail

- AWS S3

  - To host the UI for interacting with the system

# Serverless Framework AWS NodeJS Example

This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework. The deployed function does not include any event definitions as well as any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which includes integrations with SQS, DynamoDB or examples of functions that are triggered in `cron`-like manner. For details about configuration of specific `events`, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  hello: aws-node-project-dev-hello (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```
