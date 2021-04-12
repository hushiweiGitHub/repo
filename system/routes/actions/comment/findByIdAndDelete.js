// 验证模块
const Joi = require('joi');
// 分类模块
const { Comment } = require('../../../model/Comment');
const { User } = require('../../../model/User');
const { Post } = require('../../../model/Post');


module.exports = async(req, res) => {
    // 获取评论id
    const id = req.params['id'];
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id不符合格式'));
    // 验证
    const { error } = Joi.validate(id, schema);
    // 数据格式没有通过验证
    if (error) return res.status(400).send({ message: error.message });
    // 通过验证

    // 删除分类
    let comment = await Comment.findByIdAndDelete(id);

    //找到图书
    let post = await Post.findOne({ _id: comment.post });
    // 修改图书借阅数量
    post.nubBorrow = post.nubBorrow - 1;
    // 保存用户数据
    await post.save();
    // 找到归还图书的用户
    let user = await User.findOne({ _id: comment.author });
    // 修改用户借阅数量
    user.record.borrow = user.record.borrow - 1;
    // 保存用户数据
    await user.save();

    // 响应
    res.send(comment);

};