import "solid-js";
import { render } from 'solid-js/web';
import './css/index.css';
import App from './App';
import { Router, pathIntegration } from '@rturnq/solid-router';

render(() => (
	<Router integration={pathIntegration()}>
		<App />
	</Router>
), document.getElementById('root') as Node);