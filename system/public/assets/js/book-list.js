//获取图书列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        // 展示数据前先进行判断
        var arr = response.records;
        for (var i = 0; i < arr.length; i++) {
            //判断图书总数与借出数量是否相等
            // 判断状态是否为可借阅
            if (arr[i].nubBorrow == arr[i].nubAll && arr[i].state == 0) {
                var state = arr[i].state;
                var id = arr[i]._id;
                $.ajax({
                    type: 'put',
                    url: '/posts/state/' + id,
                    data: {
                        state: 1
                    },
                    success: function() {
                        location.reload();
                    }
                })
            } else if (arr[i].nubBorrow < arr[i].nubAll && arr[i].state == 1) {
                //判断图书总数是否大于借出数量
                // 判断状态是否为已借完
                var state = arr[i].state;
                var id = arr[i]._id;
                $.ajax({
                    type: 'put',
                    url: '/posts/state/' + id,
                    data: {
                        state: 0
                    },
                    success: function() {
                        location.reload();
                    }
                })
            }
        }
        var html = template('booksTpl', { data: response });
        $('#booksBox').html(html);
        var page = template('pageTpl', response);
        $("#page").html(page);
    }
})

//图书列表分页
function changePage(page) {
    //获取图书列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('booksTpl', { data: response });
            $('#booksBox').html(html);
            var page = template('pageTpl', response);
            $("#page").html(page);
        }
    })
}

// 向服务器发送请求，获取分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryTpl', { data: response });
        $('#categoryBox').html(html);
    }
})

//当用户进行文章列表分类查询的时候
$('#search_category').on('click', function() {
    //获取选则的过滤条件
    var category = $('#categoryBox').val();
    // 向服务器发送请求，根据条件索要列表信息
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            category: category
        },
        success: function(response) {
            var html = template('booksTpl', { data: response });
            $('#booksBox').html(html);
            var page = template('pageTpl', response);
            $("#page").html(page);
        }
    });
})

//当用户进行关键字查询的时候
$('#search_keys').on('click', function() {
    var key = $('#keys').val();
    $.ajax({
        type: 'get',
        url: '/posts/search/' + key,
        success: function(response) {
            var html = template('booksTpl', { data: response });
            $('#booksBox').html(html);
            var page = template('pageTpl', response);
            $("#page").html(page);
        }
    })
})

//当删除按钮被触发时
$('#booksBox').on('click', '.delete', function() {
    //弹出确认框，再次确认
    if (confirm('您真的要进行删除操作吗？')) {
        //获取要删除的文章id  
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})

//获取全选按钮
var selectAll = $('#selectAll');
//获取批量删除按钮
var deleteMany = $('#deleteMany');
//当全选按钮发生改变时
selectAll.on('click', function() {
    //获取全选按钮当前状态
    var status = $(this).prop('checked');
    if (status) {
        //显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }

    //获取所有图书并将用户的状态和全选按钮保持一致
    $('#booksBox').find('input').prop('checked', status)
})

//当用户复选框状态发生改变时
$('#booksBox').on('change', '.bookStatus', function() {
    //获取所有用户
    var inputs = $('#booksBox').find('input');
    // 判断用户和复选框被选中的数量是否一致
    if (inputs.length == inputs.filter(':checked').length) {
        //若一致，用户都是被选中的，全选框为选中状态
        selectAll.prop('checked', true);
    } else {
        //若不一致，用户没有都被选中，全选框为false
        selectAll.prop('checked', false);
    }

    //如果被选中的复选框数量大于0
    if (inputs.filter(':checked').length > 0) {
        //显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
})

// 为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#booksBox').find('input').filter(':checked');
    //循环复选框，从复选框元素身上获取data-id
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('您真的确认进行批量删除操作吗？')) {
        $.ajax({
            type: 'delete',
            url: '/posts/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    }
})