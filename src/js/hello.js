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
let flag;
//УДАЛЯТЬ НЕЛЬЗЯ
//получение списка РАБОЧИХ конденсаторов
let q_capacitors = new Queue();
let q_cell = new Queue();
let url1 = 'https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/alpha_cell/battery';
let url2 = 'https://deathstarapi-glazynovand.b4a.run/api/v1/energy/state/theta_cell/battery';
function list_capacitors() {
	fetch(url1)
		.then(
			function (response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
						response.status);
					return;
				}
				response.json().then(function (data) {
					console.log(data)
					for (let i = 0; i < 64; i ++){
						if (data.alpha_cell.battery.capacitors[i].is_on == false){
							// console.log(data.alpha_cell.battery.capacitors[i].name)
							flag = 1;
							if(!q_capacitors.isEmpty){
								//flag = 1;
								for (let j = 0; j < q_capacitors.length; j++){
									if (q_capacitors.find[j] == data.alpha_cell.battery.capacitors[i].name){
										flag = 0;
										break
									}
								}
								if (flag == 1){
									q_capacitors.enqueue(data.alpha_cell.battery.capacitors[i].name);
									q_cell.enqueue('alpha_cell');
								}

							}
							else
							{
								q_capacitors.enqueue(data.alpha_cell.battery.capacitors[i].name);
								q_cell.enqueue('alpha_cell');
							}
						}
					}
					//проверка можно удалить
					// console.log(q_capacitors.length);
					// console.log(q_cell.length)
					// for (let j = 0; j < q_capacitors.length; j++) {
					// 	console.log(q_capacitors.find(j));
					// 	console.log(q_cell.find(j));
					// }
				});
			}
		)
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		}
	)

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
							flag = 1;
							// console.log(data.theta_cell.battery.capacitors[i].name)
							if (!q_capacitors.isEmpty) {
								//flag = 1;
								for (let j = 0; j < q_capacitors.length; j++) {
									if (q_capacitors.find[j] == data.theta_cell.battery.capacitors[i].name){ 
										flag = 0; 
										break
									}
								}
								if (flag == 1){
									q_capacitors.enqueue(data.theta_cell.battery.capacitors[i].name);
									q_cell.enqueue('theta_cell');
								}
							}
							else {
								q_capacitors.enqueue(data.theta_cell.battery.capacitors[i].name);
								q_cell.enqueue('theta_cell');
							}
						}
						//else break
					}
					//проверка 
					//можно удалить
					// console.log(q_capacitors.peek(0));
					// console.log(q_capacitors.length);
					// console.log("q_cell = "+q_cell.length);
					// for (let j = 0; j < q_capacitors.length; j++) {
					// 	console.log(q_capacitors.find(j));
					// 	console.log(q_cell.find(j));
					console.log("yep");
					// }
				});
			}
		)
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		}
	);
}
//list_capacitors();

// //УДАЛЯТЬ НЕЛЬЗЯ
// //получение списков СВОБОДНЫХ ремонтных бригад

let q_teams = new Queue();
function list_brigades(){
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
							if ((j == "is_busy") && (val.is_busy == false) ){
								if (!q_teams.isEmpty) {
									flag = 1;
									for (let j = 0; j < q_teams.length; j++) {
										if (q_teams.find[j] == key){
											flag = 0;
											break
										}
									}
									if (flag == 1) {
										q_teams.enqueue(key);
									}
								}
								else {
									q_teams.enqueue(key);
								}
							}
						}
					}
					// console.log(q_teams.length);
				});
			}
		)
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		}
	);
}
//list_brigades();

// УДАЛЯТЬ НЕЛЬЗЯ
///  отправка ремонтной бригады на объект
let loc;
let t_n;
let c_n;
function fix() {
	while (q_capacitors.length==0) {//пока список пустой обновляем
		list_capacitors()
	}
	while (!q_capacitors.isEmpty){//пока список не пустой
		loc = q_capacitors.dequeue
		while (q_teams.isEmpty) {
			list_brigades();
		}
		t_n = q_teams.dequeue
		c_n = q_cell.dequeue
		fetch("https://deathstarapi-glazynovand.b4a.run/api/v1/repair/start", {
			method: "POST",
			body: { team_name: t_n, cell_name: c_n, location: loc },
		})
			.then(response => response.text())
			.then(console.log('отпавили'));
	
		const req1 = new XMLHttpRequest();
		const data = JSON.stringify({
			"team_name": t_n,
			"cell_name": c_n,
			"location": loc
		});

		req1.open("POST", "https://deathstarapi-glazynovand.b4a.run/api/v1/repair/start");
		req1.setRequestHeader("Content-Type", "application/json");

		req1.send(data);
		req1.onreadystatechange = function () // Ждём ответа от сервера
		{
			if (req1.status == 200) // код 200 (если страница не найдена вернет 404)
			{
				console.log("отправили");; // Выводим ответ сервера
			}
		}
	}
}
fix();
	
// fetch("https://deathstarapi-glazynovand.b4a.run/api/v1/repair/stop/beta_team", { method: "POST", body: "beta_team" })
//  .then(response => response.text())
//  .then(console.log('отозвали'));

