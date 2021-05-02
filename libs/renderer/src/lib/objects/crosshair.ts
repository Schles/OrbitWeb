import { CMath, Particle, Vector2 } from "@orbitweb/common";
import { Container } from "@pixi/display";
import { Graphics, Text } from "pixi.js";

export class Crosshair extends Container {


    public targeting;
    public targetingLine;
    public targetingLine2: Graphics;
    public targetingText;
    public targetingCircle: Graphics;

    constructor() {
        super();

        this.targeting = new Container();
        this.targetingLine = new Graphics();
        this.targetingLine2 = new Graphics();
        this.targetingCircle = new Graphics();

        this.targeting.addChild(this.targetingLine);
        this.targeting.addChild(this.targetingLine2);
        this.targeting.addChild(this.targetingCircle);

        this.targetingText = new Text("", {fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});

        this.targeting.addChild(this.targetingText);
    }

    public draw1(source: Vector2, target: Vector2) {
    
        this.drawLine(this.targetingLine, source, target, 0xFF0000, 1);
    
        const dir = CMath.sub(target, source);
        const len = CMath.len(dir);
        const center: Vector2 = CMath.add(source, CMath.scale(dir, 0.5));

        this.targetingText.x = center.x;
        this.targetingText.y = center.y;

        this.targetingText.text = len.toFixed(0) + "m";
    }

    public draw2(source: Vector2, target: Vector2) {
        this.targetingCircle.clear();
        this.drawCross(this.targetingLine2, target);
    }

    public draw3(target: Vector2, orbitRadius: number) {
        this.targetingLine2.clear();
        

        this.targetingCircle.clear();
        this.targetingCircle.position.x = target.x;
        this.targetingCircle.position.y = target.y;
        this.targetingCircle.lineStyle(1, 0xFFFFFF, 0.1);
        this.targetingCircle.drawCircle(0, 0, orbitRadius);
        this.targetingCircle.endFill();
    }


  public drawCross(container: Graphics, pos: Vector2) {
    container.clear();

    const width = 5;

    const p1: Vector2 = CMath.add(pos, CMath.scale({x: 1, y: 1}, width));
    const p2: Vector2 = CMath.add(pos, CMath.scale({x: -1, y: -1}, width));

    const p3: Vector2 = CMath.add(pos, CMath.scale({x: -1, y: 1}, width));
    const p4: Vector2 = CMath.add(pos, CMath.scale({x: 1, y: -1}, width));


    container.lineStyle(1, 0xFFFFFF, 0.5);
    container.moveTo(p1.x, p1.y);
    container.lineTo(p2.x, p2.y);

    container.moveTo(p3.x, p3.y);
    container.lineTo(p4.x, p4.y);
  }

  public drawLine(container: Graphics, source: Vector2, target:Vector2, c, a) {
    container.clear();
    container.lineStyle(1, c, a);
    container.moveTo(source.x, source.y);
    container.lineTo(target.x, target.y);
  }
}