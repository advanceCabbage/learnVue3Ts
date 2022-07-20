import CreatePost from "@/views/createPost.vue";
import Uploader from "@/components/Uploader.vue";
import { mount, shallowMount } from "@vue/test-utils";
import axios from "axios";

it(`
2.子组件点击上传按钮，触发triggerUpload事件，触发input框的点击事件，弹出选择文件框
3.子组件选择文件之后触发父组件校验文件格式是否合格事件beforeUpload

`, () => {
  const wrapper = mount(CreatePost);
  const uploaderWrapper = wrapper.getComponent(Uploader);
  const mockFn = jest.fn();
  uploaderWrapper.vm.triggerUpload = mockFn;
  wrapper.find(".file-upload-container").trigger("click");
  expect(uploaderWrapper.vm.triggerUpload).toBeCalled(); //* 点击选择文件之后 绑定的事件被执行了

  // uploaderWrapper.emitted("file-uploaded", );
  // const mockFn3 = jest.fn();
  // wrapper.vm.handleFileUploaded = mockFn3;
  // expect(wrapper.vm.handleFileUploaded).toBeCalled();
});

jest.mock("axios");
it(`1.上传文件之前触发beforeUpload函数检测文件是否合格
    2.上传成功之后触发事件file-uploaded
`, () => {
  const resp = { data: { _id: "1" } };
  const wrapper = mount(CreatePost);
  const uploaderWrapper = wrapper.getComponent(Uploader);

  const mockFn = jest.fn(() => {
    uploaderWrapper.vm.$emit("file-uploaded", resp);
    // uploaderWrapper.props("beforeUpload")();
  });
  uploaderWrapper.vm.handleFileChange = mockFn;
  const fileInput = wrapper.find(".file-input");
  fileInput.trigger("change");

  expect(uploaderWrapper.vm.handleFileChange).toBeCalled(); //* 选择文件之后handleFileChange函数被执行了
  expect(uploaderWrapper.emitted()).toHaveProperty("file-uploaded");
});
