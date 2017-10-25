/**
 * Created By brand On 2017/10/16
 */
var Article = require("../models/article");
var responseData = {
    code: 0,
    message: ''
};
//随机生成ID
function randomString(A) {
    var A = A || "T";
    return 'x'+A+'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.add = function (req,res) {
    var params = req.body;
    var artId = randomString("A");
    Article.add([artId, params.artTitle, params.artAbstract, params.artCdate, params.artType, params.artTag, params.artContent, params.published], function (err, result) {
        if(err){
            res.json(err);
        }
        if(result){
            responseData.code = 0;
            responseData.message = "文章发布成功";
            res.json(responseData);
        }
    });
};
exports.getTag = function (req,res) {
    Article.tag( function (err, result) {
        if(err){
            res.json(err);
        }
        if(result){
            res.json({tagList: result});
        }
    });
};

exports.getArticleList = function (req,res) {
    var params = req.body;
    var start = (params.pageNum-1) * params.pageRow;
    Article.getArticleNum( function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            Article.getArticleList([start,params.pageRow], function(lastErr, lastResult) {
                if(lastErr){
                    res.json(err)
                }
                if(lastResult){
                    res.json({artList:lastResult,total:result[0].total})
                }
            })

        }
    })
};
exports.getArticleByTitle = function (req,res) {
    var params = req.body;

    Article.getNumByTitle(params.artTitle, function(err, result) {
        if(err){
            res.json(err)
        }
        if(result){
            Article.getArticleByTitle(params.artTitle, function(lastErr, lastResult) {
                if(lastErr){
                    res.json(lastErr)
                }
                if(lastResult){
                    res.json({artList:lastResult,total:result[0].total})
                }
            })
        }
    })
};
exports.changeStatus = function (req,res) {
    var params = req.body;
    Article.status([params.published, params.artId], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            responseData.code = 0;
            responseData.message = "文章状态修改成功";
            res.json(responseData);
        }
    })
};