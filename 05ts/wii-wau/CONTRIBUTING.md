# Wau

## 快速上手

### 一、准备工作

   ```bash
   git clone https://wii.coding.net/p/wii-fe/d/wii-wau/git
   cd wii-wau
   yarn install
   ```

### 二、运行开发环境

   ```bash
   yarn dev
   # OR
   yarn dev:play
   ```

### 三、Git Commit

   1. Add commit plugin

      docs: https://github.com/fbi-templates/fbi-task-commit#usage

      ```bash
      # install fbi
      npm i -g fbi

      # add commit plugin
      fbi add factory-commands
      ```

   2. Commit

      ```bash
      fbi commit

      # if you wanna release new version, please check 'Bump the package version? Yes'
      ```

### 四、npm 包发布

   ```bash
   yarn build

   npm publish
   ```

### 五、文档部署

   ```bash
   yarn deploy

   # 会生成静态资源文件 /examples/wau，再使用 nginx 部署静态资源
   ```

## 架构说明

### 项目目录

```
wii-wau
│
├── build // 打包命令相关的配置
│
├── dist // 直接可用的打包文件
│
├── lib // 打包后的代码，遵循 commonjs 模块化规范
│
├── public // 发布静态资源的目录
│
├── examples
│   │
│   ├── docs // 文档目录
│   │   │
│   │   └── installation.md
│   │
│   ├── play // 运行 dev:play 时候的 demo 文件目录
│   │
│   └── nav.config.json // 左侧导航栏配置文件
│
├── packages
│   │
│   ├── styles // 样式目录
│   │   │
│   │   ├── common // 全局 class
│   │   │
│   │   ├── mixins // less mixin
│   │   │
│   │   ├── themes // less 变量配置文件
│   │   │
│   │   ├── button-a.less // 组件A的样式文件
│   │   │
│   │   └── index.less // 自动生成
│   │
│   ├── button-a // 组件A目录
│   │
│   └── button-b // 组件B目录
│
├── src
│   │
│   ├── mixins // 公共 mixins 目录
│   │
│   ├── utils // 公共方法目录
│   │
│   └── index.js // 注意：此文件自动生成的
│
├── test // 测试相关（待完善）
│
├── types // d.ts 文件，手写组件的 ts 支持
│
├── components.json // 组件配置列表
│
└── README.md
```

## 注意事项

### 项目中的所有文件夹为【小写英文单词、中划线】组合：xxx-xxx

如：icon-test

### 抛出的组件为首字母大写驼峰的形式

```js
import WauButton from './src/button';

WauButton.install = function (Vue) {
  Vue.component(WauButton.name, WauButton);
};

export default WauButton;
```

### 静态资源放入 public 目录中

在代码中直接使用别名引入

```js
import testImg from '@wii-fe/wau/public/images/empty.svg';
```

```less
.img {
  background-image: url('~@wii-fe/wau/public/images/empty.svg');
}
```

### 组件不启用 css modules

启用 css modules 会造成，组件内部 className 被打包编译为带有 hash 的名称，导致外部无法稳定有效的重置覆盖组件样式。

所以我们组件不启用 css modules！！！

### 样式文件分离到 packages/styles/<组件名>.less

我们使用了 babel-plugin-import 插件实现了组件的按需加载样式：

```js
import { Button } from '@wii-fe/wau';

// 编译后
import '@wii-fe/wau/packages/styles/button.less';
import Button from '@wii-fe/wau/lib/button.js';
```

**babel 配置请查看接入文档**

### 样式文件编码规范

1. 多用公共 mixins、themes、class 等；
2. 局部变量使用驼峰命名，公共变量使用小写中划线分隔；
3. 组件需要用 `wau-prefix` 变量包裹，避免样式污染；
4. ...

```less
// button.less 文件代码

@import './themes/index.less'; // 引入公共变量

@testTqt: red; // 局部变量使用驼峰命名

.@{wau-prefix}-button { // 此变量是公共变量，公共变量使用小写中划线分隔
  padding: 20px;
  background-image: url('~@wii-fe/wau/public/images/empty.svg');
  border: 1px solid @testTqt;

  img {
    display: block;
    width: 100px;
    height: 100px;
    border: 1px solid green;
  }
}
```

### 文档开发规范

特殊代码块输写示例

````
:::demo 测试测试测试。

```html
<wau-button />
```
:::
````

## 遗留问题

### 1.打包iview的样式时候，他引入的font文件问题

我们的样式库是基于 view-design 的，所以我们的 base.less 中是引入了 `@import 'view-design/src/styles/index.less';`，但是在打包 dist/wau.css 时候，其中打包后的资源文件地址是有错误的，待解决

### 2.less3 和 less-loader 引入图片问题

less3 默认引入 `node_modules` 文件的时候是没有 `~` 前缀的，而 less-loader 是有的
