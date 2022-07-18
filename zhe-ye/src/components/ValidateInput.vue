<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @input="updataValue"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from "vue";
import { emitter } from "./ValidateFrom.vue";
const emailReg =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;

interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  name: "validateInput",
  props: {
    rules: {
      type: Array as PropType<RulesProp>,
    },
    modelValue: {
      type: String,
    },
  },
  inheritAttrs: false, // 组件的根元素不继承attribute
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    //! 自定义组件的双向绑定实现
    const updataValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updataValue,
    };
  },
});
</script>
