import React from "react";
import { MemoryRouter, Route } from "react-router";
const minSize = { width: 1024, height: 600 };

import { Window, View, hot } from "@nodegui/react-nodegui";

import Home from "./pages/Home";

class App extends React.Component {
  render() {
	return (
	  <MemoryRouter>
		<Window windowTitle="Zine" minSize={minSize} styleSheet={globalStylesheet}>
		  <View style={containerStyle}>
		 	 <Route exact path="/" component={Home} />
		  </View>
		</Window>
	  </MemoryRouter>
	);
  }
}

const globalStylesheet = `
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const containerStyle = `
	background-color: #121517;
	flex: 1;
	padding: 8px;
	flex-direction: row;
`

export default hot(App);
