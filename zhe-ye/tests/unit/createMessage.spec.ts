import createMessage from "../../src/components/cretaMessage";

jest.useFakeTimers();
it(`1.自动挂在组件成功，两秒之后元素被清除`, () => {
  createMessage("上传图片只能是 JPG/PNG 格式!", "error");
  expect(document.getElementById("message")).toBeTruthy();
  jest.runAllTimers(); // 运行所有的setTimeout

  expect(document.getElementById("message")).toBeFalsy();
});
