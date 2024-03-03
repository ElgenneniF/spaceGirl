//variaveis que serão utilizadas
var player;
var plataforma1;
var posicaoP1;
var plataforma2;
var posicaoP2;
var plataforma3;
var posicaoP3;
var hitboxchao;
var teclado; 
var estrela;
var placar;
var posicaoEstrelaX = [];
var posicaoEstrelaY = [];
var pontuação = 0;
var playernoChao; 
var numeroAleatorio;

class Scene02 extends Phaser.Scene{
    constructor(){
            super({key: "Scene02"});
        };
    
    preload(){
       //assets
        this.load.image('bg', 'assets/bg.jpg');
        this.load.image('plataforma', 'assets/plataforma.png')
        this.load.spritesheet('madeline', 'assets/madeline.png', { frameWidth: 40, frameHeight: 48 });
        this.load.spritesheet('estrela', 'assets/strelinha.png', { frameWidth: 336, frameHeight: 272})
    };
    create(){
        teclado = this.input.keyboard.createCursorKeys();
        //background
        this.add.image(450, 300, 'bg').setScale(1.9);
        //hitbox do final da tela
        hitboxchao = this.physics.add.staticImage(450, 600, 'plataforma').setSize(90000, 10).setScale(0.15).setVisible(false);
        
        //plataformas
        plataforma1 = this.physics.add.sprite(700, 100, 'plataforma').setSize(1600, 400).setScale(0.1);
        plataforma1.setCollideWorldBounds(true);        
            //faz a plataforma desaparecer embaixo da tela e reaparecer no topo
        this.physics.add.overlap(plataforma1, hitboxchao, () =>{
            plataforma1.setVisible(false);
        
            posicaoP1 = Phaser.Math.RND.between(620, 800);
            plataforma1.setPosition(posicaoP1, -10);
            plataforma1.setVelocityY(50);
            plataforma1.setVisible(true);
            
        });
        //faz a plataforma não ser empurrada ou perder velocidade
        plataforma1.setPushable(false);
        //seta uma velocidade maxima para plataforma
        plataforma1.setMaxVelocity(120);

        plataforma2 = this.physics.add.sprite(400, 400, 'plataforma').setSize(1600, 400).setScale(0.1).setFlip(true);
        plataforma2.setCollideWorldBounds(true);
            //faz a plataforma desaparecer embaixo da tela e reaparecer no topo
        this.physics.add.overlap(plataforma2, hitboxchao, () =>{
            plataforma2.setVisible(false);
        
            posicaoP2 = Phaser.Math.RND.between(320, 600);
            plataforma2.setPosition(posicaoP2, 0);
            plataforma2.setVelocityY(70);
            plataforma2.setVisible(true);
            
        });
         //faz a plataforma não ser empurrada ou perder velocidade
        plataforma2.setPushable(false);
        //seta uma velocidade maxima para plataforma
        plataforma2.setMaxVelocity(50);

        plataforma3 = this.physics.add.sprite(100, 500, 'plataforma').setSize(1600, 400).setScale(0.1).setFlip(true);
        plataforma3.setCollideWorldBounds(true);
        //faz a plataforma desaparecer embaixo da tela e reaparecer no topo
        this.physics.add.overlap(plataforma3, hitboxchao, () =>{
            plataforma3.setVisible(false);
        
            posicaoP3 = Phaser.Math.RND.between(10, 300);
            plataforma3.setPosition(posicaoP3, 0);
            plataforma3.setVelocityY(100);
            plataforma3.setVisible(true);
            
        });
         //faz a plataforma não ser empurrada ou perder velocidade
        plataforma3.setPushable(false);
        //seta uma velocidade maxima para plataforma
        plataforma3.setMaxVelocity(120);
        
        //placar
        placar = this.add.text(240, 50, 'estrelas:' + pontuação, {fill: '#fffff2', fontSize: '40px'});
        
        //jogador
        player = this.physics.add.sprite(400, 300, 'madeline');
        player.setCollideWorldBounds(true);
            //cria uma "resistencia do ar"
        player.setDamping(true);
        player.setDragX(0.3);
        //animação do jogador
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('madeline', { start:0, end:4 }),
            frameRate: 8,
            repeat: -1
        });
        //colisão do player com as plataformas
        this.physics.add.collider(player, plataforma1, function(){
                playernoChao = true
            });
        this.physics.add.collider(player, plataforma2, function(){
                playernoChao = true
            });
        this.physics.add.collider(player, plataforma3, function(){
                playernoChao = true
        });
        //colisão do player com o final da tela
        this.physics.add.overlap(player, hitboxchao, () =>{
            pontuação = 0;
            this.scene.stop('Scene02'),
            this.scene.start('Scene03');
        
            
            
        });
        
        
        //estrelas
        estrela = this.physics.add.sprite(450, 400, 'estrela').setScale(0.2)
        //animação da estrela
        this.anims.create({
            key: 'piscar',
            frames: this.anims.generateFrameNumbers('estrela', { start:0, end:4 }),
            frameRate: 6,
            repeat: -1
        });
        //deixa a animação em loop
        estrela.anims.play('piscar', true)
        //faz a estrela ficar parada
        estrela.setMaxVelocity(0)
        //pega um numero aleatório e adiciona na lista de possiveis possições da estrela, tanto no eixo X quando no Y
        for (var i = 0; i < 5; i++) {
    numeroAleatorio = Phaser.Math.RND.between(50, 850);
    posicaoEstrelaX.push(numeroAleatorio);
    numeroAleatorio = Phaser.Math.RND.between(50, 550);
    posicaoEstrelaY.push(numeroAleatorio);
}
        //coletar estrelas
        this.physics.add.overlap(player, estrela, function(){
        estrela.setVisible(false);
        estrela.setPosition(Phaser.Math.RND.pick(posicaoEstrelaX), Phaser.Math.RND.pick(posicaoEstrelaY));
        
        pontuação += 1;
        placar.setText('estrelas:' + pontuação);

        estrela.setVisible(true);

    });
        
       
   
   
    };
    update(){
        //movimento na horizontal
        if(teclado.left.isDown && teclado.right.isDown){
            //quando as duas teclas são pressionada, o player para
            player.setVelocityX(0);
            player.anims.play('andar', false)
        //anda pra esquerda
        }else if(teclado.left.isDown){        
            player.setFlip(true);     
            player.anims.play('andar', true)
            player.setVelocityX(-200);
            
        //anda pra direita
        }else if (teclado.right.isDown){                  
            player.setFlip(false);
            player.anims.play('andar', true)
            player.setVelocityX(200);
           
            //deixa o player sem animação caso não aperte nem uma tecla
        }else {
            player.anims.play('andar', false)
           };
           
           //adiciona um pulo
        if(teclado.up.isDown && playernoChao == true){
            player.setVelocityY(-300);
            playernoChao = false
         
            }
           //deixa o player flutuando
        else if(teclado.space.isDown){
                player.setVelocityY(30);
                
             
                }
             //deixa o player descer mais rapido
        else if(teclado.down.isDown){
            player.setVelocityY(400);
        }

    };
};
