//引入axios
import service from "@/utils/axios";

// 获取用户ip
export const signIpApi = () => service.get("/signip");

// 新建wall留言
export const insertWallApi = (data) => service.post("/insertwall", data);
