<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="card-img-top" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">{{ column.description }}</p>
          <a href="#" class="btm btn-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
export interface CloumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<CloumnProps[]>, // 将构造函数Array断言为类型，使用PropType
      require: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list?.map((column) => {
        if (!column.avatar) {
          column.avatar = "https://cdn2.thecatapi.com/images/g8.jpg";
        }
        return column;
      });
    });
    return {
      columnList,
    };
  },
});
</script>
