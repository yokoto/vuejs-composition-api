<template>
  <suspense>
    <template #default>
      <post-editor />
    </template>

    <template #fallback>
      <spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostEditor from './PostEditor.vue'
import Spinner from './Spinner.vue'

export default defineComponent({
  components: {
    PostEditor,
    Spinner
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
