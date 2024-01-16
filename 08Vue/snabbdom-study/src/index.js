import {h} from 'snabbdom/build/h';
import {init} from 'snabbdom/build/init';
import { classModule } from 'snabbdom/build/modules/class'
import { propsModule } from 'snabbdom/build/modules/props'
import { styleModule } from 'snabbdom/build/modules/style'
import { eventListenersModule } from 'snabbdom/build/modules/eventlisteners'
import './defineProperty';
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
const vnode = h('div', {
  class: { container: true }
}, [
  h('p', {}, "aaa"),
  h('p', {}, "bbb"),
  h('p', {}, "ccc"),
  h('p', {}, "ddd")
]);
const vnode2 = h('div', {
  class: { container: true }
}, [
  h('p', {}, "aaa"),
  h('p', {}, "bbb"),
  h('p', {}, "ggg"),
  h('p', {}, "ddd")
])
console.log(vnode);
patch(document.getElementById('app'), vnode);

document.getElementById('btn').addEventListener('click', function() {
  patch(vnode, vnode2);
})
