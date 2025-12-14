window.boxDesigner = (function () {
    let canvas, ctx;
    let scale = 1;
    let design = null;

    function init(canvasId) {
        canvas = document.getElementById(canvasId);
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        redraw();
    }

    function setDesign(designJson) {
        design = JSON.parse(designJson);
        redraw();
    }

    function redraw() {
        if (!canvas || !ctx || !design) return;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // compute scale based on inner width/height
        const sx = (w - 40) / design.innerWidthMm;  // 20px margin each side
        const sy = (h - 40) / design.innerHeightMm;
        scale = Math.min(sx, sy);

        ctx.save();
        ctx.translate(20, 20);

        // draw outer box
        ctx.beginPath();
        ctx.rect(0, 0, design.innerWidthMm * scale, design.innerHeightMm * scale);
        ctx.stroke();

        // draw shapes
        if (design.shapes) {
            design.shapes.forEach(s => {
                if (s.type === "rect") {
                    drawRectShape(s);
                }
            });
        }

        ctx.restore();
    }

    function drawRectShape(s) {
        const x = s.x * scale;
        const y = s.y * scale;
        const w = s.widthMm * scale;
        const h = s.heightMm * scale;

        const halfW = w / 2;
        const halfH = h / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((s.rotationDeg || 0) * Math.PI / 180.0);

        ctx.beginPath();
        ctx.rect(-halfW, -halfH, w, h);
        ctx.stroke();

        ctx.restore();
    }

    return {
        init,
        setDesign
    };
})();
