import { onMounted, onUnmounted, reactive, toRefs } from "vue";

function useMousePosition() {
  const data = reactive({
    x: 0,
    y: 0,
  });
  const updateMouse = (e: MouseEvent) => {
    data.x = e.pageX;
    data.y = e.pageY;
  };

  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });

  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });

  const refData = toRefs(data);
  return { ...refData };
}

export default useMousePosition;
