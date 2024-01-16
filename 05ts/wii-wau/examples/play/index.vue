<template>
  <div style="margin: 20px">
    <p>{{ input }}</p>
    <WauButton />
    <WauPageHeader />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello WAU UI!'
      };
    }
  };
</script>
