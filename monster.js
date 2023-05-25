var monster_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226" .split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物類別，名叫monster
    constructor(args){//預設值
        this.r = args.r || 100  //設計怪物的主題，如果傳參數args.r來設定怪物大小，沒有傳參數，就已100為主
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量,{x:width/2 , y:heihght}
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數，就會利用亂數(-1,1)抽出x,y軸的移動速度
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false//代表活著
        this.timeum = 0 //延長時間，讓它顯示死亡後的畫面
   }

draw(){//劃出元件
    if(this.dead == false){ 
    push()//重新設定圓點位置
        translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心位置
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
        if(this.mode=="happy"){
            fill(255)
            ellipse(0,0,this.r/2)
            fill(0)
            ellipse(0,0,this.r/3)
        }
        else{
            fill(255)
            arc(0,0,this.r/2,this.r/2,0,PI)
            fill(0)
            arc(0,0,this.r/3,this.r/3,0,PI)
        }
        stroke(this.color)
        strokeWeight(4)
        noFill()
        for(var j=0;j<10;j++){
            rotate(PI/5)
            beginShape()
            for(var i=0;i<30;i++){
                vertex(this.r/2+i,sin(i/5+frameCount*50))
            }
        endShape()
        }
    pop()
    }
    else {//怪物死亡的畫面
        this.timeum= this.timeum+1
        push()
            translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心位置
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            stroke(255)
            line(-this.r/2,0,this.r/2,0)

            stroke(this.color)
        strokeWeight(4)
        noFill()
        for(var j=0;j<10;j++){
            rotate(PI/5)
            line(this.r/2,0,this.r,0)
            
        }
            
        pop()
    }
   
}
update(){//計算出移動元件後的位置
    this.p.add(this.v)
    if(this.p.x<=0 ||this.p.x>=width){ //X軸碰到左邊(<=0),或是碰到右邊(>=width)
        this.v.x= -this.v.x
      }
      if(this.p.y<=0 ||this.p.y>=height){ //Y軸碰到上邊(<=0),或是碰到下邊(>=height)
        this.v.y= -this.v.y //y軸方向,把速度改變

    }
}

isBallInRanger(x,y){
    let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件的中心點)
    if(d<this.r/2){
      return true
    }else{
      return false
    }
  }
}

