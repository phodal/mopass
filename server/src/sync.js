'use strict';

const shortid = require('shortid');
const AWS = require('aws-sdk');

const tableName = process.env.DYNAMODB_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

function deleteItem(event, context, callback) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: 'DELETE'
    }),
  };
}

function getItem(event, context, callback) {
  const token = event.queryStringParameters.token;
  if (!token) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'token lost'
      })
    });
  }

  const params = {
    TableName: tableName,
    FilterExpression: '#passwordToken = :token',
    ExpressionAttributeNames: {
      '#passwordToken': 'token',
    },
    ExpressionAttributeValues: {
      ':token': token
    }
  };

  dynamoDb.scan(params, function (error, data) {
    if (error) {
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: JSON.stringify({
          message: 'get item failure',
          error: error
        }),
      });
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify(data),
    };
    return callback(null, response);
  });
}

function postItem(event, context, callback) {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log(error);
    callback(null, {statusCode: 400, body: JSON.stringify(error)});
  }

  if (!body.password || !body.title || !body.token) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'message lost',
        body: body
      })
    });
  }

  const timestamp = new Date().getTime();
  const params = {
    TableName: tableName,
    Item: {
      password: body.password + '',
      checked: false,
      token: body.token,
      title: body.title,
      id: shortid.generate(),
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  dynamoDb.put(params, function (error, data) {
    if (error) {
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'couldn\'t create the form item.',
      });
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };

    return callback(null, response);
  });
}

function updateItem(event, context, callback) {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log(error);
    callback(null, {statusCode: 400, body: JSON.stringify(error)});
  }

  if (!body.password || !body.id || !body.token || !body.title) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'message lost',
        body: JSON.stringify(body)
      })
    });
  }

  const passwordId = body.id;
  const timestamp = new Date().getTime();
  const params = {
    TableName: tableName,
    Key: {
      id: passwordId
    },
    ExpressionAttributeNames: {
      '#password': 'password',
      '#updatedAt': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':password': body.password,
      ':updatedAt': timestamp
    },
    ConditionExpression: '(#id = :id, #token = :token)',
    UpdateExpression: 'SET #password = :password, #updatedAt =: updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  dynamoDb.put(params, function (error, data) {
    if (error) {
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'couldn\'t create the form item.',
      });
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
    return callback(null, response);
  });
}

const handlers = {
  "DELETE": deleteItem,
  "GET": getItem,
  "POST": postItem,
  "PUT": updateItem,
};

module.exports.handler = function (event, context, callback) {
  let httpMethod = event["httpMethod"];
  console.log(httpMethod);
  if (httpMethod in handlers) {
    return handlers[httpMethod](event, context, callback);
  }
};
