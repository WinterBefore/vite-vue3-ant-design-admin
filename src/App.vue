<template>
    <a-config-provider :locale="zhCN">
        <router-view />
    </a-config-provider>
</template>
<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";//ant-design-vue自带，只需要引入
</script>
<style scoped></style>
