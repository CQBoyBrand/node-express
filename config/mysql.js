/**
 * Created By brand On 2017/10/16
 *
 * 建立数据库连接
 */
var mysql = require('mysql');
var config = require('./db');

//数据库连接
var pool = mysql.createPool(config.mysql);

exports.pool = pool;