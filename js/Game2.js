var TopDownGame = TopDownGame || {};

// title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
	create: function() {
		this.map = this.game.add.tilemap('level1');
		/* 
		   the first parameter is the tileset 
		   name as specified in Tiled, 
		   the second is the key to the asset 
		*/
		this.map.addTilesetImage('tiles', 'gameTiles');

		// create layer
		this.backgroundlayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');

		// collision on blockedLayer
		this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

		//resizes the game world to match the layer dimensions
		this.backgroundlayer.resizeWorld();
	},
	createItems: function() {
		this.items = this.game.add.group();
		this.items.enableBody = true;
		var item;
		result = this.findObjectByType('item', this.map, 'obj')
	},
	findObjectByType: function (type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element) {
			if(element.properties.type === type) {
				element.y -= map.tileHeight;
				result.push(element);
			}
		});
		return result;
	},
	createFromTiledOBject: function(element, group) {
		var sprite = group.create(element.x, element.y, element.properties.sprite);

			Object.keys(element.properties).forEach(function(key) {
				sprite[key] = element.properties[key];
			});
	}
}