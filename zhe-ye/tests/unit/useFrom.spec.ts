import { mount, shallowMount } from "@vue/test-utils";
import UseFrom from "@/views/useFrom.vue";
import ValidateFrom from "@/components/ValidateFrom.vue";
import ValidateInput from "@/components/ValidateInput.vue";

it(`
  1.输入错误的邮箱格式验证不通过
  2.输入正确的邮箱格式验证通过
  3.点击from组件的提交按钮，触发'form-submit'事件，父组件的onFormSubmit事件被调用，并且接收到被表单验证结果
  4.子组件修改邮箱的值，爷爷组件中邮箱的值被同步修改
  5.子组件类'form-control'元素上有爷爷组件中传递下来的属性
`, async () => {
  const wrapper = mount(UseFrom);
  expect(wrapper.classes()).toContain("validate-form-container");
  const emailInput = wrapper.findAll("input")[0];
  const passwordInput = wrapper.findAll("input")[1];
  await emailInput.setValue("134");
  await passwordInput.setValue("1234");
  expect(wrapper.vm.emailValue).toBe("134");
  const ValidateFromComponent = wrapper.getComponent(ValidateFrom);
  ValidateFromComponent.find(".submit-area").trigger("click");
  expect(ValidateFromComponent.emitted()).toHaveProperty("form-submit");
  expect(ValidateFromComponent.emitted()["form-submit"][0]).toEqual([false]); //* 输入错误邮箱，验证不通过

  await emailInput.setValue("124@163.com");
  expect(wrapper.vm.emailValue).toBe("124@163.com"); //* 子组件修改邮箱的值，爷爷组件中邮箱的值被同步修改
  ValidateFromComponent.find(".submit-area").trigger("click");
  expect(ValidateFromComponent.emitted()["form-submit"][1]).toEqual([true]); //* 输入正确邮箱，验证不通过
  expect(wrapper.vm.validateValue).toBe(true); //* 点击from组件的提交按钮，触发'form-submit'事件，父组件的onFormSubmit事件被调用，并且接收到被表单验证结果

  const ValidateInputComponentWrapper = shallowMount(ValidateInput, {
    attrs: {
      placeholder: "请输入邮箱地址",
    },
  });
  expect(
    ValidateInputComponentWrapper.find("input").attributes("placeholder")
  ).toBe("请输入邮箱地址"); //* 子组件类'form-control'元素上有爷爷组件中传递下来的属性
});

it(`1.input失去焦点，校验函数被调用`, () => {
  const wrapper = mount(ValidateInput);
  wrapper.find("input").trigger("blur");
  expect(wrapper.vm.validateInput.toBeCalled); //* 失去焦点，触发校验事件

  wrapper.find("input").trigger("change");
  expect(wrapper.vm.updataValue.toBeCalled); //* 失去焦点，触发校验事件
});

it(`1.卸载ValidateFrom组件`, () => {
  const wrapper = mount(ValidateFrom);
  wrapper.unmount();
});
