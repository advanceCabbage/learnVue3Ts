<template>
  <h1>{{ result?.data }}</h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";

type resultType = {
  data: number;
};
export default defineComponent({
  async setup() {
    const result: resultType = await new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          data: 42,
        });
      }, 2000);
    });
    return {
      result,
    };
  },
});
</script>
