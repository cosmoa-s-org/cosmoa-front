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

        {/* 지도에서 선택 */}
        <div style={{margin:"0 auto"}}>
                <MapWrapper />
            </div>

    </>)
}

export default AddPlace;