import dayjs from "dayjs";

interface ITimeTransfrom {
  /**需要转换的数据 */
  params: any;
  /**需要转换的目标类型，默认string */
  type?: "string" | "object";
  /**需要转换的键值 [['twotime']] */
  fromKey: Array<string[] | string>;
  /**需要转成的键值 [['startDate', 'endDate']] */
  toKey: Array<string[] | string>;
  /**需要format的格式 默认YYYY-MM-DD，type=object不需要此属性*/
  format?: string[] | string;
}
function timeTransForm(timeParams: ITimeTransfrom) {
  const { params, type, fromKey, toKey, format } = timeParams;
  let currentParams = JSON.parse(JSON.stringify(params));
  if (type === "object") {
    // 从两个换成一个
    for (let i = 0; i < fromKey.length; i++) {
      let fromKeyItem = fromKey[i];
      let toKeyItem = toKey[i];
      if (typeof fromKeyItem === "object" && typeof toKeyItem === "string") {
        let allTime: any[] = [null, null];
        // 日期格式转换
        allTime[0] = dayjs(currentParams[fromKeyItem[0]]);
        allTime[1] = dayjs(currentParams[fromKeyItem[1]]);
        currentParams[toKeyItem] = allTime;
        delete currentParams[fromKeyItem[0]];
        delete currentParams[fromKeyItem[1]];
      }
    }
  } else {
    // 从一个换成两个
    for (let i = 0; i < fromKey.length; i++) {
      let fromKeyItem = fromKey[i];
      let toKeyItem = toKey[i];
      let formatItem = Array.isArray(format)
        ? format[i]
          ? format[i]
          : "YYYY-MM-DD"
        : format
        ? format
        : "YYYY-MM-DD";
      if (typeof fromKeyItem === "string" && typeof toKeyItem === "object") {
        if (currentParams[fromKeyItem]) {
          let allTime = currentParams[fromKeyItem],
            startTime = allTime[0],
            endTime = allTime[1];
          // 日期格式转换
          startTime = dayjs(startTime).format(formatItem);
          endTime = dayjs(endTime).format(formatItem);
          currentParams[toKeyItem[0]] = startTime;
          currentParams[toKeyItem[1]] = endTime;
          delete currentParams[fromKeyItem];
        }
      }
    }
  }
  return currentParams;
}

export default timeTransForm;
