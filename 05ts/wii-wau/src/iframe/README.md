# IframePost使用说明

- iframe 通信

## 父子调用使用

- 父容器可以直接调用子容器定义的实例函数

``` js
const child = new IframePost.Model({
  test: (data) => {
    console.log('data from parent',data)
  }
})

const parent = new IframePost({
  container: '',
  url: ''
})

parent.then(child => {
  child.call(test, {id: 1,name: 'qinmudi'})
})
```

## 子父调用使用 emit

- 父容器监听消息，子容器发送消息

``` js
const height = 1000
const child = new IframePost.Model()
child.emit('iframe.resize', height)

const parent = new IframePost({
  container: '',
  url: ''
})
parent.then(child => {
  child.on('iframe.resize', (height) => {
    console.log('child emit data to parent', height)
  })
})
```
