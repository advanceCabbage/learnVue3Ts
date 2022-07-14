<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <h1>X:{{ x }}-Y:{{ y }}</h1>
  <h1 v-if="loading">loading!....</h1>
  <img v-if="loaded" :src="result?.[0].url" alt="" />
  <button @click="increase">+1</button>
  <Modal :is-open="modalIsOpen" @close-modal="onModalClose">my modal !!!</Modal>
  <Suspense>
    <template #default> <async-show /></template>
    <template #fallback>
      <h1>Loading!</h1>
    </template>
  </Suspense>

  <button @click="openModal">open Modal</button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch, ref } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURlLoader";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";

interface dataProps {
  count: number;
  double: number;
  increase: () => number;
}

interface DogResult {
  status: string;
  message: string;
}

interface catResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "App",
  components: { Modal, AsyncShow },
  setup() {
    const data: dataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => data.count++,
    });
    const refData = toRefs(data);
    const { x, y } = useMousePosition();
    // "https://api.thecatapi.com/v1/images/search?limit=1"
    //  "https://dog.ceo/api/breeds/image/random"
    const { result, loaded, loading, error } = useURLLoader<catResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );

    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };
    return {
      ...refData,
      x,
      y,
      result,
      loaded,
      loading,
      error,
      modalIsOpen,
      openModal,
      onModalClose,
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
