//时间格式化方法
export const dateOne = (e) => {
  let d = new Date(e);
  let Y = d.getFullYear(); //年
  let M = d.getMonth() + 1; //月
  let D = d.getDate(); //日

  var hh = d.getHours(); //时
  var mm = d.getMinutes(); //分
  var ss = d.getSeconds(); //秒

  Y < 10 ? (Y = "0" + Y) : Y;
  M < 10 ? (M = "0" + M) : M;
  D < 10 ? (D = "0" + D) : D;
  hh < 10 ? (hh = "0" + hh) : hh;
  mm < 10 ? (mm = "0" + mm) : mm;
  ss < 10 ? (ss = "0" + ss) : ss;
  return `${Y}.${M}.${D}  ${hh}:${mm}`;
};
