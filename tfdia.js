function TFDia (c) {
    if (c.getContext) // throw exception
        this.ctx = c.getContext('2d');
    else
        console.log("Canvas not supported");
        
    this.width = c.width;
    this.height = c.height;
    this.tfCount = 25;
    this.debug = true;
    
    this.w = c.width;
    this.h = c.height;
    
    this.max = 100;
    this.data = [10, 20, 30, 40, 50, 70, 80, 10, 30, 20, 40, 20, 30, 35, 70, 60, 20, 50, 70, 100, 10, 5, 10, 35, 20];
}

TFDia.prototype.draw = function() {
    c = this.ctx;
    c.globalAlpha = 0.5;
    
    //---- DRAW TF LINES ----
    for(var i=0; i < this.tfCount; i++) {
        c.save();
            c.translate(this.width/2, this.height/2);
            var rot = (((2*Math.PI)/360) * (360/this.tfCount)) * i;
                if (this.debug) this.log(rot);
            //c.translate(this.width / 2, this.height / 2);
            c.rotate(rot);
            c.translate(-this.width/2, -this.height/2);
            
            c.beginPath();
            c.moveTo(this.width/2, this.height/2);
            c.lineTo(this.width/2, this.height-this.height*0.9);
            
            c.strokeStyle = "#888";
            c.stroke();
            
            //---- DRAW TEXT ----
            if (this.w > 100 && this.h > 100) {
                c.save();
                    c.translate(this.width/2, this.height-this.height*0.9);
                    var rot = Math.PI/2;
                        if (this.debug) this.log(rot);
                    //c.translate(this.width / 2, this.height / 2);
                    c.rotate(rot);
                    c.translate(-this.width/2, -1 * (this.height-this.height*0.9));
                    c.font = "15px bold";
                    c.fillText("bla" + i, this.width/2, this.height-this.height*0.9);
                c.restore();
            }
        c.restore();
    }
    
    //---- DRAW TF VALUES ----
    c.beginPath();
        c.moveTo(this.width/2, this.height/2);
        var sX, sY = 0;
        for(var i=0; i < this.tfCount; i++) {
            var d = this.data[i];
            var m = ((d*100)/(this.max))/100;
            var angle = ((((2 * Math.PI)/360) * (360/this.tfCount)) * i);
            var x = (this.width/2 + (m * ((this.height / 2 * 0.8)) * Math.cos(-Math.PI/2 + angle)));
            var y = (this.height/2 + (m * ((this.height / 2 * 0.8)) * Math.sin(-Math.PI/2 + angle)));
            
            if (i == 0) {
                sX = x;
                sY = y;
            }
            
            c.lineTo(x, y);
        }
        c.lineTo(sX, sY);
    c.fill();
}

TFDia.prototype.log = function(msg) {
    console.log(msg);
}

TFDia.prototype.cursor = function(c) {
    c.save();
       c.fillStyle = "rgba(200,200,200,0.3)";
       c.fillRect(0, 0, this.width/3, this.height/3);
        c.beginPath();
            c.moveTo(0,0);
            c.lineTo(this.width, this.height);
            c.moveTo(this.width,0);
            c.lineTo(0, this.height);
            c.strokeStyle = "#000";
        //c.closePath();
        c.stroke();
    c.restore();
}

TFDia.prototype.genTestData = function() {
    for (var i=0; i < this.tfCount; i++) {
        this.data[i] = this.getRandom(0, this.max);
    }
}

TFDia.prototype.getRandom = function(min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
 
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}