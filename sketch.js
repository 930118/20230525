let points = [[-1, 17], [1,17], [13, 5],[14,3],[13,1],[1,-7],[2,-8],[1,-9],[1,-12],[4,-18],[-1,-12],[-1,-9],[-2,-8],[-1,-7],[-13,1],[-14,3], [-13,5],[-1,17],[1,17],[1,17]];

var fill_colors= "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226" .split("-").map(a=>"#"+a)
var line_colors = "606c38-283618-fefae0-dda15e-bc6c25" .split("-").map(a=>"#"+a)

//畫point所有點的物件設定-------------------------------------
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[]
//畫point所有點的物件設定-------------------------------------


//飛彈物件的定義---------------------------------------
var bullet  //目前要處理的物件暫時放在bullet變數內
var bullets = []
//飛彈物件的定義---------------------------------------

var monster  //目前要處理的物件暫時放在bullet變數內
var monsters = []

var shipP

var score = 0

function preload(){
  fish_sound = loadSound("sound/bubble.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)//預設砲台的位置(width/2,height/2)
  for(var i=0;i<30;i=i+1){
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball物件放入ball陣列內
  }
  for(var i=0;i<30;i=i+1){
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball物件放入ball陣列內
  }
}

function draw() {
  background(220);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball= balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  if(keyIsPressed){
    if(key=="ArrowLeft"||key=="a"){//按下鍵盤的往左鍵或A鍵
      shipP.x = shipP.x -5
    }
    if(key=="ArrowRight"||key=="d"){//按下鍵盤的往右鍵或D鍵
      shipP.x = shipP.x +5
    }
    if(key=="ArrowUp"||key=="w"){//按下鍵盤的往上鍵或W鍵
      shipP.y = shipP.y -5
    } 
    if(key=="ArrowDown"||key=="s"){//按下鍵盤的往下鍵或S鍵
      shipP.y = shipP.y +5
    }
  }
  //魟魚的顯示
  for(let ball of balls) 
  {
    ball.draw()
    ball.update()
    //++++由此判斷每一隻魟魚有沒有接觸每一個子彈+++
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有接觸現在的ball
       
        balls.splice(balls.indexOf(ball),1) //讓魟魚從魟魚倉庫移除
        bullets.splice(balls.indexOf(bullet),1)//讓子彈從子彈倉庫移除
        score = score - 1//打到魟魚-1分
        fish_sound.play()//打到魟魚播出的聲音
    }
  }
  }

  
  for(let bullet of bullets) //針對子彈倉庫內的資料，一筆一筆的顯示出來
  {
    bullet.draw()
    bullet.update()
  }
//怪物的顯示
  for(let monster of monsters) //只要是列陣的方式，都可以利用此方式處裡
  {
    if(monster.dead == true){
      monsters.splice(monsters.indexOf(monster),1)//讓它消失不見
    }
    if(monster.IsDead && monster.timenum>=6){
      monsters.splice(monsters.indexOf(monster),1)//讓怪物從怪物倉庫內移除
    }
    monster.draw()
    monster.update()
//+++由此判斷每隻怪物有沒有接觸每個子彈+++
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
        //monsters.splice(monsters.indexOf(monster),1)
        bullets.splice(bullets.indexOf(bullet),1)
        monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
        score = score +1
        monster.dead = true//代表死掉
      }

    }
  }

  textSize(50)
  text (score,50,50)
  push()//重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    fill("#FF8F59")
    noStroke()
    rotate(angle)
    triangle(-25,-25,-25,25,50,0) //設定三個點,畫成一個三角形
    ellipse(0,0,50)
   
  pop()//恢復原本的設定,原點(0,0)在視窗的左上角
}


//在物件上按下滑鼠，物件消失不見，分數加一分
function mousePressed(){

  //++++++++++++產生一個物件
    // ball = new Obj({//產生一個Obj class元件
    //   p:{x:mouseX,y:mouseY}})
    // balls.push(ball) //把ball物件放入ball陣列內
  //+++++++++++++++
  // for(let ball of balls){
  //   if(ball.isBallInRanger()){
  //     balls.splice(balls.indexOf(ball),1)
  //     score = score + 1
  //   }
  // }

  //按一下產生飛彈
  bullet = new Bullet({
  r:10
  })
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){//按下空白建，發射飛彈，其實跟按下的滑鼠功能一樣
    bullet = new Bullet({})//在滑鼠按下的地方，產生新的Bullet class
    bullets.push(bullet)//把bullet的物件放入到bullet陣列內(丟到倉庫)
    bullet_sound.play()
  }
 
}