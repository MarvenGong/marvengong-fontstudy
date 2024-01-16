
window.tencentBookmarks = [];
const deepGetTCBookmark = function(bookmarks) {
  for (let i = 0; i < bookmarks.length; i++) {
    let item = bookmarks[i];
    if (item.title === '@tencent') {
      window.tencentBookmarks = item.children;
    }
    if (item.children) {
      console.log('子目录', item);
      deepGetTCBookmark(item.children)
    }
  }
}
let app = new Vue({
  name: 'app',
  el: '#app',
  data() {
    return {
      searchKey: '',
      name: '腾讯工作浏览器书签',
      bookmarks: []
    }
  },
  methods: {
    handleClick(url) {
      chrome.tabs.create({
        url: url,
        active: true
      })
    }
  },
  mounted() {
    chrome.bookmarks.getTree(function(res) {
      deepGetTCBookmark(res);
      app.$data.bookmarks = window.tencentBookmarks;
    })
  }
})
