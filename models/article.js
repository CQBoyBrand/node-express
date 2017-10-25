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
        var sql = "insert into article values(null,?, ?, ?, ?, ?, ?, ?, ?)";
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
//获取文章数量
Article.getArticleNum = function (callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select count(*) as total from article;";
        connection.query(sql, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};
//获取文章列表
Article.getArticleList = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select A.artId, A.artTitle, A.artAbstract, A.artCdate, A.artType, A.artTag, A.published,T.tagName from article as A left join tag T on A.artTag = T.tagId limit ?, ?";
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
