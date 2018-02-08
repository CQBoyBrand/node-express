/**
 * Created By brand On 2017/10/16
 */
const utility = require('utility')
var Comment = require("../models/comments");
var nodemailer = require('nodemailer');//发送邮件
var responseData = {
    code: 0,
    message: ''
}

//随机生成用户id
function randomString(A) {
    var A = A || "T";
    return 'x' + A + 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
//新增评论
exports.addComment = function (req, res) {
    var params = req.body;
    let webSite = params.userWebsite || "javascript:void(0)";
    let parentCommentId = params.parentCommentId || "";
    let fromUserId = randomString("U");
    Comment.add([parentCommentId,params.commentId,params.artId,fromUserId, params.userName, params.userEmail,params.toUserEmail, webSite, params.Content,params.commentTime], function (err, result) {
        if (err) {

        }
        if (result.affectedRows == "0") {
            responseData.code = 3;
            responseData.message = "额，客官你的评论未成功~请重试！";
            res.json(responseData);
            return;
        }else {
            responseData.code = 4;
            responseData.message = "评论成功";
            res.json(responseData);

            //有评论回复时邮件提醒
            var transporter = nodemailer.createTransport({
                host: 'smtp.qq.com',
                secure: true,
                port:'465',
                auth: {
                    user: '@qq.com',
                    pass: '' //授权码,通过QQ获取
                }
            });
            var mailOptionsToAuthor = {
                from: '重庆崽儿Brand <@qq.com>', // 发送者
                to: '@qq.com', // 接受者,可以同时发送多个,以逗号隔开
                subject: '你的博客有新的评论了', // 标题
                text: `来自  ${params.userName} 的评论回复：${params.Content}`, // 文本
                html: `<p> 来自${params.userName} 的评论回复：${params.Content}</p><br><a href="http://www.brandhuang.com/detail/${params.artId}" target="_blank">[ 点击查看 ]</a>`
            };
            var mailOptionsToCommentor = {
                from: '重庆崽儿Brand<@qq.com>', // 发送者
                to: `${params.toUserEmail}`, // 接受者,可以同时发送多个,以逗号隔开
                subject: 'hello,你在重庆崽儿Brand的博客有新的评论回复,点击查看吧', // 标题
                text: `来自 ${params.userName} 的评论回复：${params.Content}`, // 文本
                html: `<p> 来自${params.userName} 的评论回复：${params.Content}</p><br><a href="http://www.brandhuang.com/detail/${params.artId}" target="_blank">[ 点击查看 ]</a>`
            };
            if(params.toUserEmail == null || params.toUserEmail == ""){
                transporter.sendMail(mailOptionsToAuthor, function (err, info) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('发送成功');
                });
            }else {
                transporter.sendMail(mailOptionsToCommentor, function (err, info) {
                    if (err) {
                        return;
                    }
                    console.log('发送成功');
                });
            }

            return;
        }
    })
};




