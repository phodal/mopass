# 10. Master Password 重复问题

日期: 2019-02-28

## 状态

2019-02-28 提议

## 背景

当前的 Token 是基于 Master Password 设计的，一旦重复，就可以获取到其他/她的密码。

需要一个新的用户账号相关的接口：

 - 根据 MasterPassword + Token 可以更新 MasterPassword
 - 根据 MasterPassword + Token 可以更新 Password Key
 - 更新完 MasterPassword 和 Password Key，需要同时更新所有的密码？

## 决策

在这里补充上决策信息...

## 后果

在这里记录结果...
