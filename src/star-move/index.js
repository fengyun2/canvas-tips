/*
 * @Author: fengyun2
 * @Date:   2016-08-03 18:04:48
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-08-03 18:45:11
 */

'use strict';

// 星星效果
(function() {
    if (!window.addEventListener) return;
    const canvas = document.querySelector('#starCanvas')
    if (!canvas.getContext) return;
    const ctx = canvas.getContext('2d')

    let starts = {},
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

    let getMinRandom = function() {
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

    resizeCanvas()

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
    }
})();
