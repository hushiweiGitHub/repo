//获取图书分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(response) {
        var html = template('categoryTpl', { data: response });
        $('#category').html(html);
    }
})

//添加图书表单提交时
$('#addForm').on('submit', function() {
    //获取表单的内容
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            console.log(1);
            //添加成功后跳转到图书列表页面
            location.href = "/admin/admin-bookslist.html"
        },
        error: function(result) {
            // console.log(result.responseText);
            var message = JSON.parse(result.responseText);
            // console.log(message.message);
            $('#err').html(message.message);
        }
    })
    return false;
})


//从地址栏中获取参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}

//获取地址栏中的id参数
var id = getUrlParams('id');
//当前是在做修改操作
if (id != -1) {
    // 根据id获取详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            // 获取图书分类数据
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function(categories) {
                    response.categories = categories;
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            })

        }
    })
}

//当修改图书信息发送提交行为时
$('#parentBox').on('submit', '#modifyForm', function() {
    //获取修改表单中的内容
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/admin-bookslist.html';
        }
    })

    return false;
})