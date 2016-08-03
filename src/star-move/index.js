/*
 * @Author: fengyun2
 * @Date:   2016-08-03 18:04:48
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-08-03 18:49:26
 */

'use strict';

// let console = require('better-console')

// 星星效果
(function () {
    if (!window.addEventListener) return;
    const canvas = document.querySelector('#starCanvas')
    console.log('canvas', canvas)
    if (!canvas.getContext) return;
    const ctx = canvas.getContext('2d')

    let stars = {},
        particleIndex = 0,
        settings = {
            r: 1400,
            height: 260,
            density: 300,
            maxLife: 100,
            groundLevel: canvas.height,
            leftWall: 0,
            rightWall: canvas.width,
            alpha: 0.0,
            maxAlpha: 1
        };

    let getMinRandom = function () {
        let rand = Math.random();
        // step 的大小决定了星星靠近地球的巨龙度
        let step = Math.ceil(1 / (1 - rand));
        let arr = [];
        for (let i = 0; i < step; i++) {
            arr.push(Math.random())
        }

        return Math.min.apply(null, arr)
    }

    function resizeCanvas() {
        canvas.width = 1920
        canvas.height = 800
        settings.rightWall = canvas.width
        settings.groundLevel = canvas.height
        settings.height = 260 + (canvas.height - 800) / 2
        redraw()
    }

    console.log('before resize: ', settings.height);

    resizeCanvas()

    // console.log('after resize: ', settings.height);

    window.addEventListener('resize', resizeCanvas)

    function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(0,0,0,0)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    function Star() {
        // 圆的轨迹方程式为：(x-a)²+(y-b)²=r²
        // 因此，已知x, 则y = Math.sqrt(r² - (x-a)²) + b;
        // 其中，圆心是(a, b)
        // 在本例子中
        // 圆心坐标是(canvas.width/2, canvas.height - 600 + r);

        let a = canvas.width / 2,
            b = canvas.height - settings.height + settings.r
        // 横坐标随机
        this.x = Math.floor(Math.random() * canvas.width)
        // 纵坐标需要在圆弧越往上,越稀疏
        this.offsety = getMinRandom() * (canvas.height - settings.height)
        this.y = b - Math.sqrt(settings.r * settings.r - (this.x - a) * (this.x - a)) - this.offsety

        this.vx = Math.random() * 0.05 + 0.025 // 水平偏移,也是移动速度

        // 星星的尺寸
        this.particleSize = 0.5 + (Math.random() + 0.1 / 4)
        particleIndex++
        stars[particleIndex] = this
        this.alpha = 0.0
        this.maxAlpha = 0.2 + (this.y / canvas.height) * Math.random() * 0.8
        this.alphaAction = 1
    }

    Star.prototype.draw = function () {
        // 横坐标移动
        this.x += this.vx
        // 根据切线方向进行偏移
        // y坐标
        this.y = canvas.height - settings.height + settings.r - Math.sqrt(settings.r * settings.r - (this.x - canvas.width / 2) * (this.x - canvas.width / 2)) - this.offsety

        // 透明度慢慢起来
        if (this.alphaAction === 1) {
            if (this.alpha < this.maxAlpha) {
                this.alpha += .005
            } else {
                this.alphaAction = -1
            }
        } else {
            if (this.alpha > 0.2) {
                this.alpha -= 0.002
            } else {
                this.alphaAction = 1
            }
        }

        if (this.x + (this.particleSize * 2) >= settings.rightWall) {
            // x到左侧
            this.x = this.x - settings.rightWall
        }

        // 绘制星星
        ctx.beginPath()
        ctx.fillStyle = "rgba(255, 255, 255," + this.alpha.toString() + ")"
        ctx.arc(this.x, this.y, this.particleSize, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
    }

    function render() {
        redraw()

        // 星星的数目
        // IE下CPU性能有限,数目小
        let length = 400
        if (!history.pushState) {
            // IE9
            length = 200
        } else if (document.msHidden != undefined) {
            // IE10+
            length = 300
        }

        if (Object.keys(stars).length > length) {
            settings.density = 0
        }

        for (let i = 0; i < settings.density; i++) {
            console.log('i: ', i)
            if (Math.random() > 0.97) {
                new Star()
            }
        }

        // console.log('stars: ', stars)
        // 星星实时移动
        for (let i in stars) {
            stars[i].draw()
        }

        requestAnimationFrame(render)
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (fn) {
            setTimeout(fn, 17)
        }
    }
    render()
})();
