(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };
	
    ext.grab = function(name, id, callback){
		$.getJSON('http://crossorigin.me/http://scratch.mit.edu/varserver/' + id, function(json){
			console.log(json);
			for (var i=0; i<json['variables'].length; i++){
				console.log(json['variables'][i])
				if (json['variables'][i]['name'] == "? " + name){
					console.log(json['variables'][i]['name']);
					callback(json['variables'][i]["value"]);
				}
			}
		
		});
	};	

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };


    ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', '?%s from fm ID %n', 'grab'],
            ['R', 'temperature in %s', 'get_temp', 'Hong Kong'],
            ['w', 'wait for random time', 'wait_random'],
            // Block type, block name, function name, param1 default value, param2 default value
            ['r', '%n ^ %n', 'power', 2, 3],			
        ]
    };

    // Register the extension
    ScratchExtensions.register('fmSampleExt', descriptor, ext);
})({});