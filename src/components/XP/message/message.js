import { createVNode, render } from "vue";
import XPMessage from "./XPMessage.vue";
const divVNone = createVNode("div", { class: "xp-message-container" });
render(divVNone, document.body);

const div = divVNone.el;

const XP_Message = ({ message, type }) => {
  //1，动态创建虚拟DOM createVNode（h）函数
  const comVNode = createVNode(XPMessage, { message, type });
  //2.宣染到body页面中-render函数
  render(comVNode, div);
  //3.提示在6s后自动卸载
  setTimeout(() => {
    render(null, div);
  }, 6000);
};
export default XP_Message;
