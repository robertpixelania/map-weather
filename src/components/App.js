import React from 'react'
import GoogleMapsContainer from './GoogleMapsContainer';
import LocationData from './LocationData';

import '../App.css'

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <LocationData />
                <GoogleMapsContainer />
            </div>
        );
    }
}

export default App;