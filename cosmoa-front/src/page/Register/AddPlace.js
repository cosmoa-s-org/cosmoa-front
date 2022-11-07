import { Button, Grid, Link, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import MapWrapper from '../../map/MapWrapper';

function AddPlace(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {item : null};
    //     this.add = props.add;
    // }

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const onButtonClick = function() {
        this.add(this.state.item);
        this.setState({item: "test"});
    }

    return(<>
    
        <h1>Add Place Page</h1>

        {/* 지도 표시 */}
        <MapWrapper />

        {/* <input type="text" value={search} onChange={onChange} /> */}

        <Grid item xs={12}>
            <TextField
                autoComplete='searchText'
                name='searchText'
                variant='outlined'
                id='searchText'
                label='검색어 입력'
            />
        </Grid>
        
        <Button variant='contained' >장소 찾기</Button>

        <br />
        <br />
        
        <Link href="/registercourse">
            <Button variant="contained">장소 선택</Button>
        </Link>

    </>)
}

export default AddPlace;