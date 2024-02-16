
var player;
var keyboard;

var pointer
var camera;

let img;
let c;

function preload() {
  // preload() runs once
  img = loadImage('assets/Space Ship1.png');
}

function setup() {

    var cnv = createCanvas(windowWidth, windowHeight);

    camera = new Camera();

    player = new Player();
    keyboard = new Keyboard();
    keyboard.setup();

    pointer = createVector(0,0);

}

function draw() {
    background(0, 0, 0);

    translate(windowWidth/2, windowHeight/2);

    // translate(-player.pos.x, -player.pos.y);

    // pointer.x = mouseX - windowWidth/2 + player.pos.x;
    // pointer.y = mouseY - windowHeight/2 + player.pos.y;

    translate(-camera.pos.x, -camera.pos.y);

    pointer.x = mouseX - windowWidth/2 + camera.pos.x;
    pointer.y = mouseY - windowHeight/2 + camera.pos.y;


    player.update();
    player.render();

    keyboard.update();
    keyboard.render();
    
    push();
    stroke(255);
    strokeWeight(2);
    point(pointer.x, pointer.y)
    pop();

    push();
    fill(51);
    stroke(51);
    strokeWeight(2);
    textSize(25);

    let fps = frameRate();
    textSize(20);
    text("fps = " + Math.round(fps), 50, windowHeight - 20);
    
    
    pop();

}

class Camera {
    constructor() {
        this.pos = createVector(0,0);
    }

    update (campos) {
        this.pos = campos ;
    }
}


class Player {
    constructor() {
        this.pos = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
        this.targetAngle = 0;

        this.scale = 25;
        this.width = this.scale;
        this.height = this.scale;
    }

    update() {

        let targetVector = p5.Vector.sub(pointer , this.pos );
        this.targetAngle = targetVector.heading();

        targetVector.div(4);

        let point = targetVector.add(this.pos);

        camera.update(point);

        this.angle = this.targetAngle;

        // if (this.angle < this.targetAngle) {
        //     this.angle++;
        // } else {
        //     this.angle--;  
        // }

        if (keyboard.uparrow) {
            let thrust = p5.Vector.fromAngle(radians(this.angle) );
            // thrust = p5.Vector.mult(thrust, 10)
            this.vel.add(thrust);
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.vel.mult(0.95);

    }

    render() {
        angleMode(DEGREES);
        push();
        translate(this.pos.x, this.pos.y);
        angleMode(DEGREES);
        rotate(this.angle + 90);
        // console.log(this.angle);

        imageMode(CENTER);
        image(img, 0, 0, this.width, this.height);
        pop();
    }
}














class Keyboard {
    constructor() {

        this.keyCodes = [];
        this.keyChar = [];

        this.lastChar = 'a';
        this.char = 'a';
    }

    update() {

        this.leftarrow = false;
        this.uparrow = false;
        this.rightarrow = false;
        this.downarrow = false;

        if (this.keyCodes[37] || this.keyCodes[65]) {
            this.leftarrow = true;
        }

        if (this.keyCodes[38] || this.keyCodes[87]) {
            this.uparrow = true;
        }

        if (this.keyCodes[39] || this.keyCodes[68]) {
            this.rightarrow = true;
        }

        if (this.keyCodes[40] || this.keyCodes[83]) {
            this.downarrow = true;
        }
    }

    render() {
        let start = 65;
        let end = 90; // 222
        let pos = 0;
        
        fill(255);
        for (var i = start; i <= end; i++) {
            pos++;
            text(this.keyCodes[i], 0, 10 * pos + 50);
            text(this.keyChar[i], 40, 10 * pos + 50);
        }
    }

    setup() {
        this.keyCodes = []; // You could also use an array
        for (var i = 0; i <= 222; i++) {
            this.keyCodes[i] = false;
        }

        this.keyChar = [];
        for (var i = 0; i <= 222; i++) {
            this.keyChar[i] = "-";
        }

        this.keyChar[8] = "backspace";
        this.keyChar[9] = "tab";
        this.keyChar[13] = "enter";
        this.keyChar[16] = "shift";
        this.keyChar[17] = "ctrl";
        this.keyChar[18] = "alt";
        this.keyChar[19] = "pause/break";
        this.keyChar[20] = "caps lock";
        this.keyChar[27] = "escape";
        this.keyChar[32] = "space";
        this.keyChar[33] = "page up";
        this.keyChar[34] = "page down";
        this.keyChar[35] = "end";
        this.keyChar[36] = "home";
        this.keyChar[37] = "left arrow";
        this.keyChar[38] = "up arrow";
        this.keyChar[39] = "right arrow";
        this.keyChar[40] = "down arrow";
        this.keyChar[45] = "insert";
        this.keyChar[46] = "delete";

        this.keyChar[48] = "0";
        this.keyChar[49] = "1";
        this.keyChar[50] = "2";
        this.keyChar[51] = "3";
        this.keyChar[52] = "4";
        this.keyChar[53] = "5";
        this.keyChar[54] = "6";
        this.keyChar[55] = "7";
        this.keyChar[56] = "8";
        this.keyChar[57] = "9";

        this.keyChar[65] = "a";
        this.keyChar[66] = "b";
        this.keyChar[67] = "c";
        this.keyChar[68] = "d";
        this.keyChar[69] = "e";
        this.keyChar[70] = "f";
        this.keyChar[71] = "g";
        this.keyChar[72] = "h";
        this.keyChar[73] = "i";
        this.keyChar[74] = "j";
        this.keyChar[75] = "k";
        this.keyChar[76] = "l";
        this.keyChar[77] = "m";
        this.keyChar[78] = "n";
        this.keyChar[79] = "o";
        this.keyChar[80] = "p";
        this.keyChar[81] = "q";
        this.keyChar[82] = "r";
        this.keyChar[83] = "s";
        this.keyChar[84] = "t";
        this.keyChar[85] = "u";
        this.keyChar[86] = "v";
        this.keyChar[87] = "w";
        this.keyChar[88] = "x";
        this.keyChar[89] = "y";
        this.keyChar[90] = "z";
    }
}

onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keyboard.keyCodes[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
    keyboard.update();
}