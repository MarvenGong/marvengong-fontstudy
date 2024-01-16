## Image 图片
常用的image。

### 基础用法


:::demo 测试测试测试。

```html
<wau-image
    :width="75"
    :height="75"
    :value="url"
></wau-image>
<script>
export default {
    data() {
    return {
        url: 'https://all-test-1252759886.file.myqcloud.com/media/1219bbaa5ce3a945c4adc5c962dc94a7.jpeg'
    }
    }
}
</script>

```
:::

### Attributes
| 参数 | 说明 | 类型   | 可选值                | 默认值 |
| ---- | ---- | ------ | --------------------- | ------ |
| width | 宽 | string | — | —      |
| height | 高 | string | — | —      |
| value | 图片源 | string | — | —      |
