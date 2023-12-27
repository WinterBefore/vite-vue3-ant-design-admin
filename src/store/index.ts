import { defineStore } from "pinia"; // 定义容器


export const clientStore = defineStore("clientStore", {
  state: () => {
    return {
      routerConfig: {
        title: "哈哈哈",
        roues: [],
      },
    };
  },
  getters: {},
  actions: {
    // 更新全局路信息
    updateRouterConfig(routerConfif: any) {
      this.routerConfig.title = "牛逼啊兄弟";
    },
  },
});
