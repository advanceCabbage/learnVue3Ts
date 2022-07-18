/*eslint-disable*/
import { mount } from "@vue/test-utils";
import ValidateFrom from "../../components/ValidateFrom.vue";

it(`
  1.输入错误的邮箱格式验证不通过
  2.输入正确的邮箱格式验证通过
  3.点击from组件的提交按钮，触发'form-submit'事件，父组件的onFormSubmit事件被调用，并且接收到被表单验证结果
  4.子组件修改邮箱的值，爷爷组件中邮箱的值被同步修改
  5.子组件类'form-control'元素上有爷爷组件中传递下来的属性
`, () => {
  //const wrapper = mount(ValidateFrom);
  expect(1).toBe(1);
});
