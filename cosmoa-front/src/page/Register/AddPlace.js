import { Button } from '@material-ui/core';
import React from 'react';
import MapWrapper from '../../map/MapWrapper';

function AddPlace(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {item : null};
    //     this.add = props.add;
    // }

    const onShowMapBtnClick = function() {
        <MapWrapper />
    }

    const onButtonClick = function() {
        this.add(this.state.item);
        this.setState({item: "test"});
    }

    return(<>
    
        <h1>Add Place Page</h1>

        <Button onClick={this.onShowMapBtnClick}>show map</Button>


    </>)
}

export default AddPlace;