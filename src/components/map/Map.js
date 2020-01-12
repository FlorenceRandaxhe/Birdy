import React, { Component} from 'react';

class Map extends Component {


    render() {
        return (
            <React.Fragment>
                <div className="map__marker" onClick={this.appear}>
                </div>

                <div className="map__pop">
                    <p>{this.props.name}</p>
                    <p>{this.props.superficie} km</p>
                </div>
            </React.Fragment>
        );
    }
}

export default Map
