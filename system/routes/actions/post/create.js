// 文章模型
const { Post, validatePost } = require('../../../model/Post');

module.exports = async(req, res) => {
    // 数据格式校验
    const { error } = validatePost(req.fields);
    // 格式不符合要求
    if (error) return res.status(400).send({ message: error.details });
    // 查询图书号
    let post = await Post.findOne({ bookNub: req.fields.bookNub });
    // 图书号已存在
    if (post) return res.status(400).send({ message: '图书号已被使用' });
    // 用户不存在 可以正常执行注册流程
    // 创建分类
    post = new Post(req.fields);
    // 保存分类
    await post.save();
    // 响应
    res.send(post);
}