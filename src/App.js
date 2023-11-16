import React from "react"
import Hello from "./js/hello";
class App extends React.Component {
	render() {
		return (
			<div className="App">
				<header className="Hello-header">
					<p>
						Добро пожаловать в наблюдательный центр, штурмовик!
					</p>
				</header>
				<div>
					<Hello />
				</div>
			</div>
		);
	}
}

export default App;
