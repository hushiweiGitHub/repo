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
        // 展示图书列表页面
        var html = template('booksTpl', { data: response });
        $('#booksBox').html(html);
        var page = template('pageTpl', response);
        $("#page").html(page);
    }
})

// 图书查询列表分页
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

//当点击借阅按钮时
$('#booksBox').on('click', '.borrow', function() {
    if (confirm('您确定要借阅这本书吗？')) {
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'post',
            url: '/comments',
            data: {
                post: id
            },
            success: function(response) {
                alert('借阅成功');
                location.href = '/borrow.html';
            },
            error: function() {
                alert('失败');
            }
        })
    }
})