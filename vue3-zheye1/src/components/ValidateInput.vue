<template>
  <div class="validate-input-container pb-3"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
const emailReg =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;

interface RuleProp {
  type: "required" | "email";
  message: string;
}
export default defineComponent({
  name: "validateInput",
  props: {
    rules: {
      type: Array as PropType<RuleProp[]>,
    },
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
  },
});
</script>
