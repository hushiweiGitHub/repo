//获取借阅记录列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        console.log(response);
        for (var i = 0; i < response.records.length; i++) {
            if (response.records[i].post == null || response.records[i].author == null) {
                $.ajax({
                    type: 'delete',
                    url: '/comments/' + response.records[i]._id,
                    success: function() {
                        location.reload();
                    }
                })
            }
        }
        var html = template('borrowTpl', response);
        $('#borrowBox').html(html);
        var pageHtml = template('pageTpl', response);
        $('#page').html(pageHtml);
    }
})


//获取分页数据
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('borrowTpl', response);
            $('#borrowBox').html(html);
            var pageHtml = template('pageTpl', response);
            $('#page').html(pageHtml);
        }
    })
}

$('#borrowBox').on('click', '.delete', function() {
    if (confirm('您真的要进行删除操作吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})