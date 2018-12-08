console.log("Hey yanga hoy yanga hey yang yang");
function getFile(name) {
	if(this['window']) {
		return (fetch(name).then(a => a.json()))
	}
	return new Promise((resolve, reject) => {resolve(require(name))})
}


async function _() {
	let bs4_json = await getFile('./bs4.json')
	let pi_json = await getFile('./pi_data.json')
		temp_para = parseInt(bs4_json.temperature)
		inttemp_para = parseFloat(pi_json.int_temp)
	loc = bs4_json.location
	document.getElementByID("location").innerHTML = loc
	weather = bs4_json.weather
	document.getElementByID("weather").innerHTML = weather
	time = bs4_json.time
	document.getElementByID("datetime").innerHTML = time
	humidity = bs4_json.humidity
	document.getElementByID("humidity").innerHTML = humidity
	temp_rating = bs4_json.temp_rating
	if (temp_rating=="good") {
		document.getElementByID("rating").innerHTML = "Your plant appreciates you. Hopefully."
	}
	else if(temp_rating=="hot") {
		document.getElementByID("rating").innerHTML = "Your plant would appreciate you more if you "
	}
	else {
		document.getElementByID("rating").innerHTML = "Your plant would appreciate you more if you raised the temperature"
	}
		createChart(temp_para); //graph external temp
		createChart2(inttemp_para);
}
_().then().catch(console.error)


function createChart(temp_para) {
	var data = {
			labels: ['1', '2', '3', '4', '5'],
			series: [
				[10, 17, 29, 37, temp_para]
			]
	};

	var options = {
		width: '300px',
		height: '200px',
		low: 0,
		showArea: true,
		showPoint: true
		axisX: {
			showLabel: false
		}
	};

	var chart = new Chartist.Line('.venkat', data, options);
}

function createChart2(inttemp_para) {
	var data = {
			labels: ['1', '2', '3', '4', '5'],
			series: [
				[25, 37, 10, 26, inttemp_para]
			]
	};

	var options = {
		width: '300px',
		height: '200px',
		low: 0,
		showArea: true,
		showPoint: true,
		axisX: {
			showLabel: false
		}
	};

	var chart = new Chartist.Line('.rohan', data, options);
}
