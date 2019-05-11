class Wall {
    constructor(pos1, pos2){
        this.pos1 = pos1;
        this.pos2 = pos2;
    }

    draw() {
        c.strokeStyle = "fff";
        c.beginPath();
        c.moveTo(this.pos1.x, this.pos1.y);
        c.lineTo(this.pos2.x, this.pos2.y);
        c.stroke();
    }
}