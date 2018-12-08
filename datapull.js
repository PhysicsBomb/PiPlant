console.log("Hey yanga hoy yanga hey yang yang");
function getFile(name) {
	if(this['window']) {
		return (fetch(name).then(a => a.json()))
	}
	return new Promise((resolve, reject) => {resolve(require(name))})
}

async function _() {
	let json = await getFile('./bs4.json')
		console.log(json.humidity)
}
_().then().catch(console.error)
function createChart() {
	var data = {
			labels: ['1', '2', '3', '4'],
			series: [
				[10, 17, 19, 14]
			]
	};
	
	var options = {
		width: '300px',
		height: '200px',
		low: 0,
		showArea: true,
		showPoint: true
	};
	
	var chart = new Chartist.Line('.venkat', data, options);
}