  //向服务器发送请求，获取用户列表
  $.ajax({
      type: 'get',
      url: '/users',
      success: function(response) {
          //使用模板引擎将数据和html字符串拼接
          var html = template('userTpl', { data: response });
          //将拼接好的字符串显示在页面中
          $('#userBox').html(html);
          var page = template('pageTpl', response);
          $("#page").html(page);
      }
  })

  //用户列表分页
  function changePage(page) {
      //获取图书列表数据
      $.ajax({
          type: 'get',
          url: '/users',
          data: {
              page: page
          },
          success: function(response) {
              var html = template('userTpl', { data: response });
              $('#userBox').html(html);
              var page = template('pageTpl', response);
              $("#page").html(page);
          }
      })
  }

  //   //处理日期格式
  //   function formateDate(date) {
  //       date = new Date(date);
  //       return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  //   }

  //当点击删除按钮被触发
  $('#userBox').on('click', ".delete", function() {
      //确认管理员是否删除用户
      if (confirm('您真的要删除用户吗？')) {
          var id = $(this).attr('data-id');
          $.ajax({
              type: 'delete',
              url: '/users/' + id,
              success: function() {
                  //页面刷新
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

      //获取所有用户并将用户的状态和全选按钮保持一致
      $('#userBox').find('input').prop('checked', status)
  })

  //当用户复选框状态发生改变时
  $('#userBox').on('change', '.userStatus', function() {
      //获取所有用户
      var inputs = $('#userBox').find('input');
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
      var checkedUser = $('#userBox').find('input').filter(':checked');
      //循环复选框，从复选框元素身上获取data-id
      checkedUser.each(function(index, element) {
          ids.push($(element).attr('data-id'));
      });
      if (confirm('您真的确认进行批量删除操作吗？')) {
          $.ajax({
              type: 'delete',
              url: '/users/' + ids.join('-'),
              success: function() {
                  location.reload();
              }
          })
      }
  })