## Table 表格
常用的表格。

### 基础用法

基础的table用法。

:::demo 测试测试测试。

```html
<wau-property-table :value="tableData"/>
<script>
export default {
    data() {
      return {
        tableData: [
        {
          title: '配置项名称',
          slot: 'propertyName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '配置项key',
          slot: 'propertyKey',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '是否必填',
          slot: 'required',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '默认值',
          slot: 'defaultValue',
          minWidth: 120,
          align: 'center'
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
| value | 显示的数据 | array | — | —      |
