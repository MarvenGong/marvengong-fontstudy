#!/usr/bin/env zx
const name = 'hello';
await $`mkdir ${name}`;
console.log('创建成功');
await $`rm -rf ${name}`;