import React from 'react'
import { connect } from 'react-redux'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import axios from 'axios';
import { selectLocation, updateMarker } from '../actions';

import defaultFlag from '../assets/images/default.jpg';

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onMapClick = this.onMapClick.bind(this);
    }

    onMapClick = (t, map, coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=0a80fb875c89d2a83e4e488fee2fcd64&units=metric`;

        axios.get(url).then(({ data }) => {
            const countryCode = data.sys.country;
            const locationName = data.name;
            const temp = data.main.temp;
            const weather = data.weather[0].main;
            const iconId = data.weather[0].id;
            const flagURL = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
            if (!locationName) {
                const location = {
                    name: "",
                    flag: defaultFlag,
                    country: "No Country",
                    temp,
                    weather,
                    iconId: "200"
                };
                this.props.selectLocation(location);
                return;
            }
            axios.get(flagURL).then(({ data }) => {
                const { flag, name } = data;
                const location = {
                    name: locationName,
                    flag,
                    country: name,
                    temp,
                    weather,
                    iconId: iconId.toString()
                };
                this.props.selectLocation(location);
            });
        })

        const marker = {
            position: {
                lat,
                lng
            }
        };
        this.props.updateMarker(marker);
    }

    render() {
        return (
            <div>
                <Map
                    item
                    xs={12}
                    className="map"
                    google={this.props.google}
                    onClick={this.onMapClick}
                    zoom={4.8}
                    initialCenter={{ lat: 21.84, lng: -102.29 }}
                >
                    <Marker
                        hidden={this.props.marker.position.lat === -10000000}
                        position={this.props.marker.position}
                    />
                </Map>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        marker: state.marker
    };
};

const component = GoogleApiWrapper({
    apiKey: (YOUR_API_KEY)
})(GoogleMapsContainer);

export default connect(mapStateToProps, { selectLocation, updateMarker })(component);
