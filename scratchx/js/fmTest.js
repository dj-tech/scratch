(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.myCmd_Call = function() {
        // Code that gets executed when the block is run
		//alert("I am an alert box!");
		console.log("I am called");
		console.log(myMother.lastName);

    };

	function person(firstName,lastName,age,eyeColor) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.eyeColor = eyeColor;
    this.changeName = function (name) {
        this.lastName = name;
		}
	}

	var myMother = new person("Sally","Rally",48,"green");


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'myCmd', 'myCmd_Call'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('fmTest', descriptor, ext);
})({});