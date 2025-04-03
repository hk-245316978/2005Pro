import { _decorator, Component, Node, v2, v3, Vec2, Vec3, EventTouch, UITransform, input, Input } from 'cc';
import { InputController } from './InputController';
const { ccclass, property } = _decorator;

@ccclass('JoystickController')
export class JoystickController extends Component {

    @property(Node)
    player: Node = null;

    @property(Node)
    Joystick: Node = null;

    @property(Node)
    joystickBackground: Node = null;

    @property
    moveSpeed: number = 200;

    private touchStartPos: Vec3 = v3(0, 0, 0);
    private joystickPos: Vec2 = v2(0, 0);
    private isTouching: boolean = false;
    private uiTransform: UITransform;
    private maxRadius :number;

    onLoad() {
        this.uiTransform = this.node.getComponent(UITransform);
        this.maxRadius = this.joystickBackground.getComponent(UITransform).width / 2;
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onDestroy () {
        this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        this.isTouching = true;
        // 转换为目标节点的本地坐标
        this.touchStartPos = v3(event.getLocation().x - this.uiTransform.width / 2, event.getLocation().y - this.uiTransform.height / 2, 0);
        this.joystickBackground.setPosition(this.touchStartPos);
        this.joystickBackground.active = true;
        console.log(this.touchStartPos);
    }

    onTouchMove(event: EventTouch) {
        if (!this.isTouching) return;

        // 转换为目标节点的本地坐标
        const localPos = v3(event.getLocation().x - this.uiTransform.width / 2, event.getLocation().y - this.uiTransform.height / 2, 0);
        const delta = localPos.subtract(this.touchStartPos);

        const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

        if (distance > this.maxRadius) {
            // 修正：使用 normalize() 和 mul() 替代 normalizeSelf() 和 mulSelf()
            delta.x = (delta.x / distance) * this.maxRadius;
            delta.y = (delta.y / distance) * this.maxRadius;
        }

        this.Joystick.setPosition(delta);
        InputController.updatePostion(delta);

        // const velocity = this.player.getPosition()(this.moveSpeed);
        // this.player.setPosition(velocity);
    }

    // movePlayer(direction: Vec2) {
    //     const velocity = direction.mul(this.moveSpeed);
    //     this.player.position.add(velocity.mul(game.deltaTime));
    // }

    onTouchEnd() {
        InputController.updatePostion(Vec3.ZERO);
        this.isTouching = false;
        this.Joystick.setPosition(Vec3.ZERO);
        this.joystickBackground.setPosition(Vec3.ZERO);
        this.joystickBackground.active = false;
        // this.node.position = this.touchStartPos;
        // this.movePlayer(v2(0, 0));
    }



}
