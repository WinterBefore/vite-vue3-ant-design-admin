<template>
  <div class="image-container">
    <a-modal
      v-model:open="isShowAddModal"
      cancelText="取消"
      okText="确定"
      title="新增用户"
      @ok="isShowAddModal = false"
    >
    </a-modal>
    <a-card size="small" title="用户管理">
      <template #extra>
        <a @click="add" href="#">添加</a>
      </template>
      <a-divider orientation="left">
        <div class="search-wrap">
          <a-input
            class="search-item-wrap"
            placeholder="查询的用户id"
            v-model="data.searchForm.ID"
            :size="size"
            style="width: 150px"
          />
          <a-input
            class="search-item-wrap"
            placeholder="用户昵称"
            v-model="data.searchForm.nickName"
            :size="size"
            style="width: 150px"
          />
          <a-input
            class="search-item-wrap"
            placeholder="手机号或邮箱"
            v-model="data.searchForm.phoneOrEmail"
            :size="size"
            style="width: 150px"
          />
          <a-select
            class="search-item-wrap"
            :size="size"
            allowClear
            placeholder="选择用户角色"
            v-model:value="data.searchForm.userRole"
            style="width: 150px"
          >
            <a-select-option
              :key="index"
              v-for="(item, index) of data.searchFormOptions"
              :value="item.value"
              >{{ item.lable }}</a-select-option
            >
          </a-select>
          <a-select
            class="search-item-wrap"
            :size="size"
            allowClear
            placeholder="选择用户状态"
            v-model:value="data.searchForm.userStatus"
            style="width: 150px"
          >
            <a-select-option :value="1"> 启用 </a-select-option>
            <a-select-option :value="0"> 禁用 </a-select-option>
          </a-select>
          <a-range-picker
            class="search-item-wrap"
            :size="size"
            v-model:value="data.searchForm.temporalInterval"
          />
          <a-button
            class="search-item-wrap"
            :icon="h(SearchOutlined)"
            type="primary"
            :size="size"
            >搜索</a-button
          >
          <a-button type="primary" :size="size" :icon="h(ClearOutlined)" danger
            >清空</a-button
          >
        </div>
      </a-divider>
      <a-table
        :scroll="{ y: 420 }"
        class="table"
        @change="tableChange"
        size="small"
        align="center"
        :dataSource="data.dataSource"
        :columns="data.columns"
        :pagination="data.pagination"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'operation'">
            <a-divider type="vertical" />
            <a @click="delItem(record, index)">删除</a>
            <a-divider type="vertical" />
            <a>编辑</a>
          </template>
          <template v-if="column.key === 'role'">
            <template v-if="record.role == '超级管理'">
              <a-tag color="orange">{{ record.role }}</a-tag>
            </template>
            <template v-else-if="record.role == '文章管理'">
              <a-tag color="purple">{{ record.role }}</a-tag>
            </template>
          </template>
          <template v-if="column.key === 'avatar'">
            <a-image-preview-group>
              <a-image :width="40" :src="record.avatar" />
            </a-image-preview-group>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import {
  SearchOutlined,
  ClearOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { ref, reactive, h, VNode, onMounted } from "vue";
import { Modal } from "ant-design-vue";
import toastUtil from "../utils/toastUtil";
import { queryAll, login } from "@/http/userRequest";
import { clientStore } from "@/store";
const clientUseStore = clientStore();
let isShowAddModal = ref(false);
let delBtnLoading = ref(false);
let size = ref("small");
const data = reactive({
  dataSource: [
    {
      key: "1",
      ID: "2022564546",
      nickName: "又是一年冬",
      age: 23,
      address: "西湖区湖底公园1号",
      role: "超级管理",
      email: "jkgjjk@163.com",
      phone: "13754485662",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 1,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
    {
      key: "2",
      ID: "1567897411",
      nickName: "会飞的企鹅",
      age: 26,
      address: "西湖区湖底公园1号",
      role: "文章管理",
      email: "ffasjk@163.com",
      phone: "18854589635",
      avatar:
        "https://pic1.zhimg.com/v2-42f7c35be94a18f25f0514d84cf941c9_r.jpg?source=1940ef5c",
      createTime: "2022-10-27 14:20:25",
      status: 0,
    },
  ],
  columns: [
    {
      title: "ID",
      dataIndex: "ID",
      key: "nickName",
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "nickName",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "角色组",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
      customRender: ({ text, record }) => text.substring(0, 10),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      customRender({ text, record }): VNode {
        return h(
          "a-button",
          { on: { click: () => updateStatus() } },
          text == 1 ? "启用" : "禁用"
        );
      },
    },

    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
    },
  ],
  // 分页配置
  pagination: {
    total: 0,
    pageSize: 5, //每页中显示10条数据
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50", "100"], //每页中显示的数据
    showTotal: (total: any) => `共有 ${total} 条数据`, //分页中显示总的数据
    position: ["bottomLeft"],
  },
  // 搜索表单
  searchForm: {
    ID: "",
    userRole: undefined,
    userStatus: undefined,
    nickName: "",
    phoneOrEmail: "",
    temporalInterval: [],
  },
  // 搜索用户身份下拉选项
  searchFormOptions: [
    {
      value: 4399,
      lable: "超级管理",
    },
    {
      value: 4398,
      lable: "文章管理",
    },
  ],
});

function updateStatus() {}
function add() {
  //   isShowAddModal.value = true;
  login({ action: "pwd", account: "4444", password: "3306" });
}
function tableChange(
  pagination: any,
  filters: any,
  sorter: any,
  { currentDataSource }: any
) {
  console.log(pagination);
  data.pagination.pageSize = pagination.pageSize;
  console.log(currentDataSource);
}
function delItem(item: any, index: number) {
  showDeleteConfirm(
    undefined,
    `确定删除选定id为${item.ID}的数据吗，此操作不可恢复！`,
    () => {
      data.dataSource.splice(index, 1);
    }
  );
}

const showDeleteConfirm = (
  title: string = "温馨提示",
  content: string = "确定进行操作吗?",
  callback: () => void
) => {
  Modal.confirm({
    title,
    icon: h(ExclamationCircleOutlined),
    content,
    okText: "确定",
    okType: "primary",
    cancelText: "取消",
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          callback();
          toastUtil.successMessage("删除成功");
          resolve("成功");
        }, 2000);
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
onMounted(() => {});
</script>
<style scoped lang="less">
.search-wrap {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.search-item-wrap {
  margin-right: 10px;
}
</style>
