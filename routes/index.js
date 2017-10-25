var express = require('express');
var router = express.Router();

var User = require('./user');
var Tag = require('./tag');
var Article = require('./article');

//用户
router.post('/login', User.login);

//标签
router.post('/addTag', Tag.add);
router.post('/getTagList', Tag.getTag);
router.post('/editTag', Tag.editTag);
router.post('/delTag', Tag.delTag);
router.post('/delTags', Tag.delTags);

//文章
router.post('/getArticleList', Article.getArticleList);
router.post('/changeStatus', Article.changeStatus);
router.post('/getArticleByTitle', Article.getArticleByTitle);
router.post('/addArticle', Article.add);
router.get('/getTag', Article.getTag);

module.exports = router;
