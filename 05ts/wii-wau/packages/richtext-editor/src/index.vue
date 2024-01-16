<template>
  <div class="richtext-editor">
    <richtext-editor />
	</div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor as RichtextEditor } from 'vue-quill-editor'

export default {
  name: 'WauRichtextEditor',
  components: { RichtextEditor }
}
</script>
