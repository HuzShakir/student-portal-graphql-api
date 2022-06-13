'use strict';
const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.REGION, //Here add you region
});
const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
const UserPoolId=process.env.POOL_ID
const USERS_TABLE=process.env.USERS_TABLE
exports.handler = async (event, context, callback) => {
    // TODO implement
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
    // return response;
    console.log("Received event {}", JSON.stringify(event, 3));

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
    console.log("Got an Invoke Request.");
    console.log(event.info.fieldName);
    switch(event.info.fieldName) {
        case "getStudent":
           { var id = event.arguments.id;
            console.log(id);
            var params = {
            TableName: USERS_TABLE,
            KeyConditionExpression: "id = :hkey",
            ExpressionAttributeValues: {
              ":hkey": id,
            },
          };
          var response=await dynamoDbClient.query(params).promise()
          console.log(response.Items)
          return response.Items
          
            break;}
        case "getAllStudents":
          var data =await cognitoIdp.listUsersInGroup({UserPoolId:UserPoolId,GroupName:'Student'}).promise()
            return data.Users
            
            
            
        case "createUser":
          var params={
            UserPoolId: UserPoolId ,
            Username: event.arguments.input.username ,
            ForceAliasCreation: true,
            // MessageAction: "SUPPRESS",
            TemporaryPassword: "Abcd123$",
            DesiredDeliveryMediums: ["EMAIL"],
            UserAttributes: [
              {
                Name: "email" ,
                Value: event.arguments.input.email,
              },
              {
                Name: 'email_verified',
                Value: 'true'
              },
            ],
          }
          event.arguments.input.groupName=="Student" && params.UserAttributes.push({
            Name: "custom:Department" ,
            Value: event.arguments.input.Department,
          },
        {
          Name: "custom:ClassNo" ,
          Value: event.arguments.input.ClassNo,
        })  
         var user= await cognitoIdp.adminCreateUser(params).promise()
          
          var groupParams = {
            GroupName: event.arguments.input.groupName,
            UserPoolId: UserPoolId,
            Username: event.arguments.input.username,
          };
        
          await cognitoIdp.adminAddUserToGroup(groupParams).promise();
          const attributes = user.User.Attributes;
          if(event.arguments.input.groupName==="Student"){
            let ddbParams = {
              Item: {
                id:  attributes[0].Value ,
                sk:  "User Attributes" ,
                __typename: "User" ,
                username: event.arguments.input.username ,
                ClassNo:  attributes[4].Value ,
                Department:  attributes[2].Value ,
                email:  attributes[3].Value ,
                createdAt:  new Date().toISOString() ,
              },
              TableName: USERS_TABLE,
            };
        
            var response=await dynamoDbClient.put(ddbParams).promise();
            console.log(response)
                return "Student has been created successfully"
          }
          else{
              return "Faculty has been created successfully"
          }
            // return the arguments back



        case "updateStudent":
          await cognitoIdp.adminUpdateUserAttributes({
              UserAttributes: [
                {
                  Name: 'email',
                  Value: event.arguments.email
                },
                {
                  Name: "custom:Department" ,
                  Value: event.arguments.Department,
                },
                {
                  Name: "custom:ClassNo" ,
                  Value: event.arguments.ClassNo,
                },
                {
                  Name: 'email_verified',
                  Value: 'true'
                },
                // {
                //   Name: 'username',
                //   Value: params.username
                // }
              ],
              UserPoolId: UserPoolId,
              Username: events.arguments.username
            },).promise()
            const updateParams = {
              Key: { id: event.argguments.id, sk: "User Attributes" },
              TableName: USERS_TABLE,
              UpdateExpression: "set email = :p, Department = :r, ClassNo = :q",
              ExpressionAttributeValues: {
                ":p": event.arguments.email,
                ":r": event.arguments.Department,
                ":q": event.arguments.ClassNo,
              },
            };
            await dynamoDbClient.update(updateParams).promise()
            return "Student credentials has been updated successfully"
        
        case 'deleteStudentDetails':
          await dynamoDbClient.delete({
            Key: {
              id: event.arguments.id,
              sk: event.arguments.sk,  
            },
            TableName: USERS_TABLE,}).promise()
            
          return "Student details has been deleted"
        
        case 'addStudentDetails':

          let ddbParams = {
            Item: {
              id:  event.arguments.input.id ,
              sk: event.arguments.input.sk,
              value: event.arguments.input.value,
            },
            TableName: USERS_TABLE,
          };
        
          await dynamoDbClient.put(ddbParams).promise()
          return "Student details has been added"

        default:
            callback("Unknown field, unable to resolve" + event.info.fieldName, null);
            break;
    }
};




