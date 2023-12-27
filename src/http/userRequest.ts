import instance from "./request";
export const queryAll = (params: any) => {};
export const login = (params: any) => {
  return instance.get("/api/user/login", { params });
};
export default {};
