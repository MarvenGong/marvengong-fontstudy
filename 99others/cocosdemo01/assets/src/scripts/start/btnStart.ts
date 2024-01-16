import { _decorator, CCBoolean, Component, EventTouch, Input, input, Node, Director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('btnStart')
export class btnStart extends Component {
    @property({type: CCBoolean})
    private isLoaded = false;
    start() {
        console.log('开始按钮被挂载');
        this.isLoaded = true;
        input.on(Input.EventType?.TOUCH_START, this.handleStart, this)
    }

    update(deltaTime: number) {
        
    }

    onLoad() {
        console.log('开始按钮被load');
    }

    handleStart() {
        console.log('start');
        Director.instance.loadScene('ScenePlay');
    }
}

