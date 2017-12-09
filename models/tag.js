/**
 * Created By brand On 2017/10/16
 */
var mysql = require('../config/mysql');// 获取数据库连接配置
var Tag = function () {};
module.exports = Tag;
    //新增标签
Tag.add = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "insert into tag(tagId, tagName, tagDescription) values (?, ?, ?)";
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
//获取标签列表
Tag.getTagList = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "SELECT T.tagId, T.tagName, T.tagDescription ,COUNT(T.tagId) AS artNum FROM tag AS T LEFT JOIN article AS A ON A.artTag = T.tagId GROUP BY T.tagName limit ?,?;";
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
//获取标签数量
Tag.getTagNum = function (callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select count(*) as total from tag;";
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

//编辑标签
Tag.edit = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "update tag set tagName = ?, tagDescription = ? where tagId = ?;";
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

//删除标签
Tag.del = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "delete from tag where tagId = ?";
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
//批量删除标签
Tag.delBatch = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "delete from tag where tagId in (?)";
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

