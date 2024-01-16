
function checkNotification(){
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // check whether notification permissions have alredy been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    console.info("Granted!");
  }
  // Otherwise, ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        alert("Request granted!");
      }
    });
  }
}
checkNotification();

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  const res = req.info
  if (res.type === 'merge_request') {
    chrome.notifications.create(Math.random()+'',{
        type: 'basic',
        title: '工蜂重要消息提醒',
        iconUrl: '/img/favicon.ico',
        // imageUrl: '/img/favicon.ico',
        message: '您有一个待处理的合并请求，gam 插件正在自动处理...'
      },
      function(id) {
        console.log(id);
      }
    )
    chrome.tabs.getCurrent(function(tab) {
      // tab.alert('工蜂重要消息提醒');
      chrome.tabs.highlight({
        tabs: [tab.id]
      });
    })
  }
})
