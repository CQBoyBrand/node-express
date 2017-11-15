/**
 * Created By brand On 2017/10/16
 */
var mysql = require('../config/mysql');// 获取数据库连接配置
var Article = function () {};
module.exports = Article;
    //文章发布
Article.add = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "insert into article values(null,?, ?, ?, ?, ?, ?, ?, ?, 0)";
        connection.query(sql, params, function(err, results) {
            if (err) {
                console.log("连接错误="+err)
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};
//发布页获取标签
Article.tag = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select * from tag";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//前端标签展示
Article.tagList = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "SELECT T.tagId, T.tagName ,COUNT(T.tagId) AS artNum FROM tag AS T LEFT JOIN article AS A ON A.artTag = T.tagId GROUP BY T.tagName;";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//获取文章数量
Article.getArticleNum = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql;
        if( params == "null" ){
            sql = "select count(*) as total from article;"
        }else {
            sql = "select count(*) as total from article where artType = ?;"
        }
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//根据标签获取文章数量
Article.getArticleNumByTag = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select count(*) as total from article  where published =1 and artTag = ?;"
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//获取文章列表(后台管理系统)
Article.getArticleList = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select A.artId, A.artTitle, A.artAbstract, A.artCdate, A.artType, A.artTag, A.published,T.tagName from article as A left join tag T on A.artTag = T.tagId limit ?, ? ";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//获取文章列表（前台）
Article.getArtList = function (params, callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql ;
        if(params.length == 2){
            sql = "select A.artId, A.artTitle, A.artAbstract,A.readNum, A.artCdate, A.artType, A.artTag, A.published,T.tagName from article as A left join tag T on A.artTag = T.tagId where A.published =1 ORDER BY A.artCdate desc limit ?, ?";
        }else {
            sql = "select A.artId, A.artTitle, A.artAbstract,A.readNum, A.artCdate, A.artType, A.artTag, A.published,T.tagName from article as A left join tag T on A.artTag = T.tagId where A.published =1 and A.artType regexp ? ORDER BY A.artCdate desc limit ?, ?";
        }
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//获取热门文章列表（前台）
Article.getHotArtList = function (params, callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select A.artId, A.artTitle, A.published, A.readNum, T.tagName from article as A left join tag T on A.artTag = T.tagId where A.published =1 order by A.readNum DESC limit 6";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//根据标签获取文章列表（前台）
Article.getArticleListByTagId = function (params, callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select A.artId, A.artTitle, A.artAbstract,A.readNum, A.artCdate, A.artType, A.artTag, A.published,T.tagName from article as A left join tag T on A.artTag = T.tagId where A.published =1 and tagId = ? ORDER BY A.artCdate desc limit ?, ?";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//获取文章详情（前台）
Article.getArtDetail = function (params, callback) {
    var readNum = 0;
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        readNum++;
        var sql = "select artTitle, artCdate, artContent, readNum from article where artId = ?";
        var sql2 = "UPDATE article SET readNum = readNum+1 WHERE artId = ?";
        connection.query(sql2, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            connection.query(sql, params, function(err, results) {
                if (err) {
                    callback(true);
                    return;
                }
                callback(false, results);
            })
        });
        connection.release();//释放连接池
    });
}


//根据标题查文章
Article.getArticleByTitle = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select A.artId, A.artTitle, A.artAbstract, A.artCdate, A.artType, A.artTag, A.published,T.tagName from article as A left join tag T on A.artTag = T.tagId  where A.artTitle regexp ?";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//根据标题查文章数量
Article.getNumByTitle = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select count(*) as total from article where artTitle regexp ?";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

//修改文章状态
Article.status = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "update article set published = ? where artId = ?";
        connection.query(sql, params, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};
