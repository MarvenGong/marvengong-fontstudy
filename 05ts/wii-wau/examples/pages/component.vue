<template>
  <div class="page-container page-component">
    <div class="page-component__nav">
      <side-nav :data="navsData" :base="``"></side-nav>
    </div>
    <div class="page-component__content">
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script>
  import navsData from '../nav.config.json';

  export default {
    beforeRouteUpdate(to, from, next) {
      next();
      setTimeout(() => {
        const toPath = to.path;
        const fromPath = from.path;
        if (toPath === fromPath && to.hash) {
          this.goAnchor();
        }
        if (toPath !== fromPath) {
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          this.renderAnchorHref();
        }
      }, 100);
    },
    data() {
      return {
        navsData,
        scrollTop: 0,
        showHeader: true,
        componentScrollBar: null,
        componentScrollBoxElement: null
      };
    },
    mounted() {
      this.renderAnchorHref();
      this.goAnchor();
      document.body.classList.add('is-component');
    },
    destroyed() {
      document.body.classList.remove('is-component');
    },
    methods: {
      renderAnchorHref() {
        if (/changelog/g.test(location.href)) return;
        const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a');
        const basePath = location.href.split('#').splice(0, 2).join('#');

        [].slice.call(anchors).forEach((a) => {
          const href = a.getAttribute('href');
          a.href = basePath + href;
        });
      },
      goAnchor() {
        if (location.href.match(/#/g).length > 1) {
          const anchor = location.href.match(/#[^#]+$/g);
          if (!anchor) return;
          const elm = document.querySelector(anchor[0]);
          if (!elm) return;

          setTimeout((_) => {
            document.documentElement.scrollTop = document.body.scrollTop =
              elm.offsetTop;
          }, 50);
        }
      }
    }
  };
</script>

<style lang="less">
  .page-component {
    box-sizing: border-box;
    height: 100%;

    &.page-container {
      padding: 0;
      overflow-y: auto;
    }

    .page-component__nav {
      width: 240px;
      position: fixed;
      top: 0;
      bottom: 0;
      margin-top: 80px;
      transition: padding-top 0.3s;
      overflow-y: auto;

      &.is-extended {
        padding-top: 0;
      }
    }

    .side-nav {
      height: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
      padding-right: 0;

      & > ul {
        padding-bottom: 50px;
      }
    }

    .page-component__content {
      padding-left: 270px;
      padding-bottom: 100px;
      box-sizing: border-box;
    }

    .content {
      padding-top: 50px;

      & > {
        h3 {
          margin: 55px 0 20px;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          background-color: #fff;
          font-size: 14px;
          margin-bottom: 45px;
          line-height: 1.5em;

          strong {
            font-weight: normal;
          }

          td,
          th {
            border-bottom: 1px solid #dcdfe6;
            padding: 15px;
            max-width: 250px;
          }

          th {
            text-align: left;
            white-space: nowrap;
            color: #909399;
            font-weight: normal;
          }

          td {
            color: #606266;
          }

          th:first-child,
          td:first-child {
            padding-left: 10px;
          }
        }

        ul:not(.timeline) {
          margin: 10px 0;
          padding: 0 0 0 20px;
          font-size: 14px;
          color: #5e6d82;
          line-height: 2em;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .page-component {
      .page-component__nav {
        width: 100%;
        position: static;
        margin-top: 0;
      }
      .side-nav {
        padding-top: 0;
        padding-left: 50px;
      }
      .page-component__content {
        padding-left: 10px;
        padding-right: 10px;
      }
      .content {
        padding-top: 0;
      }
      .content > table {
        overflow: auto;
        display: block;
      }
    }
  }
</style>
