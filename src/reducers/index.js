import { combineReducers } from 'redux'
import defaultFlag from './../assets/images/default.jpg';

const markerPosition = {
    position: {
        lat: -10000000,
        lng: -102.29
    }
};

const locationDefault = {
    name: "",
    flag: defaultFlag,
    country: "No Country",
    temp: "",
    weather: "",
    iconId: "200"
}

const locationReducer = (location = locationDefault, action) => {
    if (action.type === 'UPDATE_LOCATION') {
        location = Object.assign({}, action.payload);
    }
    return location;
};

const markerReducer = (marker = markerPosition, action) => {
    if (action.type === 'UPDATE_MARKER') {
        marker = Object.assign({}, action.payload);
    }
    return marker;
};

export default combineReducers({
    marker: markerReducer,
    location: locationReducer
});