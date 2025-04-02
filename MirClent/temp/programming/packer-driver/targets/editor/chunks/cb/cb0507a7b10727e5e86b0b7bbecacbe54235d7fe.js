System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Input, Component, Node, PolygonCollider2D, Intersection2D, UITransform, v3, v2, _dec, _class2, _crd, ccclass, property, eventTarget, _class;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Input = _cc.Input;
      Component = _cc.Component;
      Node = _cc.Node;
      PolygonCollider2D = _cc.PolygonCollider2D;
      Intersection2D = _cc.Intersection2D;
      UITransform = _cc.UITransform;
      v3 = _cc.v3;
      v2 = _cc.v2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "94d35BUMQdLbYZvhCwVXut9", "MoveSprite", undefined);

      __checkObsolete__(['_decorator', 'input', 'Input', 'Component', 'Node', 'PolygonCollider2D', 'Intersection2D', 'UITransform', 'v3', 'v2']);

      ({
        ccclass,
        property
      } = _decorator);
      eventTarget = new EventTarget();

      _export("default", _class = (_dec = ccclass('MoveSprite'), _dec(_class2 = class _class2 extends Component {
        constructor(...args) {
          super(...args);
          // 状态
          this.isActive = false;
          this.isMoving = true;
          this.startPoint = void 0;
          this.mousePoint = void 0;
        }

        start() {}

        onLoad() {
          this.node.on(Input.EventType.TOUCH_START, this.event_mouse_down, this);
          this.node.on(Input.EventType.TOUCH_MOVE, this.event_mouse_move, this);
          this.node.on(Input.EventType.TOUCH_END, this.event_mouse_up, this);
        }

        onDestroy() {
          this.node.off(Input.EventType.TOUCH_START, this.event_mouse_down, this);
          this.node.off(Input.EventType.TOUCH_MOVE, this.event_mouse_move, this);
          this.node.off(Node.EventType.TOUCH_END, this.event_mouse_up, this);
        }

        event_mouse_down(event) {
          this.startPoint = this.node.getPosition();
          this.mousePoint = event.getUILocation(); // 获取碰撞组件

          const collider = this.node.getComponent(PolygonCollider2D); // 如果没有碰撞组件直接返回

          if (!collider) {
            // 设置当前节点在父节点的 children 数组中的位置，使节点保持在最高层，不会被其他的节点覆盖
            this.node.setSiblingIndex(10);
            this.isActive = true;
            return;
          } // 点击位置的坐标


          const downPoint = event.getUILocation(); // 把UI窗口内的坐标位置转换成节点为中心点的坐标

          const nodePoint = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(downPoint.x, downPoint.y)); // 多边形的顶点

          const points = collider.points; // 获取点击位置的坐标是否在多边形内

          const is = Intersection2D.pointInPolygon(v2(nodePoint.x, nodePoint.y), points);

          if (is) {
            this.node.setSiblingIndex(10);
            this.isActive = true; // 如果点击的图形区域设置事件不可穿透

            event.preventSwallow = false;
          } else {
            // 如果点击的是透明区域设置事件可穿透
            event.preventSwallow = true;
          }
        }

        event_mouse_move(event) {
          if (this.isMoving && this.isActive) {
            let movePointN = v2(event.getLocation().x - this.mousePoint.x, event.getLocation().y - this.mousePoint.y);
            this.node.setPosition(this.startPoint.x + movePointN.x, this.startPoint.y + movePointN.y);
          }
        }

        event_mouse_up() {
          this.isActive = false;
        }

        showandhide() {
          if (this.node.active) {
            this.node.active = false;
            this.node.emit('fade-out');
          } else {
            this.node.active = true;
            this.node.emit('fade-in');
          }
        }

      }) || _class2));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cb0507a7b10727e5e86b0b7bbecacbe54235d7fe.js.map