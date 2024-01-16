System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, log, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, bg;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      log = _cc.log;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f06a8HSNphPupdmS/l+e6fL", "bg", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'log', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("bg", bg = (_dec = ccclass('bg'), _dec2 = property({
        tooltip: "向左移动速度",
        range: [0.01, 10]
      }), _dec(_class = (_class2 = class bg extends Component {
        constructor() {
          super(...arguments);
          this.n1 = void 0;
          this.n2 = void 0;
          this.height = void 0;

          _initializerDefineProperty(this, "speed", _descriptor, this);
        }

        onLoad() {
          var num = this.node.children.length;

          if (num != 1) {
            log("子节点循环移动只允许只有一个子节点");
            return;
          }

          var n1 = this.node.children[0];
          var n2 = instantiate(n1);
          n2.parent = this.node;
          n2.setPosition(_extends({}, n2.position, {
            y: n1.height
          }));
          this.n1 = n1;
          this.n2 = n2;
          this.height = n1.height;
        }

        start() {}

        update(deltaTime) {
          if (!this.n1 || !this.n2) {
            return;
          }

          console.log('背景滑动...', this.speed);
          var {
            y: y1
          } = this.n1.position;
          var {
            y: y2
          } = this.n2.position;
          this.n1.setPosition(_extends({}, this.n1.position, {
            y: this.n1.position.y - 1
          }));
          this.n2.setPosition(_extends({}, this.n2.position, {
            y: this.n2.position.y - 1
          }));

          if (y1 <= -this.height) {
            this.n1.setPosition(_extends({}, this.n1.position, {
              y: this.height
            }));
          }

          if (y2 <= -this.height) {
            this.n2.setPosition(_extends({}, this.n1.position, {
              y: this.height
            }));
          } // if(y1 <= -this.height){
          //     this.n1.y = this.height
          // }
          // if(this.n2.y<=-this.height){
          //     this.n2.y = this.height
          // }

        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6b1bddbabb38d48382ba4cc3425bc05de42398cc.js.map