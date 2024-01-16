<template>
  <div :class="className" class="w-image">
    <template v-if="isMoreImage">
      <div v-for="(image, index) in value" :key="index" class="w-image-border">
        <r-img
          v-if="value"
          :src="image"
          :width="width + 'px'"
          :height="height + 'px'"
          class="w-image-item"
          @click="showPreview"
        ></r-img>
      </div>
    </template>
    <template v-else>
      <r-img
        v-if="value"
        :src="value"
        :width="width + 'px'"
        :height="height + 'px'"
        class="w-image-item"
        @click="showPreview"
      ></r-img>
    </template>
  </div>
</template>

<script>
  import { isArray } from 'lodash';
  import rImg from './img';
  import { formatImageData } from '@wii-fe/wau/src/utils/image';

  export default {
    name: 'WauImage',
    components: { rImg },
    props: {
      className: {
        type: String,
        default: ''
      },
      value: {
        type: [String, Array],
        default: ''
      },
      width: {
        type: Number,
        default: 100
      },
      height: {
        type: Number,
        default: 100
      }
    },
    computed: {
      isMoreImage() {
        return isArray(this.value);
      }
    },
    watch: {
      value(val) {
        // eslint-disable-next-line
        this.value = val;
      },
      hide() {
        this._setClassNames();
      }
    },
    mounted() {
      this._setClassNames();
    },
    methods: {
      showPreview() {
        // console.log('showPreview')
        if (this.isMoreImage) {
          formatImageData(this.value, (imgs) => {
            // console.log(imgs)
            this.$bus.emit('photoswipe.shown', imgs);
          });
        } else {
          formatImageData([this.value], (imgs) => {
            // console.log(imgs)
            this.$bus.emit('photoswipe.shown', imgs);
          });
        }
      },
      _setClassNames() {
        const reg = new RegExp('(\\s|^)hidden(\\s|$)');
        const hidden = this.className.match(reg);
        if (this.hide) {
          // eslint-disable-next-line
          this.className += hidden ? '' : ' hidden';
        } else {
          // eslint-disable-next-line
          this.className = this.className.replace(reg, '');
        }
      }
    }
  };
</script>
