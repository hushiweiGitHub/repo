// 文章评论路由
const comment = require('express').Router();

// 添加评论
comment.post('/', require('./actions/comment/create'));
// 根据id删除
comment.delete('/:id', require('./actions/comment/findByIdAndDelete'));
// 获取评论列表
comment.get('/', require('./actions/comment/find'));
//根据id获取借阅记录列表
comment.get('/:id', require('./actions/comment/findById'));

// 更改评论状态
comment.put('/:id', require('./actions/comment/findByIdAndUpdate'));


// 导出路由
module.exports = comment;