import React from 'react';
import history from './history';
import { Route, Router, Switch } from 'react-router-dom';

import Timeline from './components/Timeline';
import AddNewUser from './components/AddNewUser';
import Default from './components/Default';
import AllUsers from './components/AllUsers';
import ChangesHistory from './components/ChangesHistory';
import Navbar from './components/Navbar';
import ModalMessage from './components/ModalMessage';
import ChangeHistoryOfUser from './components/ChangeHistoryOfUser';

import Slider from './components/slider/Slider';

import './App.css';

const App = () => {
	return (
		<div className="App">
			<Router history={history}>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/add" component={AddNewUser} />
						<Route exact path="/" component={Timeline} />
						<Route exact path="/allusers" component={AllUsers} />
						<Route exact path="/changes" component={ChangesHistory} />
						<Route exact path="/slider" component={Slider} />
						<Route path="/modalMessage/:action/:username/:id" component={ModalMessage} />
						<Route path="/userChangesHistory/:id" component={ChangeHistoryOfUser} />
						<Route component={Default} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
