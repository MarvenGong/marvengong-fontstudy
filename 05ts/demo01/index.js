var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
function say(ani) {
    console.log(ani.name);
}
say(new Animal('stribbbng'));
function intro(obj) {
    return obj;
}
var a = intro({
    name: '张三',
    age: 12,
    gender: 'male'
});
console.log(a.name);
function f(a, b) {
    console.log('俩参数');
}
function f(a) {
    console.log('一参数');
}
f(1);
