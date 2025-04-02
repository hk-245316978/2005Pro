import { _decorator, Component, Node, Sprite, UITransform, resources, SpriteFrame, Button, BlockInputEvents} from 'cc';
import MoveSprite from './MoveSprite';
const { ccclass, property } = _decorator;

@ccclass('CreatePanel')
export class CreatePanel extends Component {

    @property(Node)
    backpack: Node | null = null;

    start() {
        this.createButton(this.createPanel())
    }

    update(deltaTime: number) {
        
    }

    createButton(mySpriteNode: Node){
        const myButtonNode = new Node();
        this.backpack.addChild(myButtonNode);

        const mySprite = myButtonNode.addComponent(Sprite);
        mySprite.type = Sprite.Type.SLICED;
        mySprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const myButton = myButtonNode.addComponent(Button);
        myButton.transition = Button.Transition.COLOR;
        const url = 'uipanel/Prguse/Prguse-3/00774';
        resources.load(url, SpriteFrame, (err: any, spriteFrame) => {
            mySprite.spriteFrame = spriteFrame;
        });
        const eventHandler = new Component.EventHandler();
        eventHandler.target = mySpriteNode;
        eventHandler.component = "MoveSprite";
        eventHandler.handler = "showandhide";
        // eventHandler.customEventData = "my data";
        myButton.clickEvents.push(eventHandler);

        const myUITransform = mySprite.getComponent(UITransform);
        myUITransform.setContentSize(50, 20);
        
        console.log(this.backpack);
    }

    createPanel() :Node{
        const mySpriteNode = new Node();
        mySpriteNode.active = false;
        // mySpriteNode.emit('fade-out');
        
        const mySprite = mySpriteNode.addComponent(Sprite);
        mySprite.type = Sprite.Type.SLICED;
        mySprite.sizeMode = Sprite.SizeMode.CUSTOM;
        const url = 'uipanel/Prguse/Prguse-0/00360';
        resources.load(url, SpriteFrame, (err: any, spriteFrame) => {
            mySprite.spriteFrame = spriteFrame;
        });

        const myUITransform = mySprite.getComponent(UITransform);
        myUITransform.setContentSize(400, 300);

        mySprite.addComponent(MoveSprite);
        mySpriteNode.addComponent(BlockInputEvents);
        this.node.addChild(mySpriteNode);

        return mySpriteNode;
    }


}


