import { _decorator, Component, v2, v3, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InputController')
export class InputController extends Component {
    static x: number = 0;
    static y: number = 0;

    static updatePostion(delta: Vec3) {
        this.x = delta.x;
        this.y = delta.y;
    }

    static getInputPostion(): Vec2 {
        return this.getDirection(this.x, this.y);
    }

    static getDirection(x: number, y: number, radius: number = 0.3): Vec2 {
        
        // 计算点到圆心的距离
        const distance = Math.sqrt(x * x + y * y);
    
        // 如果距离小于半径，则点位于中心
        if (distance < radius) {
            return v2(0, 0);
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
            return v2(1, 0);
        } else if (degrees >= 22.5 && degrees < 67.5) {
            return v2(1, 1);
        } else if (degrees >= 67.5 && degrees < 112.5) {
            return v2(0, 1);
        } else if (degrees >= 112.5 && degrees < 157.5) {
            return v2(-1, 1);
        } else if (degrees >= 157.5 && degrees < 202.5) {
            return v2(-1, 0);
        } else if (degrees >= 202.5 && degrees < 247.5) {
            return v2(-1, -1);
        } else if (degrees >= 247.5 && degrees < 292.5) {
            return v2(0, -1);
        } else if (degrees >= 292.5 && degrees < 337.5) {
            return v2(1, -1);
        }
    }

}

