import { Switch } from 'solid-js';
import { MatchRoute } from "@rturnq/solid-router";
import './App.css';

import LoginView from "./views/Login";
import HomeView from "./views/Home";

function App() {
	return (
		<div class="app">
			<Switch fallback={<h1>404</h1>} children={
				<>
					<MatchRoute end children={<HomeView />} />
				</>
			}
			/>
		</div>
	);
}

/*
	<MatchRoute end children={<LoginView />} />
	<MatchRoute path="home" children={<HomeView />} />
*/

export default App;
