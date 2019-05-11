class Player {
    constructor(pos, rotation) {
        this.pos = pos;
        this.rays = [];
        this.fov = 2*Math.PI/3;
        this.rotation = rotation;
        for(let i = this.rotation-this.fov/2; i < this.rotation + this.fov/2; i += .0005){
            this.rays.push(new Ray(this.pos, i))
        }
    }
    
    draw() {
        // for(let i = 0; i < this.rays.length; i++){
        //     this.rays[i].draw();
        // }
            
        c.fillStyle = "#fff";
        c.strokeStyle = "#fff";
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, 10, 0, Math.PI*2);
        c.fill();
        c.stroke();
    }

    updateRotation(r) {
        this.rotation = r;
        this.rays = [];
        for(let i = this.rotation-this.fov/2; i < this.rotation + this.fov/2; i += .00025){
            this.rays.push(new Ray(this.pos, i))
        }
    }

    look(walls) {
        for(let i = 0; i < this.rays.length; i++){
            let closestPoint = null;
            let record = Infinity;
            for(let j = 0; j < walls.length; j++){
                let point = this.rays[i].cast(walls[j]);
                if(point){
                    let d = vDistanceSQ(point, this.pos)

                    if(d < record){
                        record = d;
                        closestPoint = point;
                    }
                }
            }

            if(closestPoint) {
                c.strokeStyle = "rgba(255, 255, 255, .01)";
                c.beginPath();
                c.moveTo(this.pos.x, this.pos.y);
                c.lineTo(closestPoint.x, closestPoint.y);
                c.stroke();
            }
        }
    }
}