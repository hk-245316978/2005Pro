
import { _decorator, Component, v2, Vec2, Vec3, tween} from 'cc';
import { InputController } from './InputController';
const { ccclass, property } = _decorator;

@ccclass('PlayerMoveController')
export class PlayerMoveController extends Component {

    gridSizeX: number = 96; // 每个格子的大小
    gridSizeY: number = 64; // 每个格子的大小
    moveInterval: number = 0.1; // 移动间隔时间（秒）

    private _isMoving: boolean = false; // 是否正在移动
    private _targetPos: Vec3 = null; // 目标位置

    start() {

    }

    update(deltaTime: number) {
        if (this._isMoving) {
            return; // 如果正在移动，不处理新的输入
        }

        // 检测键盘输入
        let direction = InputController.getInputPostion();

        if (!direction.equals(Vec2.ZERO)) {
            // 计算目标位置
            let targetPos = v2(direction.x * this.gridSizeX, direction.y * this.gridSizeY);
            this._targetPos = this.node.getPosition().add(targetPos.toVec3());
            
            // 开始移动
            this.scheduleOnce(() => {
                this.moveToTarget();
            }, this.moveInterval);
        }
    }

    private moveToTarget() {
        this._isMoving = true;

        // 使用缓动动画移动到目标位置
        tween(this.node)
            .to(0.5, { position: this._targetPos }) // 0.2 秒移动到目标位置
            .call(() => {
                this._isMoving = false; // 移动完成
            })
            .start();
    }


}


