var express = require('express');
var router = express.Router();

var User = require('./user');
var Tag = require('./tag');
var Link = require('./link');
var Article = require('./article');
var Comments = require('./comments');

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
router.post('/addComment', Comments.addComment);

module.exports = router;
