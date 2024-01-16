<template>
  <div :style="imgStyleStr" class="r-img">
    <!-- 随机颜色块 -->
    <img
      v-if="isLoading && loadingType == 'image'"
      :src="loadingSrc"
      :style="imgStyleStr"
    />
    <div
      v-if="isLoading && loadingType == 'colorBlock'"
      :style="loadingBg"
    ></div>
    <!-- 错误图片 -->
    <img
      v-if="!isLoading && isError && errType == 'image'"
      :src="errSrc"
      :style="imgStyleStr"
    />
    <div
      v-if="!isLoading && isError && errType == 'colorBlock'"
      :style="errorBg"
      class="r-img-warrper"
    >
      <img
        src="http://tcb.qinmudi.cn/image/100x100"
        alt="img"
        class="error-img"
      />
    </div>
    <img
      v-if="!isError && imgSrc"
      :src="imgSrc"
      :style="imgStyleStr"
      @click="imgClick"
    />
    <slot></slot>
  </div>
</template>

<script>
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };
  export default {
    name: 'WImg',
    props: {
      src: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '6rem'
      },
      height: {
        type: String,
        default: '6rem'
      },
      imgMode: {
        type: String,
        default: 'aspectFill'
      },
      loadingPool: {
        type: Array,
        default() {
          return [
            '#a2ccd4',
            '#e8e8e8',
            '#dfe9f5',
            '#f1e5da',
            '#f8e4e4',
            '#f0eed3',
            '#c5dfd9',
            '#dfd2ce',
            '#d8d4e3',
            '#dde6d5'
          ];
        }
      },
      loadingType: {
        type: String,
        default: 'colorBlock' // 错误类型，colorBlock-色块 image-图片
      },
      // 错误链接或者色块颜色
      errSrc: {
        type: String,
        default: '#f0f0f0'
      },
      // 错误展示类型
      errType: {
        type: String,
        default: 'colorBlock'
      },
      styleStr: {
        type: String,
        default: ''
      },
      // 加载出错的时候不单独处理
      errNoShow: {
        type: Boolean,
        default: false
      },
      // 是否需要占位
      needPreLoad: {
        type: Boolean,
        default: false
      },
      defaultImageWidth: {
        type: Number,
        default: 670
      },
      gradientHeight: {
        type: String,
        default: '50%'
      },
      gradientColor: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        imgSrc: '',
        imgStyleStr: '',
        isLoading: true,
        loadingSrc: '',
        isError: false,
        imageWidth: 0,
        imageHeight: 0
      };
    },
    computed: {
      loadGradient() {
        return !this.isLoading && this.gradientColor;
      },
      backgroundStr() {
        return `background: linear-gradient(to top, ${this.gradientColor}, transparent);height: ${this.gradientHeight}`;
      },
      loadingBg() {
        return `background-color:${this.loadingSrc};${this.imgStyleStr}`;
      },
      errorBg() {
        return `background-color:${this.errSrc};${this.imgStyleStr}`;
      }
    },
    watch: {
      src(newSrc) {
        // console.log(newSrc)
        this.isLoading = true;
        this.isError = false;
        this.loadingSrc = this.getImage(this.loadingPool);
        loadImage(newSrc)
          .then((res) => {
            this.imgSrc = this.src;
            this.isLoading = false;
          })
          .catch(() => {
            this.imgSrc = this.errSrc;
            this.isError = true;
            this.isLoading = true;
          });
      }
    },
    mounted() {
      const { width, height } = this.needPreLoad
        ? this.imageTrans(this.width, this.height)
        : this;
      this.imageWidth = width;
      this.imageHeight = height;
      this.imgStyleStr = `width:${width};height:${height};${this.styleStr}`;
      this.loadingSrc = this.getImage(this.loadingPool);
      if (this.src) {
        loadImage(this.src)
          .then((res) => {
            this.imgSrc = this.src;
            this.isLoading = false;
          })
          .catch(() => {
            this.imgSrc = this.errSrc;
            this.isError = true;
            this.isLoading = false;
          });
      }
    },
    methods: {
      getImage(value) {
        if (typeof value !== 'string') {
          return value[this.randomNumber()];
        } else {
          return value;
        }
      },
      randomNumber() {
        const number = Math.ceil(Math.random() * (this.loadingPool.length - 1));
        return number;
      },
      imageTrans(width, height) {
        if (width && height) {
          width = (width + '').replace('px', '').replace('px', '');
          height = (height + '').replace('px', '').replace('px', '');
          const defaultWidth = this.defaultImageWidth;
          const style = {
            width: `${defaultWidth / 20}rem`,
            height: `${height / (width / defaultWidth) / 20}rem`
          };
          return style;
        } else {
          return {
            width: `${this.defaultImageWidth / 20}rem`,
            height: `${380 / 20}rem`
          };
        }
      },
      imgClick() {
        this.$emit('click');
      }
    }
  };
</script>

