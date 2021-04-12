// 用户模块
const { User } = require('../../../model/User');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');


module.exports = async(req, res) => {
    // 当前页
    let page = +req.query.page;
    // 如果页码没有传递
    if (!page || !_.isNumber(page)) page = 1;
    // 查询所有用户信息
    const users = await pagination(User).page(page).size(10).display(5).find().select('-password').sort('-createTime').exec();
    // 响应
    res.send(users);
}