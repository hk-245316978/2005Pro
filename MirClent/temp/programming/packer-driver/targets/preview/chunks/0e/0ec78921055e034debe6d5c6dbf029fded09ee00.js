System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Sprite, UITransform, resources, SpriteFrame, Button, BlockInputEvents, MoveSprite, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, CreatePanel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfMoveSprite(extras) {
    _reporterNs.report("MoveSprite", "./MoveSprite", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      UITransform = _cc.UITransform;
      resources = _cc.resources;
      SpriteFrame = _cc.SpriteFrame;
      Button = _cc.Button;
      BlockInputEvents = _cc.BlockInputEvents;
    }, function (_unresolved_2) {
      MoveSprite = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1b048ZXSsJIeIJIoK/CJhF8", "CreatePanel", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'UITransform', 'resources', 'SpriteFrame', 'Button', 'BlockInputEvents']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CreatePanel", CreatePanel = (_dec = ccclass('CreatePanel'), _dec2 = property(Node), _dec(_class = (_class2 = class CreatePanel extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backpack", _descriptor, this);
        }

        start() {
          this.createButton(this.createPanel());
        }

        update(deltaTime) {}

        createButton(mySpriteNode) {
          var myButtonNode = new Node();
          this.backpack.addChild(myButtonNode);
          var mySprite = myButtonNode.addComponent(Sprite);
          mySprite.type = Sprite.Type.SLICED;
          mySprite.sizeMode = Sprite.SizeMode.CUSTOM;
          var myButton = myButtonNode.addComponent(Button);
          myButton.transition = Button.Transition.COLOR;
          var url = 'uipanel/Prguse/Prguse-3/00774';
          resources.load(url, SpriteFrame, (err, spriteFrame) => {
            mySprite.spriteFrame = spriteFrame;
          });
          var eventHandler = new Component.EventHandler();
          eventHandler.target = mySpriteNode;
          eventHandler.component = "MoveSprite";
          eventHandler.handler = "showandhide"; // eventHandler.customEventData = "my data";

          myButton.clickEvents.push(eventHandler);
          var myUITransform = mySprite.getComponent(UITransform);
          myUITransform.setContentSize(50, 20);
          console.log(this.backpack);
        }

        createPanel() {
          var mySpriteNode = new Node();
          mySpriteNode.active = false; // mySpriteNode.emit('fade-out');

          var mySprite = mySpriteNode.addComponent(Sprite);
          mySprite.type = Sprite.Type.SLICED;
          mySprite.sizeMode = Sprite.SizeMode.CUSTOM;
          var url = 'uipanel/Prguse/Prguse-0/00360';
          resources.load(url, SpriteFrame, (err, spriteFrame) => {
            mySprite.spriteFrame = spriteFrame;
          });
          var myUITransform = mySprite.getComponent(UITransform);
          myUITransform.setContentSize(400, 300);
          mySprite.addComponent(_crd && MoveSprite === void 0 ? (_reportPossibleCrUseOfMoveSprite({
            error: Error()
          }), MoveSprite) : MoveSprite);
          mySpriteNode.addComponent(BlockInputEvents);
          this.node.addChild(mySpriteNode);
          return mySpriteNode;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backpack", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0ec78921055e034debe6d5c6dbf029fded09ee00.js.map