
 //получение списка НЕРАБОЧИХ конденсаторов

// fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/alpha_cell/battery')
// 	.then(
// 		function (response) {
// 			if (response.status !== 200) {
// 				console.log('Looks like there was a problem. Status Code: ' +
// 					response.status);
// 				return;
// 			}

// 			// Examine the text in the response  
// 			response.json().then(function (data) {
// 				console.log(data)
// 				for (let i = 0; i < 64; i ++){
// 					if (data.alpha_cell.battery.capacitors[i].is_on == false){
// 						console.log(data.alpha_cell.battery.capacitors[i].name)
// 					}
// 					else break
// 				}
// 			});
// 		}
// 	)
// 	.catch(function (err) {
// 		console.log('Fetch Error :-S', err);
// 	}
// );
// fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/theta_cell/battery')
// 	.then(
// 		function (response) {
// 			if (response.status !== 200) {
// 				console.log('Looks like there was a problem. Status Code: ' +
// 					response.status);
// 				return;
// 			}

// 			// Examine the text in the response  
// 			response.json().then(function (data) {
// 				console.log(data)
// 				for (let i = 0; i < 64; i++) {
// 					if (data.theta_cell.battery.capacitors[i].is_on == false) {
// 						console.log(data.theta_cell.battery.capacitors[i].name)
// 					}
// 					else break
// 				}
// 			});
// 		}
// 	)
// 	.catch(function (err) {
// 		console.log('Fetch Error :-S', err);
// 	});


// получение списков СВОБОДНЫХ ремонтных бригад

fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/repair/teams')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				for (var i in data) {
					var key = i;
					var val = data[i];
					for (var j in val) {
						var sub_key = j;
						if ((j == "is_busy") && (val.is_busy == false) ){
							console.log(key);
						}
					}
				}
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	}
	);
