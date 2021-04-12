const post = require('express').Router();
// 添加图书信息
post.post('/', require('./actions/post/create'));
// 根据ID删除文章
post.delete('/:id', require('./actions/post/findByIdAndDelete'));
// 查询所有文章
post.get('/', require('./actions/post/find'));

// 根据分类获取文章列表
post.get('/category/:id', require('./actions/post/category'));
// 图书搜索
post.get('/search/:key', require('./actions/post/search'));
// 根据图书id获取图书信息
post.get('/:id', require('./actions/post/findById'));
// 根据ID修改图书
post.put('/:id', require('./actions/post/findByIdAndUpdate'));
// 根据ID修改图书状态
post.put('/state/:id', require('./actions/post/stateUpdate'));


module.exports = post;