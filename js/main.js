// Phaser and game code here

window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload () {
        // image preload --- you can delete this
        game.load.image('hello', 'assets/hello.png')
    }

    function create () {
        // and this too
        game.add.text(16, 16, 'Hello World!', { fontSize: '32px', fill: '#FFF'});
        game.add.sprite(16, 40, 'hello');
    }

    function update() {}
}