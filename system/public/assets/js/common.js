  //向服务器发送请求 索要用户登录信息
  $.ajax({
      type: 'get',
      url: '/users/' + userId,
      success: function(response) {
          //  console.log(response);
          $('#userName').html('<a href="javascript:;">' + response.nickName + '</a>');
          if (response.role == 'normal') {
              $('#roleJudge').hide();
          }
      }
  })


  //退出登录
  $('#logout').on('click', function() {
      var isConfirm = confirm('确认退出吗');
      if (isConfirm) {
          $.ajax({
              type: 'post',
              url: '/logout',
              success: function() {
                  location.href = '/login.html';
              },
              error: function() {
                  alert('退出失败');
              }
          })
      }
  })

  //处理日期格式
  function formateDate(date) {
      date = new Date(date);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  function backDate(date) {
      date = new Date(date);
      return date.getFullYear() + '-' + (date.getMonth() + 2) + '-' + date.getDate();
  }

  //获取错误提示
  function err(error) {
      var obj = JSON.parse(error.responseText);
      return obj.message;
  }