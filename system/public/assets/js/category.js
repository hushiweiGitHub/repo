//分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    //获取表单中的数据
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    });
    // 阻止表单默认提交行为  
    return false;
})

//请求分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryListTpl', { data: response });
        $('#categoryBox').html(html);
    }
})

//为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    // 获取要修改的分类数据的id 
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    })
})

//为修改按钮添加提交事件
$('#formBox').on('submit', '#modifyCategory', function() {
    //获取表单中的数据  
    var formData = $(this).serialize();
    //获取要修改的分类的id
    var id = $(this).attr('data-id');
    //发送请求修改数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(response) {
            location.reload();
        }
    });
    //阻止表单默认提交行为
    return false;
})

//当删除按钮被点击
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗？')) {
        //获取要删除的分类数据的id
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})