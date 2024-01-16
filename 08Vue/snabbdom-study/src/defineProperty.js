const obj = {};
const defineProperty = function(target, key, value) {
  Object.defineProperty(target, key, {
    set(_value) {
      console.log(`设置obj的hello属性，值为${_value}`);
      return value = _value;
    },
    get() {
      return this.value;
    }
  })
}

obj.hello = 'wwwww';
alert(obj.hello)

const obj2 = {
  name: 'obj2'
};
const obj2Proxy = new Proxy(obj2, {
  set(target, key, value) {
    console.log(`proxy设置obj2的${key}属性，值为${value}`);
  }
})
obj2Proxy.name = 'zhangsan';
