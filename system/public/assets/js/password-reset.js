//当修改密码表单发生提交行为的时候
$('#modifyForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            location.href = 'login.html'
        },
        error: function(result) {
            var tip = err(result);
            console.log(tip);
            $('#error').text(tip);
        }
    })
    return false;
})