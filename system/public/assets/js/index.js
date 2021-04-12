//向服务器发送请求 索要用户登录信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        var html = template('indexTpl', response);
        $('#indexBox').html(html);
    }
})