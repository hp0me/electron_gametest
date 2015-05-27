enchant();

window.onload = function(){
    var winSize = [320,320];
    var game = new Core(winSize[0],winSize[1]);
    var gameOverOnce = 0;
    game.fps = 60;
    game.preload("ball.png","block.png","board.png");

    var ball,player;
    var blocks = [];

    game.onload = function(){


        var Ball = enchant.Class.create(enchant.Sprite, {
            initialize: function(x, y) {
                enchant.Sprite.call(this, 15, 15);
                this.x = x;
                this.y = y;
                this.vel = [5,5];
                this.scale(1,1);
                this.image = game.assets['ball.png'];
                game.rootScene.addChild(this);
                this.addEventListener('enterframe', function() {
                    this.move();
                    this.collision();

                });
            },
            move:function(){
                this.x += this.vel[0];
                this.y += this.vel[1];
            },

            //当たり判定
            collision:function(){
                if(this.intersect(player)) {
                    this.vel[1] *= -1;
                }

                if(this.x < 0 || this.x > winSize[0]){
                    this.vel[0] *= -1;
                }

                if(this.y < 0){
                    this.vel[1] *= -1;
                }

                if(this.y > winSize[1]){
                    if(gameOverOnce == 0)alert("gameover");
                    gameOverOnce = 1;
                }

                for(var i = 0; i<blocks.length;i++){
                    if(this.intersect(blocks[i])) {
                        game.rootScene.removeChild(blocks[i]);
                        delete(blocks[i]);
                        this.vel[0] *= -1;
                        this.vel[1] *= -1;
                    }
                }

            }

        });

        var Player = enchant.Class.create(enchant.Sprite, {
            initialize: function(x, y) {
                enchant.Sprite.call(this,105, 15);
                this.x = x;
                this.y = y;
                this.speed = 4;
                this.vel = [1,1];
                this.scale(1,1);
                this.image = game.assets['board.png'];
                game.rootScene.addChild(this);
                this.addEventListener('enterframe', function() {
                    if (game.input.right) {
                        this.x += this.speed;
                    }
                    if (game.input.left) {
                        this.x -= this.speed;
                    }
                });
            }

        });

        var Block = enchant.Class.create(enchant.Sprite, {
            initialize: function(x, y) {
                enchant.Sprite.call(this,35, 15);
                this.x = x;
                this.y = y;
                this.scale(1,1);
                this.image = game.assets['block.png'];
                game.rootScene.addChild(this);
            }

        });



        ball = new Ball(30,130);
        player = new Player(100,300);

        for(var x=0;x<7;x++){
            for(var y=0;y<5;y++){
                var block = new Block(x*40 + 20,y*20 + 10);
                blocks.push(block);
            }
        }

    };
    game.start();
};
