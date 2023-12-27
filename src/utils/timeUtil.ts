export default {
  // 将时间转成时间戳
  getTimeStamp(dataString: string | number | Date) {
    const dateObj = new Date(dataString ? dataString : new Date());
    // 获取时间戳
    return dateObj.getTime();
  },
  // 将时间戳转成时间
  getTimeByTimeStamp(timeStamp: string | number | Date) {
    timeStamp = Number(timeStamp ? timeStamp : null);
    let date = new Date(timeStamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + "-";
    let M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    let h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    let m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    let s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  /**
   *
   * @param {*} time1 时间1
   * @param {*} time2 时间2
   * @returns  返回时间1是否大于时间2
   */
  compareTime(time1: string, time2: string): boolean {
    const date1 = new Date(time1);
    const date2 = new Date(time2);
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();
    return timestamp1 > timestamp2;
  },
  // 获取现在的时间xxxx年-月-日 x时:x分:x秒
  getNowTime() {
    let date = new Date();
    return (
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日" +
      date.getHours() +
      "时" +
      this.addZero(date.getMinutes()) +
      "分" +
      this.addZero(date.getSeconds()) +
      "秒"
    );
  },
  addZero(s: any) {
    return s < 10 ? "0" + s : s;
  },

  // 在原有的基础上添加一个月
};
