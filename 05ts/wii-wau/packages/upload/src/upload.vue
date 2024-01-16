<template>
  <div class="upload">
    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
  </div>
</template>

<script>
import { Upload } from 'view-design';

export default {
  name: 'WauUpload',
  components: { Upload }
};
</script>
