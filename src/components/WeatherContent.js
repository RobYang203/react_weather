import React, { useEffect, useState } from 'react';

import LocationInput from './LocationInput';
import {getWeatcherList} from '../redux/action/actionCreator'
import {fetchLoactionWeatherByDate} from '../api/weatherAPI'
import { addDate } from '../tool/date';
import { connect } from 'react-redux';

import '../res/css/WeatherContent.css'
import BarChart from './chart/BarChart';
import PieChart from './chart/PieChart';
function WeatherContent(props) {
    const {location} = props.match.params;
    const [hiddenClass , setLoading] = useState("scroll-hidden");

    useEffect(()=>{

        setLoading("scroll-hidden");
        console.log("go into Effect...");
        if(location){
            const tmp = location.split('-');
            const [woeid , city] = tmp;
            props.getWeatcherList(woeid ,city , new Date() , setLoading);
        }else{
            setLoading(""); 
        }
    },[location]);
    return (
        <div className={`weather ${hiddenClass}`}>
            <LocationInput localValue={props.city} />
            <div className={`chart-content`}>
                <BarChart title="Max Temperatrue" className="max" data={props.maxTempList} barColor={["red"]} padding={50}/>
                <BarChart title="Min Temperatrue" className="min" data={props.minTempList} barColor={["blue"]} padding={50} />
                <PieChart title="Humidity" className="humidity"  data={props.humidityList} pieColor={["gray", "red"]} titleList={["Humidity"]} padding={20} />
            </div>
            <div className="loading-mask">
                <div className="loader"></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state)=>{
    console.log(state);
    return {
        ...state
    }
};
const mapDispatchToProps = (dispatch)=>{
    return{
        getWeatcherList: async (woeid ,city , startDate, loadingFn)=>{
            const list = [];
            for(let i = 1 ; i <= 5 ; i++){
                const tmpDateString = addDate(startDate , 1);
                const tmp = await fetchLoactionWeatherByDate(woeid , tmpDateString);
                if(tmp.length !== 0)
                    list.push(tmp[0]);
            }        
            dispatch(getWeatcherList(woeid ,city ,list));
            loadingFn("");
        }
    };
};

export default connect(mapStateToProps ,mapDispatchToProps)(WeatherContent);
