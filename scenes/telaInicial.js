class Scene01 extends Phaser.Scene{
    constructor(){
            super({key: "Scene01"});
        };
    
    preload(){
        this.load.image('bg', '../assets/bg.jpg');

    };
    create(){
        this.add.image(450, 300, 'bg').setScale(1.9);
        this.add.text(30, 150, "Clique para começar", {fill: '	#fffff2', fontSize: '40px'});
        this.input.on('pointerdown',() => {
            this.scene.stop('Scene01'),
            this.scene.start('Scene02');
    })
    };
    
};