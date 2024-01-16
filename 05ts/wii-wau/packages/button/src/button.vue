<template>
  <div :class="mainClass">
    <Button type="default">TestButton</Button>
    <img :src="testImg" />
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Button } from 'view-design';

  import testImg from '@wii-fe/wau/public/images/empty.svg';
  import { wauPrefix } from '@wii-fe/wau/src/utils/constants';

  Vue.component('Button', Button);

  export default {
    name: 'WauButton',
    computed: {
      mainClass() {
        return `${wauPrefix}-button`;
      },
      testImg() {
        return testImg;
      }
    }
  };
</script>
