'use strict'

const shortid = require('shortid')
const AWS = require('aws-sdk')

const tableName = process.env.DYNAMODB_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

function buildBatchItems(items) {
  let results = []
  const timestamp = new Date().getTime()
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    results.push({
      'PutRequest': {
        'Item': {
          'password': item.password,
          'token': item.token,
          'title': item.title,
          'type': item.type,
          'id': shortid.generate(),
          'createdAt': timestamp,
          'updatedAt': timestamp
        }
      }
    })
  }

  return results
}

function postItem(event, context, callback) {
  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    console.log(error)
    callback(null, { statusCode: 400, body: JSON.stringify(error) })
  }

  if (!(body.length && body[0].password && body[0].token)) {
    callback(null, {
      statusCode: 400, body: JSON.stringify({
        message: 'message lost',
        body: body
      })
    })
  }

  const params = {
    'RequestItems': {}
  }
  params.RequestItems[tableName] = buildBatchItems(body)

  dynamoDb.batchWrite(params, function(error, data) {
    if (error) {
      console.log(JSON.stringify(params))
      console.log(error)
      return callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(error)
      })
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data)
    }

    return callback(null, response)
  })
}

const handlers = {
  'POST': postItem
}

module.exports.handler = function(event, context, callback) {
  let httpMethod = event['httpMethod']
  console.log(httpMethod)
  if (httpMethod in handlers) {
    return handlers[httpMethod](event, context, callback)
  }
}
