/**
 * Created By brand On 2017/10/16
 */
const utility = require('utility')
var Comment = require("../models/comments");
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
    let webSite = params.userWebsite || "";
    let fromUserId = randomString("U");
    let commentId = randomString("C");
    Comment.add([commentId,params.artId,fromUserId, params.userName, params.userEmail, webSite, params.Content,params.commentTime], function (err, result) {
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
            return;
        }
    })
};




