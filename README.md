# Serverless Password Manager

> a serverless personal password manager tools

Roadmap:

 - [x] Serverless
 - [x] Client: CLI
 - [x] Client: Chrome Plugin
 - [ ] Client: WeChat-app
 - [ ] Security: New Devices
 - [ ] Features: 2-Step Verification

## CLI 

Code in [./command](./command)

### Usage

```
npm install -g mopass
```

Commands:

 - Create Encrypt Key: ``mopass --createKey``
 - Generate New Password: ``mopass --generate``
 - Fetch Passwords from Server: ``mopass fetch``
 - Get Password By Title: ``mopass --get [title]``
 - List All Titles: ``mopass --list``

### Features

 - [x] Sync Remote Passwords
 - [x] List All Passwords Alias/Title
 - [x] Get Password by Alias/Title
 - [x] Delete One Password
 - [ ] QRCode Generator for Password

## Serverless Server

### Setup

1. Setup AWS Accounts && Serverless Framework
2. Setup: `yarn install`
3. Config: change domain & DB in `serverless.yml`
4. Deploy: `sls deploy`

LICENSE
---

@ 2019 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the GPL license. See `LICENSE` in this directory.
