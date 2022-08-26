//时间格式化方法
export const dateOne = (e) => {
  let d = new Date(e);
  let Y = d.getFullYear(); //年
  let M = d.getMonth() + 1; //月
  let D = d.getDate(); //日
  Y < 10 ? (Y = "0" + Y) : Y;
  M < 10 ? (M = "0" + M) : M;
  D < 10 ? (D = "0" + D) : D;
  return `${Y}.${M}.${D}`;
};
