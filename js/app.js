const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

var mouse = new Vector();

var player;
var walls = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    mouse = new Vector(canvas.width/2, canvas.height/2);

    player = new Player(mouse);
    walls = [];

    walls.push(new Wall(new Vector(3*canvas.width/4, canvas.height/4), new Vector(3*canvas.width/4, 3*canvas.height/4)));
    walls.push(new Wall(new Vector(canvas.width/4, canvas.height/2), new Vector(3*canvas.width/4, canvas.height/2)));
    walls.push(new Wall(new Vector(0, 0), new Vector(canvas.width, 0)));
    walls.push(new Wall(new Vector(canvas.width, 0), new Vector(canvas.width, canvas.height)));
    walls.push(new Wall(new Vector(0, canvas.height), new Vector(canvas.width, canvas.height)));
    walls.push(new Wall(new Vector(0, 0), new Vector(0, canvas.height)));
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    player.look(walls);

    player.draw();
    for(let i = 0; i < walls.length; i++){
        walls[i].draw();
    }
}

window.addEventListener('resize', init);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

init();
animate();