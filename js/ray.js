class Ray {
    constructor(pos, angle){
        this.pos = pos;
        this.dir = new Vector(1, 0);
        this.dir.rotateTo(angle);
    }

    lookAt(target) {
        let nDir = vSubtract(target, this.pos);
        this.dir = vNormalize(nDir);
    }

    draw() {
        let end = vAdd(this.pos, vMultVal(this.dir, 50));
        c.strokeStyle = "rgba(255, 255, 255, .1)";
        c.beginPath();
        c.moveTo(this.pos.x, this.pos.y);
        c.lineTo(end.x, end.y);
        c.stroke();
    }

    cast(wall) {
        var point = null
        const x1 = wall.pos1.x;
        const y1 = wall.pos1.y;
        const x2 = wall.pos2.x;
        const y2 = wall.pos2.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const denom = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);

        if(denom !== 0) {
            const t = ((x1-x3) * (y3-y4) - (y1-y3) * (x3-x4)) / denom;
            const u = -((x1-x2) * (y1-y3) - (y1-y2) * (x1-x3)) / denom;
            
            if(t > 0 && t < 1 && u > 0){
                point = new Vector();
                point.x = x1 + t * (x2-x1);
                point.y = y1 + t * (y2-y1);
                return point;
            }
        }

        return point;
    }
}