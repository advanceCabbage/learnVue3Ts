<template>
  <validate-from @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailValue"
        placeholder="请输入邮箱地址"
        type="text"
      ></validate-input>
      <span class="test-email"> {{ emailValue }}</span>
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
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateFrom from "../components/ValidateFrom.vue";

export default defineComponent({
  setup() {
    const emailValue = ref("");
    const passwordValue = ref("");
    const validateValue = ref(false);
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

    const onFormSubmit = (result: boolean) => {
      validateValue.value = result;
    };
    return {
      emailRules,
      passwordRules,
      emailValue,
      passwordValue,
      onFormSubmit,
      validateValue,
    };
  },
  components: {
    ValidateInput,
    ValidateFrom,
  },
});
</script>
