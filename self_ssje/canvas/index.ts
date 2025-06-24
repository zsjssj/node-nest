//canvas手写绘制文字
class canvasDraw {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastX: number;
  lastY: number;
  isCanDraw: boolean;
  canvasId: number;

  constructor(canvasElement: HTMLCanvasElement) {
    // this.canvas = document.getElementById('canvasTest')
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.lastX = 0; //记录画笔上次的x坐标
    this.lastY = 0; //记录画笔上次的Y坐标

    this.isCanDraw = false; //记录画笔是否可以移动
    this.canvasId = 0; //记录画布的id
  }
  init() {
    this.canvas.width = 500;
    this.canvas.height = 500;
    // const scale = window.devicePixelRatio // 获取设备像素比
    // canvas.width = 500 * scale
    // canvas.height = 500 * scale
    // ctx.scale(scale, scale) // 按比例缩放上下文

    //2d绘图配置
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = 0.5; // 根据需要调整线宽
  }
  saveDraw() {
    const link = document.createElement('a');
    link.href = this.canvas.toDataURL();
    link.download = 'canvas.png';
    link.click();
    // this.canvasId += 1
  }
  handleDraw(event: MouseEvent) {
    event.preventDefault();
    if (this.isCanDraw) {
      this.ctx.lineTo(event.offsetX, event.offsetY);
      if (Math.abs(event.offsetX - this.lastX) > 3 || Math.abs(event.offsetY - this.lastY) > 3) {
        this.ctx.quadraticCurveTo(this.lastX, this.lastY, event.offsetX, event.offsetY);
      }
      this.ctx.stroke();
      [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
    }
  }
  onHandleDraw() {
    const gl = this.canvas.getContext('webgl');
    gl && gl.drawArrays(gl.POINTS, 0, 1);
    const _this = this;
    //监听鼠标按下事件
    this.canvas.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.isCanDraw = true;
      [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
      this.canvas.addEventListener('mousemove', this.handleDraw.bind(this));
    });
    //监听鼠标滑动事件
    // canvas.addEventListener('mousemove', handleDraw)

    //监听鼠标松开事件
    window.addEventListener('mouseup', (event) => {
      event.preventDefault();
      this.isCanDraw = false;
      this.ctx.closePath();
      this.canvas.removeEventListener('mousemove', this.handleDraw.bind(this));
    });
  }
  //清除绘图
  clearDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
