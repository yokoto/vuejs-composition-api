<template>
  <suspense>
    <template #default>
      <post-viewer />
    </template>

    <template #fallback>
      <spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostViewer from './PostViewer.vue'
import Spinner from './Spinner.vue'

export default defineComponent({
  components: {
    PostViewer,
    Spinner
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
