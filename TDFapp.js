window.onload = function() {
	
		var userName = "alisonleechapman";
	// instagram data
        var tableName1 = "testletour2";
	// stage location data	
		var tableName2 = "stage_locationstest"
	//creating a layer source with 2 sublayers, per cartodb docs, for better editing of parameters
        var layerSource = {
            
		user_name: userName, // Required
		type: 'cartodb', // Required
		sublayers: [{
			sql: "SELECT * FROM tableName1", // Required
			cartocss: '#testletour2{marker-fill-opacity:0.9;marker-line-color:#FFF;marker-placement:point;marker-line-width:1;marker-type:ellipse;marker-width:10;marker-fill:#3B007F;marker-allow-overlap:true;}',
			interactivity: ["cartodb_id", "username", "Image_url"] // Optional, popup will contain Instagram username and photo
			},
		{
			sql: "SELECT * FROM tableName2", // Required
			cartocss: '#stage_locationstest{marker-fill-opacity:0.9;marker-line-color:#FFF;marker-placement:point;marker-line-width:1;marker-type:ellipse;marker-width:10;marker-fill:#FF5C00;marker-allow-overlap:true;}',
			interactivity: ["cartodb_id", "stage", "dist"] // Optional, popup/hover will include stage number
		},
   
		]
	}
	
	// For storing the sublayers, per CartoDb.js docs
    var sublayers =[];
			
	//create Thunderforest basemap layer
		   var tileUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
			layer = new L.TileLayer(tileUrl, {maxZoom: 18});
	
	//add to map, define map options
		var map = new L.Map("map", {
				center: new L.LatLng(46.2157467, 2.2088257), //France
				zoom: 6
				});
			map.addLayer(layer);
	
	//add layer source to map
		
		cartodb.createLayer(map,layerSource)
        .addTo(map)
        .done(function(layer){
			//layer variable for instagram data
		insta_layer = layer.getSubLayer(1);
		//set interaction
        //insta_layer.setInteraction(true); //instagramlayer
    insta_layer.set({ 'interactivity': ['cartodb_id', 'Image_url', 'username'] }); // need to include at least one column to enable interactivity

    insta_layer.on('featureClick', function(e, latlng, pos, data, subLayerIndex) {
               console.log(e, latlng, pos, data, subLayerIndex);
                }).on('error',function(err){
                    console.log('featureClick error: '+err);
                }); 
				
			  // Set the custom infowindow template defined on the html, as per Hobbit Locations script
		insta_layer.infowindow.set('template', $('#infowindow_template').html());	
		
		//layer variable for stage location data
		stages_layer = layer.getSubLayer(2); 	
		
		//set interaction
		stages_layer.setInteraction(true); //stage locationlayer 
    stages_layer.set({ 'interactivity': ['cartodb_id', 'stage', 'dist'] }); // need to include at least one column to enable interactivity

    stages_layer.on('featureClick', function(e, latlng, pos, data, subLayerIndex) {
                  console.log(e, latlng, pos, data, subLayerIndex);
                }).on('error',function(err){
                    console.log('featureClick error: '+err);
                }); 
		
		// Set the custom infowindow template defined on the html, as per Hobbit Locations script
		stages_layer.infowindow.set('template', $('#infowindow_template').html());		
				
		}).on('error',function(err){
            console.log(err);
        });
		}
