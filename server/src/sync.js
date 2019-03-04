'use strict'

const shortid = require('shortid')
const AWS = require('aws-sdk')

const tableName = process.env.DYNAMODB_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

function deleteItem(event, context, callback) {
  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    callback(null, { statusCode: 400, body: JSON.stringify(error) })
  }

  console.log(body)
  if (!body && (!body.id || !body.token)) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'message lost',
        body: JSON.stringify(body)
      })
    })
  }

  const params = {
    TableName: tableName,
    Key: {
      id: body.id,
      token: body.token
    }
  }

  dynamoDb.delete(params, function(error, data) {
    if (error) {
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          message: 'cannot delete item',
          error: error
        })
      })
    }

    const response = {
      statusCode: 204,
      body: JSON.stringify({ message: 'delete success' })
    }
    return callback(null, response)
  })
}

function getItem(event, context, callback) {
  const token = event.queryStringParameters.token
  if (!token) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'token lost'
      })
    })
  }

  const params = {
    TableName: tableName,
    ProjectionExpression: 'password, createdAt, updatedAt, id, title, #Passwordtype',
    FilterExpression: '#passwordToken = :token',
    ExpressionAttributeNames: {
      '#passwordToken': 'token',
      '#Passwordtype': 'type'
    },
    ExpressionAttributeValues: {
      ':token': token
    }
  }

  dynamoDb.scan(params, function(error, data) {
    console.log(error)
    if (error) {
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          message: 'get item failure',
          error: error
        })
      })
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data)
    }
    return callback(null, response)
  })
}

function postItem(event, context, callback) {
  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    console.log(error)
    callback(null, { statusCode: 400, body: JSON.stringify(error) })
  }

  if (!body && (!body.password || !body.title || !body.token)) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'message lost',
        body: body
      })
    })
  }

  const timestamp = new Date().getTime()
  const params = {
    TableName: tableName,
    Item: {
      password: body.password + '',
      token: body.token,
      title: body.title,
      id: shortid.generate(),
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  if (body.type) {
    params.Item.type = body.type
  }

  dynamoDb.put(params, function(error, data) {
    if (error) {
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'couldn\'t create the form item.'
      })
    }

    delete params.Item.token
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }

    return callback(null, response)
  })
}

function updateItem(event, context, callback) {
  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    console.log(error)
    callback(null, { statusCode: 400, body: JSON.stringify(error) })
  }

  if (!body && (!body.password || !body.id || !body.token || !body.title)) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'message lost',
        body: JSON.stringify(body)
      })
    })
  }

  const timestamp = new Date().getTime()
  const params = {
    TableName: tableName,
    Key: {
      id: body.id,
      token: body.token
    },
    ExpressionAttributeNames: {
      '#id': 'id',
      '#password': 'password',
      '#updatedAt': 'updatedAt',
      '#passwordToken': 'token'
    },
    ExpressionAttributeValues: {
      ':id': body.id,
      ':password': body.password,
      ':token': body.token,
      ':updatedAt': timestamp
    },
    ConditionExpression: '(#id = :id AND #passwordToken = :token)',
    UpdateExpression: 'SET #password = :password, #updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW'
  }

  dynamoDb.update(params, function(error, data) {
    console.log(error, data)
    if (error) {
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: {
          message: 'couldn\'t create the form item.',
          error: error
        }
      })
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    return callback(null, response)
  })
}

const handlers = {
  'DELETE': deleteItem,
  'GET': getItem,
  'POST': postItem,
  'PUT': updateItem
}

module.exports.handler = function(event, context, callback) {
  let httpMethod = event['httpMethod']
  console.log(httpMethod)
  if (httpMethod in handlers) {
    return handlers[httpMethod](event, context, callback)
  }
}
