import { beforeUploadCheck } from "../../hepler";

it(`测试beforeUploadCheck 函数`, () => {
  const file = new File([], "test");
  // {
  //   size: 1000,
  //   type: "",
  // };
  const condition = {
    format: ["size"],
    size: 1000,
  };

  expect(beforeUploadCheck(file, condition)).toEqual({
    passed: false,
    error: "format",
  });
});
