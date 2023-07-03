// console.log("hello")
// console.log("world")

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
// 				console.log(data);
// 			});
// 		}
// 	)
// 	.catch(function (err) {
// 		console.log('Fetch Error :-S', err);
// 	});


// fetch(url, {
// 	method: 'post',
// 	headers: {
// 		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
// 	},
// 	body: 'foo=bar&lorem=ipsum'
// })
// 	.then(json)
// 	.then(function (data) {
// 		console.log('Request succeeded with JSON response', data);
// 	})
// 	.catch(function (error) {
// 		console.log('Request failed', error);
// 	});
fetch("https://deathstarapi-glazynovand.b4a.run/api/v1/repair/stop/alpha_team", { method: "POST", body: "alpha_team" })
	.then(response => response.text())
	.then(console.log('отправили'));