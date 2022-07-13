<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  {{ count }}
  {{ double }}
  <button @click="increase">+1</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { reactive, toRefs, computed } from "vue";

interface dataProps {
  count: number;
  double: number;
  increase: () => number;
}
export default defineComponent({
  name: "App",
  setup() {
    const data: dataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => data.count++,
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
