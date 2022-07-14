<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>this is modal</slot>
      </h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OpenModal",
  props: {
    isOpen: Boolean,
  },
  //todo 不写注册emits事件，功能任然能够正常使用，但是控制台会有警告信息
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };
    return {
      buttonClick,
    };
  },
});
</script>
<style>
#center {
  width: 200px;
  height: 200px;
  border: 1px solid red;
}
</style>
