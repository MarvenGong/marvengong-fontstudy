/**
 * 文件名：example.ts
 * 作者: marvengong
 * 创建日期: 2021-08-31
 * 版本号: 1.0.0
 * 版权所有 (c) Tencent Cloud. 保留所有权利.
 *
 * 文件描述: 这是一个示例文件注释的 TypeScript 文件。
 */
interface Obj {
  id: number;
  name: string;
}

const findObjectById = (arr: Obj[], id: number): Obj | undefined => {
  return arr.find((obj) => obj.id === id);
};

export default {findObjectById}