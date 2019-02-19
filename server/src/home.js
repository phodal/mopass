'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function (event, context, callback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: "123456",
      text: "123456"
    }
  };

  dynamoDb.put(params, function (error) {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'Couldn\'t create the todo item.'
      });
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
    callback(null, response)
  });
};
