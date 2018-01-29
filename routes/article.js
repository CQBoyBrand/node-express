/**
 * Created By brand On 2017/10/16
 */
var Article = require("../models/article");
var Comment = require("../models/comments");
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
exports.edit = function (req,res) {
    var params = req.body;
    Article.edit([ params.artTitle, params.artThumb, params.artAbstract, params.artType, params.artTag, params.artContent, params.artId], function (err, result) {
        if(err){
            res.json(err);
        }
        if(result){
            responseData.code = 0;
            responseData.message = "文章修改成功";
            res.json(responseData);
        }
    });
};
exports.add = function (req,res) {
    var params = req.body;
    var artId = randomString("A");
    Article.add([artId, params.artTitle, params.artThumb, params.artAbstract, params.artCdate, params.artType, params.artTag, params.artContent, params.published], function (err, result) {
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
    if(params.artType == undefined){
        params.artType ="null";
    }
    Article.getArticleNum( [params.artType], function(err, result) {
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
    var start = (params.pageNum-1) * params.pageRow;
    Article.getNumByTitle(params.artTitle, function(err, result) {
        if(err){
            res.json(err)
        }
        if(result){
            Article.getArticleByTitle([params.artTitle,start,params.pageRow], function(lastErr, lastResult) {
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
//前端获取文章列表
exports.getArtList = function (req,res) {
    var params = req.body;
    var arr = Object.keys(params)
    var start = (params.pageNum-1) * params.pageRow;
    var arg;
    if(arr.length == 2){
        arg = [start,params.pageRow]
    }else {
        arg = [params.artType,start,params.pageRow]
    }
    if(params.artType == undefined){
        params.artType ="null";
    }
    Article.getArticleNum([params.artType], function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            Article.getArtList( arg,function(lastErr, lastResult) {
                if (lastErr) {
                    res.json(lastErr)
                }
                if (lastResult) {
                    res.json({artList:lastResult,total:result[0].total})
                }
            })
        }
    })

};
exports.getHotArtList = function (req,res) {
    Article.getHotArtList( function (err, result) {
        if(err){
            res.json(err);
        }
        if(result){
            res.json({hotArtList: result});
        }
    });
};
exports.getArtDetail = function (req,res) {
    var params = req.body;
    Article.getArtDetail( params.artId,function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            console.log(result)
            Comment.getComment(params.artId,function (errComment,resultComment,) {
                if(errComment){
                    res.json(err)
                }
                result[0].comment = resultComment
                res.json({article:result})
            })

        }
    })
};

exports.getTagList = function (req,res) {
    Article.tagList( function (err, result) {
        if(err){
            res.json(err);
        }
        if(result){
            res.json({tagList: result});
        }
    });
};
exports.getArticleListByTagId = function (req, res) {
    var params = req.body;
    var artTag = params.tagId;
    var start = (params.pageNum-1) * params.pageRow;
    Article.getArticleNumByTag([artTag],function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            Article.getArticleListByTagId( [params.tagId, start, params.pageRow],function(LastErr, lastResult) {
                if (LastErr) {
                    res.json(LastErr)
                }
                if (lastResult) {

                    res.json({article:lastResult,total:result[0].total})
                }
            })
        }
    })

}
//文章归档分类
exports.articleGroupByMonth = function (req,res) {
    Article.group(function (err,result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            res.json(result)
        }
    })
}
exports.getArticleListByDate = function (req, res) {
    var params = req.body;
    var artCdate = params.artCdate;
    var start = (params.pageNum-1) * params.pageRow;
    Article.getArticleNumByDate([artCdate],function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            Article.getArticleListByDate( [params.artCdate, start, params.pageRow],function(LastErr, lastResult) {
                if (LastErr) {
                    res.json(LastErr)
                }
                if (lastResult) {

                    res.json({article:lastResult,total:result[0].total})
                }
            })
        }
    })

}

//修改文章获取文章详情
exports.getArtDetailById = function (req,res) {
    var params = req.body;
    Article.getArtDetailById( params.artId,function(err, result) {
        if (err) {
            res.json(err)
        }
        if (result) {
            //res.json({artList:result,total:result[0].total})
            res.json({article:result})
        }
    })
};