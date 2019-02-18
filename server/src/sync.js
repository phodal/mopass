'use strict';

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
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: 'postItem'
    }),
  };
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
