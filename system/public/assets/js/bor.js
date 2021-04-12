//获取个人借阅记录数据
$.ajax({
    type: 'get',
    url: '/comments/' + userId,
    success: function(response) {
        console.log(response);
        var html = template('borrowTpl', { data: response });
        $('#borrowBox').html(html);
        var pageHtml = template('pageTpl', { data: response });
        $('#page').html(pageHtml);
    }
});
//获取分页数据
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('borrowTpl', { data: response });
            $('#borrowBox').html(html);
            var pageHtml = template('pageTpl', { data: response });
            $('#page').html(pageHtml);
        }
    })
}

//归还
$('#borrowBox').on('click', '.back', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function(response) {
            // console.log(response);
            location.reload();
        }
    })
})