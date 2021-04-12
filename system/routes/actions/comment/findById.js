// 验证模块
const Joi = require('joi');
// 用户模块
const { Comment } = require('../../../model/Comment');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async(req, res) => {
    // 获取用户id
    const id = req.params['id'];
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id不符合格式'));
    // 验证
    const { error } = Joi.validate(id, schema);
    // 数据格式没有通过验证
    if (error) return res.status(400).send({ message: error.message });
    // 通过验证
    // 当前页
    let page = +req.query.page;
    // 如果页码没有传递
    if (!page || !_.isNumber(page)) page = 1;
    // 根据用户id查询记录数据  
    const comments = await pagination(Comment).page(page).size(10).display(5).find({ author: id }).populate('post').exec();
    // 保存
    // 响应
    return res.send(comments);
}