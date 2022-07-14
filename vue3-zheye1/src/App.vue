<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <ColumnList :list="list"></ColumnList> -->
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div id="emailHelp" class="form-text" v-if="emailRef.error">
          {{ emailRef.message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { CloumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";

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

const emailReg =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobalHeader,
  },
  setup() {
    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    });
    const validateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "can not be empty";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "should be vaild emial";
      }
    };
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
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
