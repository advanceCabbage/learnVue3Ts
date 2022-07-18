<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <ColumnList :list="list"></ColumnList> -->
    <use-from></use-from>
    <home></home>
    <create-post></create-post>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { CloumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import UseFrom from "./views/useFrom.vue";
import Home from "./views/home.vue";
import CreatePost from "./views/createPost.vue";

const testData: CloumnProps[] = [
  {
    id: 1,
    title: "test1专栏",
    description: "这是test1的专栏",
    avatar: "https://cdn2.thecatapi.com/images/g8.jpg",
  },
  {
    id: 2,
    title: "test2专栏",
    description: "这是test2的专栏",
    avatar: "https://cdn2.thecatapi.com/images/g8.jpg",
  },
  {
    id: 3,
    title: "test1专栏",
    description: "这是test1的专栏",
    avatar: "https://cdn2.thecatapi.com/images/g8.jpg",
  },
  {
    id: 4,
    title: "test2专栏",
    description: "这是test2的专栏",
    // avatar: "https://cdn2.thecatapi.com/images/g8.jpg",
  },
];

const currentUser: UserProps = {
  isLogin: true,
  name: "viking",
};

export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
    UseFrom,
    Home,
    CreatePost,
  },
  setup() {
    return {
      list: testData,
      currentUser,
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
