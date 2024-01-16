System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCBoolean, Component, Input, input, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, btnStart;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCBoolean = _cc.CCBoolean;
      Component = _cc.Component;
      Input = _cc.Input;
      input = _cc.input;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4fd28K6ndBAKI171fJW8Zpv", "btnStart", undefined);

      __checkObsolete__(['_decorator', 'CCBoolean', 'Component', 'EventTouch', 'Input', 'input', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("btnStart", btnStart = (_dec = ccclass('btnStart'), _dec2 = property({
        type: CCBoolean
      }), _dec(_class = (_class2 = class btnStart extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "isLoaded", _descriptor, this);
        }

        start() {
          console.log('开始按钮被挂载');
          this.isLoaded = true;
        }

        update(deltaTime) {}

        onLoad() {
          var _Input$EventType;

          input.on((_Input$EventType = Input.EventType) == null ? void 0 : _Input$EventType.MOUSE_DOWN, () => {
            console.log('start');
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoaded", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=12199dc3aeb369659c07fb443606fc6db2ee204e.js.map