// 评论模型
const { Comment, validateComment } = require('../../../model/Comment');
const { Post } = require('../../../model/Post');
const { User } = require('../../../model/User');

module.exports = async(req, res) => {
    if (req.session.userInfo) {
        // 存储评论人信息
        req.fields.author = req.session.userInfo._id;
        // 数据格式校验
        const { error } = validateComment(req.fields);
        // 格式不符合要求
        if (error) return res.status(400).send({ message: error.message })
            // 创建评论
        const comment = new Comment(req.fields);
        // 保存评论
        await comment.save();
        // 找到被评论的文章
        let post = await Post.findOne({ _id: req.fields.post });

        // 修改图书借阅数量
        post.nubBorrow = post.nubBorrow + 1;
        // 保存文章数据
        await post.save();
        // 找到借阅的用户
        let user = await User.findOne({ _id: req.fields.author });
        // 修改用户借阅数量
        user.record.borrow = user.record.borrow + 1;
        // 保存用户数据
        await user.save();
        // 响应
        res.send(comment);
    } else {
        res.status(400).send({ message: '请登录' })
    }


}