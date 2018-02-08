var express = require('express');
var RateLimit = require('express-rate-limit');//限制ip访问
var router = express.Router();

var User = require('./user');
var Tag = require('./tag');
var Link = require('./link');
var Article = require('./article');
var Comments = require('./comments');

//同一ip在20秒内只允许发送一次请求
var responseData = {
    code: 0,
    message: ''
}
var ipLimiter = new RateLimit({
    windowMs: 20*1000, // 20秒
    max: 1, // start blocking after 5 requests
    message: "不要再戳啦，休息20秒再战可好！",
    handler: function (req, res) { // 响应格式
        responseData.code = 439;
        responseData.message = "不要再戳啦，休息20秒再战可好！";
        res.json(responseData);
    }
});

//用户
router.post('/login', User.login);
router.post('/changePwd', User.changePwd);
router.post('/getUserInfo', User.getUserInfo);
router.post('/changeUserInfo', User.changeUserInfo);

//标签
router.post('/addTag', Tag.add);
router.post('/getTagList', Tag.getTag);
router.post('/editTag', Tag.editTag);
router.post('/delTag', Tag.delTag);
router.post('/delTags', Tag.delTags);

//友链
router.post('/addLink', Link.add);
router.post('/getLinkList', Link.getLink);
router.post('/getWebLink', Link.getWebLink);
router.post('/editLink', Link.editLink);
router.post('/delLink', Link.delLink);
router.post('/delLinks', Link.delLinks);

//文章
router.post('/getArticleList', Article.getArticleList);
router.post('/changeStatus', Article.changeStatus);
router.post('/getArticleByTitle', Article.getArticleByTitle);
router.post('/addArticle', Article.add);
router.post('/editArticle', Article.edit);
router.get('/getTag', Article.getTag);
router.post('/getArtDetailById', Article.getArtDetailById);

//前台文章
router.post('/getArtList', Article.getArtList);
router.post('/getArtDetail', Article.getArtDetail);
router.post('/getArtListByTagId', Article.getArticleListByTagId);
router.get('/getHotArtList', Article.getHotArtList);

//前台标签展示
router.post('/getTags', Article.getTagList);
router.get('/getArticleDate', Article.articleGroupByMonth);
router.post('/getArticleListByDate', Article.getArticleListByDate);

//文章评论
router.post('/addComment',ipLimiter,Comments.addComment);

module.exports = router;
