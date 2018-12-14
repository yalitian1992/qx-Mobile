export default {
  /**
   * 截取字符串
   * filterSubStrName
   * @param {String} name 要截取的字符串
   * @param {Number} num 可选，默认22，欲截取的个数
   * @param {String} style 可选，后面显示的字符默认...
   */
  filterSubStrName(name, num = 22, style = "...") {
    /* eslint-disable */
    // 如果name的值全是英文则在长度上增加3位
    if (/^[a-zA-Z]*$/.test(name)) {
      num += 3;
    }
    return name.length > num
      ? name.substr(0, num) + style
      : name.substr(0, num);
  },

  /**
   * 转化时间格式
   * @param {DateTime} time 时间戳
   * @returns {String}
   */
  transformation(time) {
    if (!(+time > 0)) {
      /* eslint-disable */
      time = new Date(time).getTime();
    }
    let result;
    // 一分
    const minute = 1000 * 60; // 把分，时，天，周，半个月，一个月用毫秒表示
    // 一小时
    const hour = minute * 60;
    // 一天
    const day = hour * 24;
    // 一周
    const week = day * 7;
    // 半月
    // const halfamonth = day * 15;
    // 一月
    const month = day * 30;
    const now = new Date().getTime(); // 获取当前时间毫秒
    const diffValue = now - time; // 时间差

    if (diffValue < 0) {
      return;
    }
    const minC = diffValue / minute; // 计算时间差的分，时，天，周，月
    const hourC = diffValue / hour;
    const dayC = diffValue / day;
    const weekC = diffValue / week;
    const monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
      result = `${parseInt(monthC, 10)}月前发布`;
    } else if (weekC >= 1 && weekC <= 3) {
      result = `${parseInt(weekC, 10)}周前发布`;
    } else if (dayC >= 1 && dayC <= 6) {
      result = `${parseInt(dayC, 10)}天前发布`;
    } else if (hourC >= 1 && hourC <= 23) {
      result = `${parseInt(hourC, 10)}小时前发布`;
    } else if (minC >= 1 && minC <= 59) {
      result = `${parseInt(minC, 10)}分钟前发布`;
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = "刚刚发布";
    } else {
      /* eslint-disable */
      const datetime = new Date();
      datetime.setTime(time);
      const Nyear = datetime.getFullYear();
      const Nmonth =
        datetime.getMonth() + 1 < 10
          ? `0${datetime.getMonth() + 1}`
          : datetime.getMonth() + 1;
      const Ndate =
        datetime.getDate() < 10 ? `0${datetime.getDate()}` : datetime.getDate();
      // const Nhour = datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours();
      // const Nminute = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes();
      // const Nsecond = datetime.getSeconds() < 10 ? `0${datetime.getSeconds()}` : datetime.getSeconds();
      result = `${Nyear}-${Nmonth}-${Ndate}`;
    }
    /* eslint consistent-return: "off" */
    return result;
  },
  /**
   * 转换日期
   * @param {DateTime} value 需要过滤的时间戳
   */
  converDate(value) {
    if (parseInt(value) <= 0) {
      return;
    }
    let result;
    const date = new Date();
    date.setTime(value);
    const Nyear = date.getFullYear();
    const Nmonth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const Ndate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    result = `${Nyear}-${Nmonth}-${Ndate}`;
    return result;
  },
  ImgFilter(value) {
    if (location.host === "d2.zuanliantech.com") {
      const imgTestHost = "http://10.3.201.6:8888";
      return imgTestHost + value;
    } else {
      const CDNS = [
        "http://i0-card-h5.zuanliantech.com",
        "http://i1-card-h5.zuanliantech.com",
        "http://i2-card-h5.zuanliantech.com"
      ];
      const index = parseInt(Math.random() * 3);
      return CDNS[index] + value;
    }
  }
};
