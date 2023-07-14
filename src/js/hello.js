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
//получение списка НЕ РАБОЧИХ конденсаторов
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
					// console.log(data)
					for (let i = 0; i < 65; i ++){
						if (data.alpha_cell.battery.capacitors[i].durability != 100){
							flag = 1;
							if(!q_capacitors.isEmpty){
								for (let j = 0; j < q_capacitors.length; j++) {
									if (q_capacitors.find(j) == data.alpha_cell.battery.capacitors[i].name){
										flag = 0;
										break
									}
								}
								if (flag == 1){
									q_capacitors.enqueue(data.alpha_cell.battery.capacitors[i].name);
									q_cell.enqueue('alpha_cell');
									console.log(data.alpha_cell.battery.capacitors[i].name);
									// console.log(q_capacitors.length)
								}

							}
							else
							{
								q_capacitors.enqueue(data.alpha_cell.battery.capacitors[i].name);
								q_cell.enqueue('alpha_cell');
								console.log(data.alpha_cell.battery.capacitors[i].name);
							}
						}
					}
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
					for (let i = 0; i < 65; i++) {
						if (data.theta_cell.battery.capacitors[i].durability != 100) {
							flag = 1;
							if (!q_capacitors.isEmpty) {
								for (let j = 0; j < q_capacitors.length; j++) {
									if (q_capacitors.find(j) == data.theta_cell.battery.capacitors[i].name){ 
										flag = 0; 
										break
									}
								}
								if (flag == 1){
									q_capacitors.enqueue(data.theta_cell.battery.capacitors[i].name);
									q_cell.enqueue('theta_cell');
									console.log(data.theta_cell.battery.capacitors[i].name);
									// console.log(q_capacitors.length)
								}
							}
							else {
								q_capacitors.enqueue(data.theta_cell.battery.capacitors[i].name);
								q_cell.enqueue('theta_cell');
								console.log(data.theta_cell.battery.capacitors[i].name);
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
}
// list_capacitors();

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
								flag = 1;
								if (!q_teams.isEmpty) {
									for (let j = 0; j < q_teams.length; j++) {
										if (q_teams.find(j) == key){
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
					console.log("свободные бригады "+q_teams.length);
				});
			}
		)
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		}
	);
}

// УДАЛЯТЬ НЕЛЬЗЯ
///  отправка ремонтной бригады на объект

let loc;
let t_n;
let c_n;

setTimeout(() => { list_capacitors() }, 1000);
setTimeout(() => { list_brigades() }, 2000);
setInterval(() => { fix() }, 3000);
function fix() {
	setTimeout(() => { list_capacitors() }, 1000);
	setTimeout(() => { list_brigades() }, 2000);
	for (let j = 0; j < q_capacitors.length;j++ ) {
		
			if (q_teams.length > 0){
				// setInterval(() => { list_brigades() }, 500);
				// setInterval(() => { list_capacitors() }, 5000);
				
				j--;
				loc = q_capacitors.dequeue();
				t_n = q_teams.dequeue();
				c_n = q_cell.dequeue();
				console.log("конденсатор: "+loc +" чинят: "+ t_n + " в блоке: " + c_n);

				const req1 = new XMLHttpRequest();
				const data = JSON.stringify({
					"location": loc,
					"team_name": t_n,
					"cell_name": c_n,
				});

				req1.open("POST", "https://deathstarapi-glazynovand.b4a.run/api/v1/repair/start");
				req1.setRequestHeader("Content-Type", "application/json");
				req1.send(data);
			}

	}
}

// import React from "react"
// class Hello extends React.Component {
// 	render() {
// 	  return (
// 	    <div className="Hello">
// 	      <header className="Hello-header">
// 	        <p>
// 	          Edit <code>src/App.js</code> and save to reload.
// 	        </p>
// 	      </header>
// 				<div>
// 					list_capacitors()
// 				</div>
// 				<div>
// 					list_brigades()
// 				</div>
// 	    </div>
// 	  );
// 	}
// }
	

// export default Hello;