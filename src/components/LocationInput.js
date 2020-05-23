import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {getLocation} from '../redux/action/actionCreator'
import {fetchLoactionList} from '../api/weatherAPI'

import '../res/css/LocationInput.css'
import {useHistory} from 'react-router-dom'
function LocationInput({locationList , getLocation , localValue}){
    const [inputValue , setInputValue] = useState(localValue);
    const history = useHistory();
    const [searchID , setSearchID] = useState(0);
    const inputRef = useRef(null);
    let optionList = locationList.map((item)=>{
        const {title , woeid} = item;
        return <option key={`${item.title}=${item.woeid}`} data-id={woeid} value={title}/>
    });
    optionList = optionList.length === 0? <option value=" ">No Data</option> : optionList;
    const onLoactionChange = (e)=>{
       
        const key = e.currentTarget.value;
        const searchTarget = filterList(key);
        setInputValue(key);
        if(searchTarget.length !== 0){
            history.push(`/${searchTarget[0].woeid}-${searchTarget[0].title}`);
            return;
        }

        console.log("...keying");
        clearTimeout(searchID);
        const id = setTimeout(() => {
            console.log("...searching");
            getLocation(key);
        }, 500);
        setSearchID(id);
       
    }

    const onSearchClick  = ()=>{
        const key = inputRef.current.value;
        const searchTarget = filterList(key);
        if(searchTarget.length !== 0)
            history.push(`/${searchTarget[0].woeid}-${searchTarget[0].title}`);
    }

    const filterList = (key)=>{
        return locationList.filter((item)=>{
            return item.title.toUpperCase() === key.toUpperCase();
        });
    }
    useEffect(()=>{
        setInputValue(localValue);
    },[localValue]);
    return(
        <div className="location-search">
            <input ref={inputRef} type="text" value={inputValue} list="locationList" onInput={onLoactionChange} />
            <datalist id="locationList" >
                {optionList}
            </datalist>

            <button className="btnSearch" onClick={onSearchClick}>
                <i className="fa fa-search fa-2x"></i>
            </button>
        </div>
    );

}

const mapStateToProps =(state)=>{
    return {
        locationList : state.locationList
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        getLocation: async (localKey)=>{
            if(/^\s*$/.test(localKey)){
                dispatch(getLocation([]));
                return;
            }
            
            const list = await fetchLoactionList(localKey);
            dispatch(getLocation(list));
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(LocationInput);