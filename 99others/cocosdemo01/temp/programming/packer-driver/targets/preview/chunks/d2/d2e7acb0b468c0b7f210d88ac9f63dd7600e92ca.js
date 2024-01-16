System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, btnStart;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4fd28K6ndBAKI171fJW8Zpv", "btnStart", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventTouch', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("btnStart", btnStart = (_dec = ccclass('btnStart'), _dec(_class = class btnStart extends Component {
        start() {
          console.log('开始按钮被挂载');
        }

        update(deltaTime) {}

        onTouchStart(event) {
          var target = event.target;

          if ((target == null ? void 0 : target.name) == 'LeftTouch') {
            alert(1);
          } else {
            alert(2);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d2e7acb0b468c0b7f210d88ac9f63dd7600e92ca.js.map