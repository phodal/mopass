# Serverless Password Manager

## Setup

1. Setup AWS Accounts && Serverless Framework
2. Setup: `yarn install`
3. Config: change domain & DB in `serverless.yml`
4. Deploy: `sls deploy`

## Test

POST:

```
curl --header "Authorization: allow" -X POST -H "Content-type: application/json" -d '{"password": "2222225", "token": "23432414", "title": "fasdf" }' https://spm.wdsm.io/sync
```

GET:

```
curl --header "Authorization: allow" https://spm.wdsm.io/sync?token=23432414
```

DELETE:

```
curl --header "Authorization: allow" -X DELETE -H "Content-type: application/json" -d '{"id": "W0ChFtNxa", "token": "23432414"}' https://spm.wdsm.io/sync
```

## FAQ

### 错误：The provided key element does not match the schema

```
{ ValidationException: The provided key element does not match the schema
    at Request.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/json.js:48:27)
    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:105:20)
    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:77:10)
    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:683:14)
    at Request.transition (/var/runtime/node_modules/aws-sdk/lib/request.js:22:10)
    at AcceptorStateMachine.runTo (/var/runtime/node_modules/aws-sdk/lib/state_machine.js:14:12)
    at /var/runtime/node_modules/aws-sdk/lib/state_machine.js:26:10
    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:38:9)
    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:685:12)
    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:115:18)
  message: 'The provided key element does not match the schema',
  code: 'ValidationException',
  time: 2019-02-26T12:31:25.507Z,
  requestId: 'POTAMPSSPFSOIU78QM637HK7BNVV4KQNSO5AEMVJF66Q9ASUAAJG',
  statusCode: 400,
  retryable: false,
  retryDelay: 44.331159666822884 } null
END RequestId: 782c2eb3-629e-43e0-b63c-c66678c5590b
```

原因 Key 少了

```
const params = {
  TableName: tableName,
  Key: {
    id: body.id,
    token: body.token  // 缺少了这部分的内容
  },
  ExpressionAttributeNames: {
    '#id': 'id',
    '#password': 'password',
    '#updatedAt': 'updatedAt',
    '#passwordToken': 'token',
  },
  ExpressionAttributeValues: {
    ':id': body.id,
    ':password': body.password,
    ':token': body.token,
    ':updatedAt': timestamp
  },
  ConditionExpression: '(#id = :id AND #passwordToken = :token)',
  UpdateExpression: 'SET #password = :password, #updatedAt = :updatedAt',
  ReturnValues: 'ALL_NEW',
};

```
