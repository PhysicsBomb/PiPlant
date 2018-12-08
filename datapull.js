console.log("Hey yanga hoy yanga hey yang yang");

function getFile(name) {
  if(this['window']) { // then we're in a browser.
    return (fetch(name).then(a => a.json()))
  }


	// we're in node
	return new Promise((resolve, reject) => { resolve(require(name))})

}
var chart = new Chartist.Line('.venkat', data, options);

// async function _() {
//   let json = await getFile('./bs4.json')
//   console.log(json.humidity)
//   // console.log(my_obj.temperature);
// }
// _().then().catch(console.error)

async function updateChart() {

}

async function createChart() {
	const json = await getFile('./bs4.json')
	console.log(json)
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


}
