/**
 * Created By brand On 2017/10/16
 */
var Tag = require("../models/tag");
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
    var tagId = randomString();
    Tag.add([tagId, params.tagName,  params.tagDescription], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};
exports.getTag = function (req,res) {
    var params = req.body;
    var start = (params.pageNum-1) * params.pageRow;
    Tag.getTagNum(function (err,result) {
        if (err){
            res.json(err);
        }
        if (result){
            Tag.getTagList([start,params.pageRow], function(lastErr, lastResult) {
                if(lastErr){
                    res.json(err);
                }
                if(lastResult){
                    res.json({tagList:lastResult, total:result[0].total})
                }
            })
        }
    })
};
exports.editTag = function (req,res) {
    var params = req.body;
    Tag.edit([ params.tagName,  params.tagDescription, params.tagId], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};

exports.delTag = function (req,res) {
    var params = req.body;
    Tag.del([params.tagId], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};
exports.delTags = function (req,res) {
    var params = req.body;
    Tag.delBatch([params.tagId], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result);
        }
    })
};