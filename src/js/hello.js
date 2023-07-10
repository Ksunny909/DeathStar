//очередь
class Queue {
	constructor() {
		this.elements = {};
		this.head = 0;
		this.tail = 0;
	}
	enqueue(element) {
		this.elements[this.tail] = element;
		this.tail++;
	}
	dequeue() {
		const item = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;
		return item;
	}
	peek() {
		return this.elements[this.head];
	}
	get length() {
		return this.tail - this.head;
	}
	get isEmpty() {
		return this.length === 0;
	}
	find(number) {
		let n = this.head + number
		return this.elements[n];
	}
}

//УДАЛЯТЬ НЕЛЬЗЯ
 //получение списка НЕРАБОЧИХ конденсаторов
let q_capacitors = new Queue();
let url1 = 'https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/alpha_cell/battery';
let url2 = 'https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/theta_cell/battery';

fetch(url1)
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				// console.log(data)
				for (let i = 0; i < 64; i ++){
					if (data.alpha_cell.battery.capacitors[i].is_on == true){
						// console.log(data.alpha_cell.battery.capacitors[i].name)
						q_capacitors.enqueue(data.alpha_cell.battery.capacitors[i].name);
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
fetch(url2)
	.then(
		function (response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}
			response.json().then(function (data) {
				// console.log(data)
				for (let i = 0; i < 64; i++) {
					if (data.theta_cell.battery.capacitors[i].is_on == true) {
						// console.log(data.theta_cell.battery.capacitors[i].name)
						q_capacitors.enqueue(data.theta_cell.battery.capacitors[i].name);
					}
					else break
				}
				//проверка 
				//можно удалить
				// console.log(q_capacitors.peek(0));
				// console.log(q_capacitors.find(4));
				// console.log(q_capacitors.find(1));
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	});

//УДАЛЯТЬ НЕЛЬЗЯ
// получение списков СВОБОДНЫХ ремонтных бригад
// let q_teams = new Queue();
// fetch('https://deathstarapi-glazynovand.b4a.run/api/v1/repair/teams')
// 	.then(
// 		function (response) {
// 			if (response.status !== 200) {
// 				console.log('Looks like there was a problem. Status Code: ' +
// 					response.status);
// 				return;
// 			}
// 			response.json().then(function (data) {
// 				for (var i in data) {
// 					var key = i;
// 					var val = data[i];
// 					for (var j in val) {
// 						if ((j == "is_busy") && (val.is_busy == false) ){
// 							console.log(key);
// 							q_teams.enqueue(key);
// 						}
// 					}
// 				}
// 				console.log(q_teams.length);
// 			});
// 		}
// 	)
// 	.catch(function (err) {
// 		console.log('Fetch Error :-S', err);
// 	}
// 	);


//УДАЛЯТЬ НЕЛЬЗЯ
//пока код не рабочий
/// отправка ремонтной бригады на объект


// fetch("https://deathstarapi-glazynovand.b4a.run/api/v1/repair/start", {
// 	method: "POST",

// 	body: { team_name: "alpha_team", cell_name: "alpha_cell", location: ".battery.capacitors[0]" },
// })
// 	.then(response => response.text())
// 	.then(console.log('отпавили'));


// fetch("https://deathstarapi-glazynovand.b4a.run/api/v1/repair/start", {
// 	method: "POST", body: {
// 		"team_name": "alpha_team",
// 		"cell_name": "alpha_cell",
// 		"location": alpha_cell.battery.capacitors[0].name=="Capacitor-eefb3e29-a170-464d-9bad-e6ed76c64394"
// 	}
// })
// 	.then(response => response.text())
// 	.then(console.log('отправили'));
	
// fetch("https://deathstarapi-glazynovand.b4a.run/api/v1/repair/stop/alpha_team", { method: "POST", body: "unbusy_team" })
//  .then(response => response.text())
//  .then(console.log('отозвали'));

