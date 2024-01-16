$(document).ready(function() {
  function checkHaveDone() {
    // 打开右上角用户信息弹窗
    $('li[data-container="#avatar-content"]').trigger('click');
    let currLoginUser = $('#avatar-content').find('span.nick-name').text();
    let currUsername = $.trim(currLoginUser);
    // 查询草鱼人列表 判断是否点击过了
    let ihaveDone = false;
    const hasAgrees = $('.participants .tooltipstered');
    if (hasAgrees.length === 0) {
      ihaveDone = false;
    } else {
      hasAgrees.each(function(index, ele) {
        let aname = $(ele).attr('href');
        if (aname.indexOf(currUsername) >= 0) {
          ihaveDone = true;
        }
      })
    }
    return ihaveDone;
  }
  setTimeout(function() {
    // 如果已经处理过了不处理了
    if (checkHaveDone()) {
      console.log('这个请求你已经处理过了');
      window.close();
      return false;
    };
    // 如果还没审批过，自动审批
    const btnAgree = $('.js-review-change-btn[data-original-title="同意"]');
    btnAgree.trigger('click');
    setTimeout(function(){
      $('#summary').text('同意');
      $(".popover #command").trigger('submit'); //find('button[type="submit"]').trigger('click');
    }, 500)
  }, 1000)
 
});
