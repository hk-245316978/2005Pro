import { _decorator, Component, Node, v2, v3, Vec2, Vec3, EventTouch, UITransform, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoystickController')
export class JoystickController extends Component {

    // @property(Node)
    // player: Node = null;

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
        // this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onDestroy () {
        this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        this.isTouching = true;
        // 转换为目标节点的本地坐标
        this.touchStartPos = this.uiTransform.convertToNodeSpaceAR(v3(event.getLocation().x, event.getLocation().y, 0));
        this.joystickBackground.setPosition(this.touchStartPos);

        console.log(this.touchStartPos);
    }

    onTouchMove(event: EventTouch) {
        if (!this.isTouching) return;

        // 转换为目标节点的本地坐标
        const localPos = this.uiTransform.convertToNodeSpaceAR(v3(event.getLocation().x, event.getLocation().y, 0));
        const delta = localPos.subtract(this.touchStartPos);

        const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

        if (distance > this.maxRadius) {
            // 修正：使用 normalize() 和 mul() 替代 normalizeSelf() 和 mulSelf()
            delta.x = (delta.x / distance) * this.maxRadius;
            delta.y = (delta.y / distance) * this.maxRadius;
        }

        this.Joystick.setPosition(delta);
        console.log(delta);
    }

    onTouchEnd() {
        this.isTouching = false;
        this.Joystick.setPosition(Vec3.ZERO);
        this.joystickBackground.setPosition(Vec3.ZERO);
        // this.node.position = this.touchStartPos;
        // this.movePlayer(v2(0, 0));
    }

    getDirection(x: number, y: number, radius: number = 0.3): string {
        // 计算点到圆心的距离
        const distance = Math.sqrt(x * x + y * y);
    
        // 如果距离小于半径，则点位于中心
        if (distance < radius) {
            return "中心";
        }
    
        // 计算角度（弧度）
        const radians = Math.atan2(y, x);
        // 转换为角度
        let degrees = radians * (180 / Math.PI);
    
        // 确保角度在 0 到 360 之间
        if (degrees < 0) {
            degrees += 360;
        }
    
        // 判断方位
        if (degrees >= 337.5 || degrees < 22.5) {
            return "东";
        } else if (degrees >= 22.5 && degrees < 67.5) {
            return "东北";
        } else if (degrees >= 67.5 && degrees < 112.5) {
            return "北";
        } else if (degrees >= 112.5 && degrees < 157.5) {
            return "西北";
        } else if (degrees >= 157.5 && degrees < 202.5) {
            return "西";
        } else if (degrees >= 202.5 && degrees < 247.5) {
            return "西南";
        } else if (degrees >= 247.5 && degrees < 292.5) {
            return "南";
        } else if (degrees >= 292.5 && degrees < 337.5) {
            return "东南";
        } else {
            return "未知";
        }
    }


    // movePlayer(direction: Vec2) {
    //     const velocity = direction.mul(this.moveSpeed);
    //     this.player.position = this.player.position.add(velocity.mul(game.deltaTime));
    // }
}
