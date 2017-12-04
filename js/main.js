//window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload () {

            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        }
        // Variables
        var platforms, player, cursors, stars, scoreText;
        var score = 0;

        function create () {
            //  --- Ground and Platforms ---
            // Arcade Physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);
            // Background
            game.add.sprite(0, 0, 'sky');
            // platforms
            platforms = game.add.group();
            // enable physics for objects in group
            platforms.enableBody = true;
            // create Ground
            var ground = platforms.create(0, game.world.height - 64, 'ground');
            // scale ground to fit the game width
            ground.scale.setTo(2, 2);
            // stop ground fading when player action is taken (e.g: jumping)
            ground.body.immovable = true;
            // create ledges
            var ledge = platforms.create(400, 400, 'ground');

            ledge.body.immovable = true;

            ledge = platforms.create(-150, 250, 'ground');

            ledge.body.immovable = true;

            //  --- Player ---
            player = game.add.sprite(32, game.world.height - 150, 'dude');

            // player physics
            game.physics.arcade.enable(player);

            // players physics properties
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 300;
            player.body.collideWorldBounds = true;

            // player walking animations
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);

            // --- Stars ---
            stars = game.add.group();

            stars.enableBody = true;

            // We will create 12 stars evenly spaced apart
            for (var i = 0; i < 12; i++)
            {
                // Create a star inside of the 'stars' group
                var star = stars.create(i * 70, 0, 'star');

                // Let gravity do its thing
                star.body.gravity.y = 6;

                // This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }

            // --- Score Text ---
            scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});

        }

        function update () {
            
            // collision detection for player and stars
            var hitPlatform = game.physics.arcade.collide(player, platforms);
            game.physics.arcade.collide(stars, platforms);

            game.physics.arcade.overlap(player, stars, collectStar, null, this);

            function collectStar (player, star) {
                // Remove Star (removes the star from the screen)
                star.kill();

                // Add and update the score
                score += 10;
                scoreText.text = 'Score: ' + score;
            }

            cursors = game.input.keyboard.createCursorKeys();

            // reset player velocity (movement)
            player.body.velocity.x = 0;

            if(cursors.left.isDown)
            {
                // move to the left
                player.body.velocity.x = -150;

                player.animations.play('left');
            }
            else if (cursors.right.isDown)
            {
                // move to the right
                player.body.velocity.x = 150;

                player.animations.play('right');
            }
            else
            {
                // Stand Still
                player.animations.stop();

                player.frame = 4;
            }

            // Allow player to jump if they are touching the ground.
            if (cursors.up.isDown && player.body.touching.down && hitPlatform)
            {
                player.body.velocity.y = -350;
            }

        }
    //};