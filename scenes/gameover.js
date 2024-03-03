class Scene03 extends Phaser.Scene{
    constructor(){
            super({key: "Scene03"});
        };
    
    preload(){
        this.load.image('bg', 'assets/bg.jpg');

    };
    create(){
        this.add.image(450, 300, 'bg').setScale(1.9);
        this.add.text(250, 300, "Game Over", {fill: '	#fffff2', fontSize: '50px'});
        this.add.text(250, 400, "aperte para reiniciar", {fill: '	#fffff2', fontSize: '25px'});
        this.input.on('pointerdown',() => {
            this.scene.stop('Scene03'),
            this.scene.start('Scene02');
    })
    };
    
};
