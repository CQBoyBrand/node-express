/**
 * Created By brand On 2017/10/16
 */
const utility = require('utility')
var User = require("../models/user");
var responseData = {
    code: 0,
    message: ''
}
//登录
exports.login = function (req,res) {
    var params = req.body;
    if(params.userName == "" || params.userName == null){
        responseData.code = 1;
        responseData.message = "请输入用户名"
        res.json(responseData);
        return;
    }
    if(params.password == "" || params.password == null){
        responseData.code = 2;
        responseData.message = "请输入密码"
        res.json(responseData);
        return;
    }

    let userPwd = md5Pwd(params.password);
    User.login([params.userName, userPwd], function(err, result) {
        if (err) {
        }
        if (result == "" || result == null ) {
            responseData.code = 3;
            responseData.message = "用户名或密码错误"
            res.json(responseData);
            return;
        }else {
            responseData.code = 4;
            responseData.message = "登录成功";
            res.json(responseData);
            return;
        }
    })
};
//修改密码
exports.changePwd = function (req,res) {
    var params = req.body;
    var userName = params.userName;
    if(params.oldPwd == "" || params.oldPwd == null){
        responseData.code = 1;
        responseData.message = "请输入原始密码"
        res.json(responseData);
        return;
    }
    if(params.newPwd == "" || params.newPwd == null){
        responseData.code = 2;
        responseData.message = "请输入新密码"
        res.json(responseData);
        return;
    }
    if(params.confirmPwd == "" || params.confirmPwd == null){
        responseData.code = 2;
        responseData.message = "请再次输入新密码"
        res.json(responseData);
        return;
    }
    if(params.confirmPwd != params.newPwd){
        responseData.code = 2;
        responseData.message = "两次输入的新密不一致!"
        res.json(responseData);
        return;
    }
    User.validOldPwd([userName], function (beforeErr,beforeResult) {
        let odlPwd = md5Pwd(params.oldPwd)
        if (beforeErr) {
        }
        if(  odlPwd != beforeResult[0].password ){
            responseData.code = 3;
            responseData.message = "输入的原始密码不正确";
            res.json(responseData);
            return;
        }else {
            let newPwd = md5Pwd(params.newPwd)
            User.changePwd([ newPwd,userName], function(err, result) {
                if (err) {
                }
                if (result == "" || result == null ) {
                    responseData.code = 3;
                    responseData.message = "密码修改失败";
                    res.json(responseData);
                    return;
                }else {
                    responseData.code = 4;
                    responseData.message = "密码修改成功";
                    res.json(responseData);
                    return;
                }
            })
        }
    })
};
//查询用户信息
exports.getUserInfo = function (req,res) {
    var params = req.body;
    User.getUserInfo([params.userName], function(err, result) {
        if (err) {
        }
        if(result){
            res.json({userInfo: result});
        }
    })
};
//修改用户信息
exports.changeUserInfo = function (req,res) {
    var params = req.body;
    User.changeUserInfo([params.nickName, params.email, params.weibo, params.github, params.introduce, params.userName], function(err, result) {
        if (err) {
        }
        if(result.affectedRows > 0){
            responseData.code = 4;
            responseData.message = "资料修改成功";
            res.json(responseData);
            return;
        }else {
            responseData.code = 3;
            responseData.message = "资料修改失败";
            res.json(responseData);
            return;
        }
    })
};

//密码加密
function md5Pwd(pwd) {
    const salt = '!@~重~庆@`崽`儿`B`r`a$n^d*$%&*#';
    return utility.md5(utility.md5(salt + pwd))
}

