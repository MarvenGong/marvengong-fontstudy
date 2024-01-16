## Auth 权限
常用的auth。

### 基础用法


:::demo 测试测试测试。

```html
<wau-auth :authority="['admin']" :access="['admin']">
    <span type="success">通过</span>
    <span slot="noMatch" type="error">不通过</span>
</wau-auth>
<script>
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型   | 可选值                | 默认值 |
| ---- | ---- | ------ | --------------------- | ------ |
| to | — | — | string, array, function, boolean | —      |
| authority | — | — | string, array | true      |
| access | — | — | string, array | —      |
| prevent | — | — | soolean | false     |
| message | — | — | string | 您没有权限进行此操作      |
| customTip | — | — | boolean | false      |
| display | — | — | string | —      |
