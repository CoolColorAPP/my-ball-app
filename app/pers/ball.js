export const ball = (ctx, x, y, radius, color) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath;
    ctx.fillStyle = color;
    ctx.fill();
}