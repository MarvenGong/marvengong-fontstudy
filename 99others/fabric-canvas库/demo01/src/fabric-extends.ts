import { fabric } from 'fabric';
export const extendLineArrow = () => {
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = 'rgb(5, 131, 209)';
  fabric.Object.prototype.cornerStyle = 'circle';
  (fabric as any).LineArrow = fabric.util.createClass(fabric.Line, {

    type: 'lineArrow',

    initialize(element: any, options: {}) {
      // eslint-disable-next-line no-param-reassign
      options || (options = {});
      this.callSuper('initialize', element, options);
    },

    toObject() {
      return fabric.util.object.extend(this.callSuper('toObject'), {});
    },

    _render(ctx: { save: () => void; translate: (arg0: number, arg1: number) => void; rotate: (arg0: number) => void; beginPath: () => void; moveTo: (arg0: number, arg1: number) => void; lineTo: (arg0: number, arg1: number) => void; closePath: () => void; fillStyle: any; fill: () => void; restore: () => void; }) {
      this.callSuper('_render', ctx);

      // do not render if width/height are zeros or object is not visible
      if (this.width === 0 || this.height === 0 || !this.visible) return;

      ctx.save();

      const xDiff = this.x2 - this.x1;
      const yDiff = this.y2 - this.y1;
      const angle = Math.atan2(yDiff, xDiff);
      ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
      ctx.rotate(angle);
      ctx.beginPath();
      // move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
      ctx.moveTo(10, 0);
      ctx.lineTo(-20, 15);
      ctx.lineTo(-10, 0);
      ctx.lineTo(-20, -15);
      ctx.closePath();
      ctx.fillStyle = this.stroke;
      ctx.fill();
      ctx.restore();
    }
  });

  (fabric as any).LineArrow.fromObject = function(object: { x1: any; y1: any; x2: any; y2: any; }, callback: (arg0: any) => any) {
    callback && callback(new (fabric as any).LineArrow([object.x1, object.y1, object.x2, object.y2], object));
  };

  (fabric as any).LineArrow.async = true;
};