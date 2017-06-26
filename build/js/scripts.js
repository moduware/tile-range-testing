/* =========== ON PAGE LOAD HANDLER */
document.addEventListener("DOMContentLoaded", function(event) {
	Nexpaq.Header.create('Laser Distance Testing');

});

document.addEventListener('NexpaqAPIReady', function() {
	Nexpaq.API.Module.addEventListener('DataReceived', function(event) {
		// we don't care about data not related to our module
		if(event.module_uuid != Nexpaq.Arguments[0]) return;
		nativeDataUpdateHandler(event.variables.distance);
	});

	document.getElementById('turnLaserOn').addEventListener('click', function() {
		console.log("laser on");
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'TurnOnLaser', []);
	});
	
	document.getElementById('turnLaserOff').addEventListener('click', function() {
		console.log("laser off");
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'TurnOffLaser', []);
	});

	document.getElementById('makeSingleMeasurment').addEventListener('click', function() {
		console.log("single measurment");
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'TakeSingleMeasure', []);
	});
	
	document.getElementById('makeContMeasurment').addEventListener('click', function() {
		console.log("continuous measurment");
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StartContinuousMeasurement', []);
	});

	Nexpaq.API.addEventListener('BeforeExit', beforeExitActions);
});

function beforeExitActions() {
	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'TurnOffLaser', []);
}
