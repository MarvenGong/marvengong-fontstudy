<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <div class="main-cnt">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',

    computed: {
      isComponent() {
        if (!this.$route) {
          return false;
        }
        return /^component-/.test(this.$route.name || '');
      }
    }
  };
</script>
