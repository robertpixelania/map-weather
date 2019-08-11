import React from 'react'
import { connect } from 'react-redux'
import WeatherIcon from 'react-icons-weather';

class LocationData extends React.Component {
    render() {
        return (
            <div className="information">
                <div className="message" hidden={this.props.marker.position.lat !== -10000000}>
                    Please select a place in the map in order to get information.
                </div>
                <div className="flag" hidden={this.props.marker.position.lat === -10000000}>
                    <img src={this.props.location.flag} alt="" />
                </div>
                <div className="place" hidden={this.props.marker.position.lat === -10000000}>
                    {this.props.location.name}
                <br />
                    {this.props.location.country}
                </div>
                <div className="temp" hidden={this.props.marker.position.lat === -10000000}>
                    {this.props.location.temp}°C
                </div>
                <div className="icon" hidden={this.props.marker.position.lat === -10000000}>
                    <WeatherIcon name="owm" iconId={this.props.location.iconId} fixedWidth={true} flip="horizontal" rotate="90" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        marker: state.marker
    };
};

export default connect(mapStateToProps, {
})(LocationData);