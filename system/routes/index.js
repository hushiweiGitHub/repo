// 路由集合
module.exports = app => {
    // 用户
    app.use('/users', require('./user'));
    // 分类
    app.use('/categories', require('./category'));
    // 图书
    app.use('/posts', require('./post'));
    // 借阅记录
    app.use('/comments', require('./comment'));


    // 其他
    // 用户登录
    app.post('/login', require('./actions/other/login'));
    // 用户退出
    app.post('/logout', require('./actions/other/logout'));
    // 判断用户是否登录
    app.get('/login/status', require('./actions/other/loginStatus'));

};