import Dep from './Dep';
const dep = new Dep();
dep.sub('click', () => {
  console.log('click first');
});
dep.pub('click');