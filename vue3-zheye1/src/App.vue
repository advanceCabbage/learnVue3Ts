<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <ColumnList :list="list"></ColumnList> -->
    <validate-from @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailValue"
          placeholder="请输入邮箱地址"
          type="text"
        ></validate-input>
        {{ emailValue }}
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordValue"
        ></validate-input>
        {{ passwordValue }}
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-from>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { CloumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue";
import ValidateFrom from "./components/ValidateFrom.vue";

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
    ValidateInput,
    ValidateFrom,
  },
  setup() {
    const inputRef = ref("");
    const emailValue = ref("");
    const passwordValue = ref("");
    const emailRules: RulesProp = [
      {
        type: "required",
        message: "电子邮箱地址不能为空",
      },
      {
        type: "email",
        message: "请输入正确的电子邮箱格式",
      },
    ];

    const passwordRules: RulesProp = [
      {
        type: "required",
        message: "密码不能为空",
      },
    ];

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

    const onFormSubmit = (result: boolean) => {
      console.log("result", result);
    };
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      passwordRules,
      emailValue,
      passwordValue,
      onFormSubmit,
      inputRef,
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
