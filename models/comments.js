/**
 * Created By brand On 2017/10/16
 */
var mysql = require('../config/mysql');// 获取数据库连接配置
var Comments = function () {
};
module.exports = Comments;
//新增评论
Comments.add = function (params, callback) {
    mysql.pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "insert into comment(id,parentCommentId,commentId,artId, fromUserId, userName,userEmail,toUserEmail,userWebsite,Content,commentTime) values (null,?,?,?, ?,?, ?,?, ?, ?,?)";
        connection.query(sql, params, function (err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};

Comments.getComment = function (params, callback) {
    mysql.pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = 'select parentCommentId, commentId,artId, fromUserId, userName,userEmail,userWebsite,Content,commentTime from comment where artId = ? ';
        connection.query(sql, params, function (err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
        connection.release();//释放连接池
    });
};
