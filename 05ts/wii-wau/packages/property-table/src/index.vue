<template>
  <div class="property-table">
    <Button v-if="btnRequired" class="ivu-mb" type="primary" @click="addNew">
      <Icon size="20" type="ios-add" />
      新增
    </Button>
    <Table height="500" :columns="columns" :data="list">
      <template slot="propertyName" slot-scope="{ row, index }">
        <Input v-model="list[index]['propertyName']" placeholder="配置项名称" />
      </template>
      <template slot="propertyKey" slot-scope="{ row, index }">
        <Input v-model="list[index]['propertyKey']" placeholder="配置项key" />
      </template>
      <template slot="required" slot-scope="{ row, index }">
        <Checkbox v-model="list[index]['required']">是</Checkbox>
      </template>

      <template slot="defaultValue" slot-scope="{ row, index }">
        <Input v-model="list[index]['defaultValue']" placeholder="默认值" />
      </template>
    </Table>
  </div>
</template>

<script>
import { Icon, Table, Checkbox } from 'view-design';

export default {
  name: 'WauPropertyTable',
  components: { Icon, Table, Checkbox },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    btnRequired: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      columns: [
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
  },
  watch: {
    list: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(newVal) {
        this.list = newVal
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addNew() {
      this.list.push({
        propertyName: '',
        propertyKey: '',
        required: false,
        defaultValue: ''
      })
    }
  }
}
</script>
