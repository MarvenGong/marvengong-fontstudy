## DeleteModal 删除
常用的delete-modal。

### 基础用法


:::demo 测试测试测试。

```html
<Button @click="handleCliak">显示删除弹框</Button>
<wau-delete-modal :value="value"></wau-delete-modal>
<script>
export default {
    data() {
        return {
            value: {
                show: false,
                content: '王者荣耀'
            }
        }
    },
    methods: {
        handleCliak() {
            console.log(this.value.show);
            this.value.show = true;
            console.log(this.value.show);
        }
    }
}
</script>

```
:::

### Attributes
| 参数 | 说明 | 类型   | 可选值                | 默认值 |
| ---- | ---- | ------ | --------------------- | ------ |
| value | 弹框信息配置 | ogject | — | —      |
