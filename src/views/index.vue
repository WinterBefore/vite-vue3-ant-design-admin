<template>
  <div class="index-container flex">
    <!-- 消息中心 -->
    <a-drawer
      v-model:open="isOpenMessageCenter"
      size="large"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      title="消息中心"
      placement="right"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
    <!-- 设置中心 -->
    <a-drawer
      v-model:open="isOpenSettingCenter"
      class="custom-class"
      root-class-name="root-class-name"
      title="系统设置"
      placement="right"
    >
      设置中心
    </a-drawer>
    <div class="left-nav-container">
      <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
                <MenuUnfoldOutlined v-if="state.collapsed" />
                <MenuFoldOutlined v-else />
            </a-button> -->
      <!-- <div class="logo-sys-name-wrap flex">
                123123
            </div> -->
      <a-menu
        class="menu"
        v-model:openKeys="state.openKeys"
        @click="menuClickItem"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
        :items="state.leftNavData"
      ></a-menu>
    </div>
    <div class="center-content-container flex">
      <div class="center-header-container flex">
        <!-- 折叠按钮 -->
        <PicRightOutlined @click="toggleCollapsed" style="font-size: 18px" />
        <!-- 右边消息栏整体 -->
        <div class="center-header-right-wrap flex">
          <!-- 头像 -->
          <a-avatar
            src="https://c-ssl.dtstatic.com/uploads/blog/202206/16/20220616051519_a80f6.thumb.1000_0.jpg"
          />
          <!-- 昵称 -->
          <div class="user-nick-name padding-line-5">
            {{ state.userInfo.nickName }}
          </div>
          <a-badge count="5" show-zero>
            <BellOutlined
              @click="openMessageCenter"
              class="padding-line-5"
              style="font-size: 18px"
            />
          </a-badge>
          <div style="margin-left: 15px"></div>
          <PoweroffOutlined
            @click="closeApp"
            class="padding-line-5"
            style="font-size: 18px"
          />
          <SearchOutlined class="padding-line-5" style="font-size: 20px" />
          <ReloadOutlined class="padding-line-5" style="font-size: 18px" />
          <SettingOutlined
            @click="openSettingCenter"
            class="padding-line-5"
            style="font-size: 18px"
          />
          <FullscreenOutlined class="padding-line-5" style="font-size: 18px" />
        </div>
      </div>
      <!-- 隔开头部区域 -->
      <div
        class="div"
        style="background-color: #fff; height: 30px; border-top: 1px solid #eee"
      ></div>
      <!-- 导航列表 -->
      <div class="center-nav-list-wrap">
        <!-- <a-segmented v-model:value="currentValue" :options="navData" /> -->
        <a-tabs
          size="small"
          hide-add
          v-model:activeKey="currentActive"
          type="editable-card"
        >
          <a-tab-pane
            v-for="(item, index) in navData"
            :key="index"
            :tab="item"
          ></a-tab-pane>
        </a-tabs>
      </div>
      <div class="center-content-wrap">
        <a-spin tip="处理中.." :spinning="spinning">
          <router-view v-slot="{ Component }">
            <Transition name="switch-view" mode="out-in">
              <component :is="Component" />
            </Transition>
          </router-view>
        </a-spin>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  reactive,
  ref,
  watch,
  h,
  onMounted,
  VNode,
  createVNode,
  nextTick,
  VueElement,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { clientStore } from "@/store";
import {
  PicRightOutlined,
  FullscreenOutlined,
  BellOutlined,
  PoweroffOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
const useClientStore = clientStore();
const navData = reactive([
  "工作台",
  "积分管理",
  "订单管理",
  "文件管理",
  "商品管理",
]);
const currentActive = ref(0);
const isOpenMessageCenter = ref(false);
const isOpenSettingCenter = ref(false);
const route = useRoute();
const router = useRouter();
const spinning = ref(false);

const state = reactive<any>({
  collapsed: false,
  // 初始选中的菜单项
  selectedKeys: ["dashboard"],
  openKeys: ["basic"],
  preOpenKeys: ["sub1"],
  userInfo: {
    nickName: "又是一年冬2",
  },
  // 左侧菜单数据
  leftNavData: [
    {
      key: "dashboard",
      label: "工作台",
      icon: () => h(DesktopOutlined),
    },
    {
      key: "4",

      label: "移动端管理",
      title: "Option 3",
      icon: () => h(DesktopOutlined),
    },
    // 导航列表数据
  ],
});
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
onMounted(() => {
  console.log(state.leftNavData);
  spinning.value = false;
  const indexRoutes = router.options.routes[2].children;
  indexRoutes.map((item) => {
    delete item.component;
    delete item.meta;
    delete item.name; 
    delete item.path;
    // item.icon = () => h(item.icon);
    if (item.children) {
      //处理耳机路由
      for (let i = 0; i < item.children.length; i++) {
        delete item.children[i].path;
        delete item.children[i].component;
        delete item.children[i].meta;
        delete item.children[i].name;
        delete item.children[i].icon;  
      }
    }
  });
});
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
const openMessageCenter = () => {
  isOpenMessageCenter.value = true;
  message.success("开启成功,目前只做提示");
};
const openSettingCenter = () => {
  isOpenSettingCenter.value = true;
};
const menuClickItem = (v: any) => {
  const next = `/index/${v.key}`;
  router.push(next);
};

const closeApp = () => {
  useClientStore.$patch((state) => {
    state.routerConfig.title = "adfaasdd";
  });
};
function getMenuIcon(iconName: string): Function {
  return () => h(iconName);
}
</script>
<style scoped>
.index-container {
  height: 100%;
}

.logo-sys-name-wrap {
  color: #fff;
  background-color: rgb(0, 21, 41);
  align-items: center;
  height: 5%;
}

.ant-menu {
  height: 100%;
}

/* 中间区域 */
.center-content-container {
  flex-direction: column;
  flex: 1;
}

/* 中间头部 */
.center-header-container {
  min-height: 48px;
  background-color: #fff;
  box-shadow: 1px -1px 5px rgb(226, 226, 226);
  padding: 5px 15px;
  align-items: center;
  cursor: pointer;
  /* border-bottom: 1px solid #eee; */
  box-shadow: 0px 4px 6px -2px rgba(165, 50, 50, 0.2);
}

.center-header-right-wrap {
  margin-left: auto;
  align-items: center;
}

.user-nick-name {
  font-size: 12px;
  color: rgb(23, 27, 31);
}

/* 导航列表 */
.center-nav-list-wrap {
  height: 60px;
  padding: 0 10px 0 10px;
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background-color: #fff;
}

:deep(.ant-tabs) {
  height: 60px !important;
}

/* :deep(.ant-segmented-item-selected) {
    background-color: #1677ff !important;
    color: #fff;
} */
:deep(.ant-segmented-thumd) {
  background-color: #1677ff !important;
  color: #fff;
}

/* 中间部分路由显示 */
.center-content-wrap {
  padding: 10px;
  overflow: auto;
  overflow-x: hidden;
}

/* 路由切换动画 */
.switch-view-enter-active,
.switch-view-leave-active {
  transition: all 0.5s;
}

.switch-view-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.switch-view-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ::-webkit-scrollbar {
    width: 1px;
} */
</style>
