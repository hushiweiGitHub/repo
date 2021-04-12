// 用户模块
const { Post } = require('../../../model/Post');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');


module.exports = async(req, res) => {
    // 当前页
    let page = +req.query.page;
    // 如果页码没有传递
    if (!page || !_.isNumber(page)) page = 1;
    // 获取用户输入的关键字
    const key = req.params.key;
    // 如果用户输入了搜索关键字
    if (key.trim().length > 0) {
        const regex = new RegExp(escapeRegex(key), 'gi');
        // 根据关键字查询图书 
        const posts = await pagination(Post).page(page).size(10).display(5).find({ title: regex }).populate('category').exec();
        // 响应
        res.send(posts);
    } else {
        res.status(400).send({ message: '请输入搜索关键字' })
    }

}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};