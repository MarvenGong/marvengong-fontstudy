## Header 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 测试测试测试。

```html
<wau-page-header :tab-list="tabList"></wau-page-header>
<script>
export default {
  data() {
    return {
      tabList: [
        {
          label: '首页',
          name: 'main',
        },
        {
          label: '活动',
          name: 'activity',
        }
      ]
    }
  }
}
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型   | 可选值                | 默认值 |
| ---- | ---- | ------ | --------------------- | ------ |
| tabList | 导航 | array | — | —      |
| tabActiveKey | 激活项 | string | — | —      |

