//当表单发生提交行为的时候
$('#userForm').on('submit', function() {
    //获取用户在表单中的输入内容，并将内容格式化成参数字符串
    var formData = $(this).serialize();
    //向服务器发送添加用户请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.href = "/admin/admin-userslist.html";
        },
        error: function() {
            alert('用户添加失败')
        }
    });
    // 阻止表单默认行为
    return false;
})