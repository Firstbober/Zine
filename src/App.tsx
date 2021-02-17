import { Switch } from 'solid-js';
import { MatchRoute } from "@rturnq/solid-router";
import './App.css';

import LoginView from "./views/Login";

function App() {
	return (
		<div class="app">
			<Switch fallback={<h1>404</h1>} children={
				<>
					<MatchRoute end children={<LoginView />} />
				</>
			}
			/>
		</div>
	);
}

export default App;
