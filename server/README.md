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
