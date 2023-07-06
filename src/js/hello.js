
 //получение списка НЕРАБОЧИХ конденсаторов

fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/alpha_cell/battery')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}

			// Examine the text in the response  
			response.json().then(function (data) {
				console.log(data)
				for (let i = 0; i < 64; i ++){
					if (data.alpha_cell.battery.capacitors[i].is_on == false){
						console.log(data.alpha_cell.battery.capacitors[i].name)
					}
					else break
				}
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	}
);
fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/theta_cell/battery')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}

			// Examine the text in the response  
			response.json().then(function (data) {
				console.log(data)
				for (let i = 0; i < 64; i++) {
					if (data.theta_cell.battery.capacitors[i].is_on == false) {
						console.log(data.theta_cell.battery.capacitors[i].name)
					}
					else break
				}
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	});

// получение списков СВОБОДНЫХ ремонтных бригад

fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/repair/team/alpha_team')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				if (data.is_busy == false){
					console.log(data.name)
				}		
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	}
);
fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/repair/team/beta_team')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				if (data.is_busy == false) {
					console.log(data.name)
				}		
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	}
);
fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/repair/team/gamma_team')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				if (data.is_busy == false) {
					console.log(data.name)
				}		
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	}
);
fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/repair/team/delta_team')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				if (data.is_busy == false) {
					console.log(data.name)
				}		
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	}
);
fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/repair/team/epsilon_team')
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				if (data.is_busy == false) {
					console.log(data.name)
				}
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	}
);
