export const ItemTypes = "DraggableBodyRow";

// 操作类型
export const optionsTyps = {
  didDrop: "didDrop", // 拖拽出区域
  hover: "hover",
  drop: "drop", // 放置
};

// 数据类型
// 深拷贝方法
export function clone(data) {
  //2.判断值类型（即不是object类型）
  if (typeof data != "object") {
    return data;
  }
  //3.判断数组
  else if (data.constructor === Array) {
    return data.map((i) => clone(i));
  }
  //4.判断json类型
  else if (data.constructor === Object) {
    let tem = {};
    for (let key in data) {
      tem[key] = clone(data[key]);
    }
    return tem;
  }
  //5.判断系统对象和自定义对象
  else {
    return new data.constructor(data);
  }
}
// 判断是否为null 或者 undefined 或者 空字符
export function isNull( str ){
  if ( typeof str === "undefined" || str === null|| str === "" ) return true;

      var regu = "^[ ]+$";
   
      var re = new RegExp(regu);
   
      return re.test(str);
   
}  
// 表格列数字千分位
export function thousandth(num) {
  if (!(/^[-\d]\d*$/.test(num) || /^[-\d]\d*\.\d*$/.test(num))) {
    return num;
  }
  let newNum= absString(num);

  // let newNum = (num < 0 ? -num : num)+'' ;
  const reg = new RegExp("\\B(?<!(\\.\\d+))(?=(\\d{3})+\\b)", "g"); // return (num < 0 ? "-" : "") + newNum.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g, ',$1');
  return (num < 0 ? "-" : "") + newNum.replace(reg, ","); // 小数位不进行千分位。
}

/**
 * 负数转正数（保留小数位）
 * @param n 
 * @returns 
 */
function absString(n) {
  let numberString = n.toString();
  if (numberString[0] === '-') {
    return numberString.substring(1);
  }
  else {
    return numberString;
  }
}
export const getParam = (data, dragId, dropId, childSign) => {
  let obj: any = {
    dragRow: undefined, // 拖拽子节点
    dropRow: undefined, // 放置子节点
    dragIndex: undefined, // 拖拽子节点索引
    dropIndex: undefined, // 放置子节点索引
    dragParentIndex: [], // 拖拽子节点的父节点索引数组
    dropParentIndex: undefined, // 放置子节点父节点索引
  };
  // let dragRow, dropRow;
  // let dragIndex, dropIndex;
  // let dragParentIndex, dropParentIndex; // 拖拽子节点的父节点索引

  let idSign = childSign;
  for (let i = 0; i < data.length; i++) {
    // 父节点拖拽
    let parentDom = data[i];

    if (parentDom?.[idSign] === dragId) {
      obj.dragRow = parentDom;
      obj.dragIndex = i;
      obj.dragParentIndex = null;
    }

    if (parentDom?.[idSign] === dropId) {
      obj.dropRow = parentDom;
      obj.dropIndex = i;
      obj.dropParentIndex = null;
    }
    const ele = parentDom?.children || [];
    flagChildVal(ele, dragId, dropId, idSign, obj, i);
  }
  let result: any = [];
  findParent(data, obj.dragRow, result, idSign);
  obj.dragParentIndex = result;
  return obj;
};
/**
 * 冒泡遍历数组
 * @param ele
 * @param dragId
 * @param dropId
 * @param idSign
 * @param obj
 * @param i
 */
function flagChildVal(ele: any[], dragId, dropId, idSign, obj, i) {
  for (var j = 0; j < ele.length; j++) {
    var child = ele[j];
    if (child?.[idSign] === dragId) {
      obj.dragRow = child;
      obj.dragIndex = j;
      // obj.dragParentIndex.push(j);
    }
    if (child?.[idSign] === dropId) {
      obj.dropRow = child;
      obj.dropIndex = j;
      obj.dropParentIndex = i;
    }
    if (child.children instanceof Array && child.children.length > 0) {
      // 如果当前child为数组并且长度大于0，才可进入flag()方法
      flagChildVal(child.children, dragId, dropId, idSign, obj, i);
    }
  }
}
//data：要遍历的数据， target：查找目标， result用于装查找结果的数组
function findParent(data, target, result, idSign) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item?.[idSign] === target?.[idSign]) {
      //将查找到的目标数据加入结果数组中
      //可根据需求unshift(item.id)或unshift(item)
      result.unshift(i);
      return true;
    }
    if (item.children && item.children.length > 0) {
      let ok = findParent(item.children, target, result, idSign);
      if (ok) {
        result.unshift(i);
        return true;
      }
    }
  }
  //走到这说明没找到目标
  return false;
}
export const findFromData = (data, id, childSign) => {
  let row, index, parentIndex;
  let idSign = childSign;
  for (let i = 0; i < data.length; i++) {
    // 父节点拖拽
    let parentDom = data[i];
    if (parentDom?.[idSign] === id) {
      row = parentDom;
      index = i;
      parentIndex = null;
    }

    // 子节点拖拽
    const ele = parentDom?.children || [];
    for (let j = 0; j < ele.length; j++) {
      const child = ele[j];

      if (child?.[idSign] === id) {
        row = child;
        index = j;
        parentIndex = i;
      }
    }
  }

  return {
    row,
    index,
    parentIndex,
  };
};
