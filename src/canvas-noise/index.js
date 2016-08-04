let canvasNoise = (function (document, window) {
  let defaults = {
    width: 0, // canvas 实际宽度,如果没有设置,就按照载入页面的canvas可视宽度作为其宽度
    height: 0,  // canvas 实际高度,如果没有设置,就按照载入页面的canvas可视高度作为其高度
    pieceWidth: 100,  // 噪点重复单元片段的宽度和高度
    pieceHeight: 100,
    // 噪点的尺寸大小
    pixelWidth: 1,
    pixelHeight: 1
  }

  // 绘制一个噪点片段
  // 原因在于:
  // 如果满屏绘制,性能会很差
  // 像墙面的瓷砖一样,只要弄一个,其他的再重复拼凑起来就可以
  let canvasPiece = function (options) {
    let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d')
    // 尺寸
    let pieceWidth = options.pieceWidth,
      pieceHeight = options.pieceHeight
    // 像素点大小
    let pixelWidth = options.pixelWidth,
      pixelHeight = options.pixelHeight

    // 在特定的小尺寸上,绘制慢慢的随机灰色系的颜色
    for (let y = 0; y < pieceHeight; y += pixelHeight) {
      for (let x = 0; x < pieceWidth; x += pixelWidth) {
        let color = Math.floor(Math.random() * 150)
        context.fillStyle = `rgba(${color},${color},${color},1)`
        context.fillRect(x, y, pixelWidth, pixelHeight)
      }
    }
    return canvas
  }

  // 根据上面绘制的噪点片段拼接成一个大的完整的噪点效果
  let draw = function (canvas, options) {
    // 片段噪点canvas
    let piece = canvasPiece(options)

    // 这里的canvas参数就是页面中的canvas了
    let context = canvas.getContext('2d')

    // 根据尺寸算出需要多少个片段可以拼出来
    let width = options.width,
      height = options.height
    let pieceWidth = options.pieceWidth,
      pieceHeight = options.pieceHeight

    // 片段个数
    let tileNumH = Math.ceil(width / pieceWidth),
      tileNumV = Math.ceil(height / pieceHeight)

    // 使用drawImage方法把片段噪点一个一个绘制到大的画布上
    for (let x = 0; x < tileNumH; x++) {
      for (let y = 0; y < tileNumV; y++) {
        context.drawImage(
          // 被用来复制的片段canvas图形
          piece,
          // 拿来绘制的画布的起始点和区域大小
          0, 0,
          pieceWidth, pieceHeight,
          // 当前画布绘制的起始点和区域大小
          x * pieceWidth, y * pieceHeight,
          // 要使用的图像的大小
          pieceWidth, pieceHeight
        )
      }
    }
  }

  return function (canvas, options) {
    // 下面这么多行就是参数的合并什么的
    let params = {}
    options = options || {}
    for (let key in defaults) {
      params[key] = options[key] || defaults[key]
    }
    if (!params.width) {
      params.width = canvas.clientWidth
    }
    if (!params.height) {
      params.height = canvas.clientHeight
    }

    // 设定尺寸,避免拉伸
    canvas.width = params.width
    canvas.height = params.height

    // 噪点画起来
    draw(canvas, params)
  }

})(document, window)

// IE9+浏览器才支持canvas,因此忽略IE8-
if([].map) {
  let canvas = document.querySelector('#nosicCanvas')
  canvasNoise(canvas, {
    pieceWidth: 300,
    pieceHeight: 150
  })
}