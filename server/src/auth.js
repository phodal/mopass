'use strict';

const generatePolicy = function(principalId, effect, resource) {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

module.exports.authorize = (event, context, callback) => {
  console.log(event);
  console.log("==================");
  console.log("Authorization: ", event.authorizationToken);
  console.log("==================");
  var token = event.authorizationToken;

  switch (token) {
    case 'allow':
      callback(null, generatePolicy('user', 'Allow', '*'));
      break;
    case 'deny':
      callback(null, generatePolicy('user', 'Deny', '*'));
      break;
    case 'unauthorized':
      callback('Unauthorized');
      break;
    default:
      callback('Error');
  }
};
