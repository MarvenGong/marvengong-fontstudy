<template>
  <div class="w-page-header" :class="{ 'no-tab': !hasTab }">
    <Row>
      <Col span="12" class="w-page-header-title">
        <div class="w-page-header-titlebar">
          <slot v-if="back" name="back">
            <Icon type="md-arrow-back" @click="handleBack" />
            <Divider type="vertical" />
          </slot>
          <slot name="title"></slot>
        </div>
      </Col>
      <Col span="12" class="ivu-text-right w-page-header-action">
        <slot name="action"></slot>
      </Col>
    </Row>
    <Row>
      <Col span="12" class="w-page-header-content">
        <slot name="content"></slot>
      </Col>
      <Col span="12" class="ivu-text-right w-page-header-extra">
        <slot name="extra"></slot>
      </Col>
    </Row>
    <Row>
      <Tabs
        v-if="tabList.length > 0"
        :value="tabActiveKey"
        @on-click="handleTab"
      >
        <TabPane
          v-for="(tab, index) in tabList"
          :key="index"
          class="ivu-mb-0"
          :label="tab.label"
          :name="tab.name"
        ></TabPane>
      </Tabs>
    </Row>
  </div>
</template>

<script>
  import { Row, Col, Icon, Divider, Tabs, TabPane } from 'view-design';

  export default {
    name: 'WauPageHeader',
    components: { Row, Col, Icon, Divider, Tabs, TabPane },
    props: {
      back: {
        type: Boolean,
        default: false
      },
      tabList: {
        type: Array,
        default() {
          return [];
        }
      },
      tabActiveKey: {
        type: String,
        default: ''
      }
    },
    data() {
      return {};
    },
    computed: {
      hasTab() {
        return this.tabList.length > 0;
      }
    },
    methods: {
      handleBack() {
        this.$emit('on-back');
      },
      handleTab(tabName) {
        this.$emit('on-tab-click', tabName);
      }
    }
  };
</script>
