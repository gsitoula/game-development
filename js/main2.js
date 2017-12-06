// Phaser and game code here

window.onload = function() {
    /*
        By creating all the game objects inside a parent object 
        called TopDownGame (this is what’s called the namespace pattern) 
        we don’t pollute the global scope with our game elements. 
        ---------------------------------------------------------
        If TopDownGame exists, then use it, if it doesn’t exist 
        then initiate it as an empty object.
    */
    var TopDownGame = TopDownGame || {};
    
    TopDownGame.game = new Phaser.Game(160, 160, Phaser.AUTO, ''); 

    TopDownGame.game.state.add('Boot', TopDownGame.Boot);
    TopDownGame.game.state.add('Preload', TopDownGame.Preload);
    TopDownGame.game.state.add('Game', TopDownGame.Game);

    TopDownGame.game.state.start('Boot');
}