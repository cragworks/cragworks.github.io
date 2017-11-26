polyFillPerfNow();
injectMeasure();
polyFillRAFNow();
setupLoader();
// Canvas setup
var cv = document.getElementById('cv');
var ctx = context = cv.getContext("2d", {antialias: '2x'});
var canvasWidth = cv.width,
    canvasHeight = cv.height;

var i = 0;
var pi = 3.14159;


// main function executed when all is loaded.
function main() {
    animate();
}


function drawScene() {
    // draw the wall
    // darken the wall, with a bit of blue
    darken(0, 0, canvasWidth, canvasHeight, '#003', 0.5);
    // draw a light abstacle
    ctx.save();
    // clip with the light obstacle
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth, 0);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.lineTo(0, 0);
    ctx.arc(280, 280, 50, 0, 2 * pi, true);
    ctx.clip();
    // draw the left light (clipped)
    ligthen(180, 200, 120, '#331');
    ctx.restore();
    ligthenGradient(460, 200, 120);
}
function animate() {
    requestAnimationFrame(animate);
    drawScene();
}

function ligthen(x, y, radius, color) {
    ctx.save();
    var rnd = 0.03 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#0B0B00';
    ctx.fill();
    ctx.restore();
}

function ligthenGradient(x, y, radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BB9');
    radialGradient.addColorStop(0.2 + rnd, '#AA8');
    radialGradient.addColorStop(0.7 + rnd, '#330');
    radialGradient.addColorStop(0.90, '#110');
    radialGradient.addColorStop(1, '#000');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * pi);
    ctx.fill();
    ctx.restore();
}

function darken(x, y, w, h, darkenColor, amount) {
    ctx.fillStyle = 'darkenColor';
    ctx.globalAlpha = amount;
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 1;
}

function polyFillPerfNow() {
    window.performance = window.performance ? window.performance : {};
    window.performance.now = window.performance.now || window.performance.webkitNow || window.performance.msNow || window.performance.mozNow || Date.now;
    window.now = window.performance.now.bind(performance);
    // warm up the function, fooling the interpreter not to skip;
    var a = now();
    a += now();
    return a;
};

function injectMeasure(factor) {
    var startTime = 0;
    var stopTime = 0;
    factor = factor | 1;

    window.startCW = function () {
        startTime = now();
        return startTime;
    };
    window.stopCW = function () {
        stopTime = now();
        return factor * (stopTime - startTime);
    };
    window.lastCW = function () {
        return factor * (stopTime - startTime);
    };
    // warming up the functions, 
    // fooling the interpreter not to skip;
    var w = 0;
    w = startCW();
    w += startCW();
    w += stopCW();
    w += stopCW();
    w += lastCW();
    return w;
}

function polyFillRAFNow() {
    // requestAnimationFrame polyfill
    var w = window,
        foundRequestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || function (cb) {
            setTimeout(cb, 1000 / 60);
        };
    window.requestAnimationFrame = foundRequestAnimationFrame;
    // warm-up the function
    requestAnimationFrame(voidFunction);
}

function voidFunction() {};

// resources loader
function setupLoader() {

    window.AnyFile = XMLHttpRequest;

    var rscCount = 1;
    var errorCount = 0;
    var errMsgs = '';

    window.addRsc = function (rscType, rscUrl) {
        var rsc = new rscType();
        rscCount++;
        rsc.addEventListener('load', loadEnded);
        rsc.addEventListener('error', errorWhileLoading);
        if (rscType !== AnyFile) rsc.src = rscUrl;
        else {
            rsc.open("GET", rscUrl, true);
            rsc.send(null);
        }
        return rsc;
    }
    window.addEventListener('load', loadEnded);
    window.addEventListener('error', errorWhileLoading);

    function loadEnded() {
        cl('l ed ');
        rscCount--;
        if (!rscCount) launchMain();
    }

    function errorWhileLoading(e) {
        errorCount++;
        rscCount--;
        errMsgs += e.message + '\n';
        if (!rscCount) launchMain();
    }

    function launchMain() {
        if (errorCount) alert('errors while loading rsc : \n' + errMsgs);
        setTimeout(main, 1000);
    }
}

function cl() {
    console.log.apply(console, arguments);
}

function length(x1, y1, x2, y2) {
    y2 -= y1;
    y2 *= y2;
    x2 -= x1;
    x2 *= x2;
    return Math.sqrt(x2 + y2)
}

function sq(x) {
    return x * x;
}