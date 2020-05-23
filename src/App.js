import React from 'react';
import './res/css/App.css';

import store from './redux/store'
import { Provider } from 'react-redux'
import LocationInput from './components/LocationInput';
import {HashRouter ,Route} from 'react-router-dom'
import WeatherContent from './components/WeatherContent'
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Route exact path={['/', '/:location']} component={WeatherContent}/>
        </div>
      </HashRouter>
    </Provider>

  );
}

export default App;
