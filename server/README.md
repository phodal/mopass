# Serverless Password Manager

Test CLI:

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
