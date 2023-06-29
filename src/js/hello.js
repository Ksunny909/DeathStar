console.log("hello")
console.log("world")
function showThemes(subject_name) {

	const req1 = new XMLHttpRequest();

	req1.withCredentials = false;
	req1.open("GET", "https://deathstarapi-glazynovand.b4a.run/api/v1/repair/teams");
	req1.setRequestHeader("Content-Type", "application/json");

	req1.send(data);
}