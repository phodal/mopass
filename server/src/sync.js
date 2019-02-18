'use strict';
const shortid = require('shortid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Promise);

const tableName = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteItem(event, context, callback) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: 'DELETE'
    }),
  };
}

async function getItem(event, context, callback) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: 'getItem'
    }),
  };
}

async function patchItem(event, context, callback) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: 'patchItem'
    }),
  };
}

async function postItem(event, context, callback) {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log(error);
    callback(null, {statusCode: 400, body: JSON.stringify(error)});
  }
  console.log(body);

  const timestamp = new Date().getTime();
  const params = {
    TableName: tableName,
    Item: {
      password: body.password + '',
      checked: false,
      id: shortid.generate(),
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  docClient.put(params, function (error) {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'couldn\'t create the form item.',
      });
      return;
    }

    const response = {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
}

async function updateItem(event, context, callback) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: 'updateItem'
    }),
  };
}

const handlers = {
  "DELETE": deleteItem,
  "GET": getItem,
  "PATCH": patchItem,
  "POST": postItem,
  "PUT": updateItem,
};

module.exports.handler = async (event, context, callback) => {
  let httpMethod = event["httpMethod"];
  console.log(httpMethod);
  if (httpMethod in handlers) {
    return handlers[httpMethod](event, context, callback);
  }
};
