import { _decorator, Component, instantiate, log, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bg')
export class bg extends Component {
    n1: Node;
    n2: Node;
    height: number = 812;
    @property({
        tooltip:"向左移动速度",
        range:[0.01,10]
    })
    private speed: number = 1;
    onLoad(): void {
        let num = this.node.children.length;
        if(num!=1){
            log("子节点循环移动只允许只有一个子节点");
            return
        }

        let n1 = this.node.children[0];
        let n2 = instantiate(n1);
        n2.parent = this.node;

        n2.setPosition({...n2.position, y: this.height})
        
        this.n1 = n1;
        this.n2 = n2;
    }
    start() {

    }

    update(deltaTime: number) {
        
        if(!this.n1 || !this.n2){
            return
        }
        const {y: y1} = this.n1.position;
        const {y: y2} = this.n2.position;

        this.n1.setPosition({
            ...this.n1.position,
            y: this.n1.position.y - 1
        })
        this.n2.setPosition({
            ...this.n2.position,
            y: this.n2.position.y - 1
        })

        if(y1 <= -this.height){
            this.n1.setPosition({
                ...this.n1.position,
                y: this.height / 2,
            })
        }
        if(y2 <= -this.height){
            this.n2.setPosition({
                ...this.n2.position,
                y: this.height / 2,
            })
        }
        // if(y1 <= -this.height){
        //     this.n1.y = this.height
        // }
        // if(this.n2.y<=-this.height){
        //     this.n2.y = this.height
        // }
    }
}
