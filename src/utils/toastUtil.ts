import { message } from 'ant-design-vue';
export default {
    successMessage: (content: any = '操作成功', timeOut: number = 3) => {
        message.success(content, timeOut)
    },
    errorMessage: (content: any = '操作失败', timeOut: number = 3) => {
        message.error(content, timeOut)
    }, warningMessage: (content: any = '操作失败', timeOut: number = 3) => {
        message.warning(content, timeOut)
    }
}