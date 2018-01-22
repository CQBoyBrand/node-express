/**
 * Created By brand On 2017/10/16
 */
var mysql = require('../config/mysql');// 获取数据库连接配置
var Link = function () {};
module.exports = Link;
    //新增友链
Link.add = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "insert into link(linkId, linkName, linkAddress) values (?, ?, ?)";
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
//获取友链列表（后端）
Link.getLinkList = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "SELECT L.linkId, L.linkName, L.linkAddress FROM link AS L GROUP BY L.linkName limit ?,?;";
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
//获取友链列表（前端）
Link.getWebLinkList = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "SELECT L.linkId, L.linkName, L.linkAddress FROM link AS L GROUP BY L.linkName;";
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
//获取友链数量
Link.getLinkNum = function (callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "select count(*) as total from link;";
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

//编辑友链
Link.edit = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "update link set linkName = ?, linkAddress = ? where linkId = ?;";
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

//删除友链
Link.del = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "delete from link where linkId = ?";
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
//批量删除友链
Link.delBatch = function (params,callback) {
    mysql.pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败！");
            callback(true);
            return;
        }
        console.log("数据库连接成功！");
        var sql = "delete from link where linkId in (?)";
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

