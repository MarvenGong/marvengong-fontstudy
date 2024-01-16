/**
* 使用document.createElementNS创建一个带http://www.w3.org/2000/svg命名空间的矩形对象
有效的命名空间URI
HTML - 参阅 http://www.w3.org/1999/xhtml
SVG - 参阅 http://www.w3.org/2000/svg
XBL - 参阅 http://www.mozilla.org/xbl
XUL - 参阅 http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
* tag：所要创建的标签名称
* attrs: 所需要添加的属性，｛key:val,key:val｝
*/
export function makeSVG(tag, attrs) {
  const ns = 'http://www.w3.org/2000/svg';
  const xlinkns = 'http://www.w3.org/1999/xlink';

  let el= document.createElementNS(ns, tag);
  if (tag==='svg'){
      el.setAttribute('xmlns:xlink', xlinkns);
  }
  for (let k in attrs) {
      if (k === 'xlink:href') {
          el.setAttributeNS(xlinkns, k, attrs[k]);
      } else {
          el.setAttribute(k, attrs[k]);
      }
  }
  return el;
}