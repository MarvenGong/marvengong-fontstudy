## 安装

### npm 安装（推荐）

```shell
npm i @wii-fe/wau
```

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import Wau from '@wii-fe/wau';
import '@wii-fe/wau/packages/styles/index.less'; // 或用 '@wii-fe/wau/lib/wau.css'
import App from './App.vue';

Vue.use(Wau);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Wau 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-import：

```bash
npm install babel-plugin-import -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "import",
      {
        "libraryName": "@wii-fe/wau",
        "styleLibraryDirectory": "packages/styles"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button } from '@wii-fe/wau';
import App from './App.vue';

Vue.component(Button.name, Button);
/* 或写为
 * Vue.use(Button)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 静态文件方式引入

在页面上引入 js 和 css 文件即可开始使用。

**推荐存入 CDN 并添加版本号！**

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="<...>/@wii-fe/wau/lib/wau.css">
<!-- 引入组件库 -->
<script src="<...>/@wii-fe/wau/lib/index.js"></script>
```
