

$(document).ready(function() {
  console.log('自动检测待处理合并或者审批开启...');
  const pendings = $(".merge-request");
  setInterval(function(){
    history.go(0);
  }, 10000);
  if (pendings.length <= 0) return false;
  $('.merge-request.js-shortcuts-item')
    .find('.row_title.js-shortcuts-link')
    .each(function(index, ele) {
      const link = $(ele).attr('href');
      console.log('当前待处理列表：' + link);
      if (!link) return false;
      // 记录插件自动点击的链接
      const ary = JSON.parse(localStorage.getItem('gam-merges') || '[]');
      if (ary.indexOf(link) >= 0) {
        return false; // 如果已经处理过了不再处理
      }
      // 打开处理页面
      window.open(location.origin + '/' + link);
      ary.push(link);
      localStorage.setItem('gam-merges', JSON.stringify(ary));
      // 通知用户正在处理合并
      chrome.runtime.sendMessage({
        info: {
          type: 'merge_request'
        }
      }, res => {
        console.info('通知后台发送消息成功');
      });
    })
})