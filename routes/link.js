/**
 * Created By brand On 2017/10/16
 */
var Link = require("../models/link");
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
    var linkId = randomString();
    Link.add([linkId, params.linkName,  params.linkAddress], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};
//(后端获取友链列表)
exports.getLink = function (req,res) {
    var params = req.body;
    var start = (params.pageNum-1) * params.pageRow;
    Link.getLinkNum(function (err,result) {
        if (err){
            res.json(err);
        }
        if (result){
            Link.getLinkList([start,params.pageRow], function(lastErr, lastResult) {
                if(lastErr){
                    res.json(err);
                }
                if(lastResult){
                    res.json({linkList:lastResult, total:result[0].total})
                }
            })
        }
    })
};
//(前端获取友链列表)
exports.getWebLink = function (req,res) {
    Link.getWebLinkList( function(lastErr, lastResult) {
        if(lastErr){
            res.json(err);
        }
        if(lastResult){
            res.json({linkList:lastResult})
        }
    })
};
exports.editLink = function (req,res) {
    var params = req.body;
    Link.edit([ params.linkName,  params.linkAddress, params.linkId], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};

exports.delLink = function (req,res) {
    var params = req.body;
    Link.del([params.linkId], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};
exports.delLinks = function (req,res) {
    var params = req.body;
    Link.delBatch([params.linkId], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};