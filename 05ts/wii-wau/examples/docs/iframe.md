## Iframe 框架
常用的iframe。

### 基础用法

基础的iframe用法。

:::demo 测试测试测试。

```html
<wau-iframe :src="src"></wau-iframe>
<script>
export default {
    data() {
        return {
            src: 'https://all-test-1252759886.file.myqcloud.com/media/1219bbaa5ce3a945c4adc5c962dc94a7.jpeg'
        }
    }
}
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型   | 可选值                | 默认值 |
| ---- | ---- | ------ | --------------------- | ------ |
| src | 嵌套的内容 | string | — | —      |
