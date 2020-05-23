import {GET_LOCATION,GET_WEATHER_BY_DATE} from '../action/actionType'

const initalState={
    maxTempList :[],
    minTempList :[],
    humidityList :[],
    locationList:[],
    woeid : 0,
    city: ''
}


export default (state=initalState , action)=>{
    const {type} = action;

    switch(type){
        case GET_WEATHER_BY_DATE:
            const tmpList = formatWeatherList(action.payload.list);
            return {
                ...state,
                ...tmpList,
                loading:false,
                woeid:action.payload.woeid,
                city:action.payload.city
            }
        case GET_LOCATION:
            return {
                ...state,
                locationList: getLoactionList(action.payload.list)
            }
        default:
            return{
                ...state
            }
    }

    function getLoactionList(list){
        return list.map((item)=>{
            return {
                title: item.title,
                woeid: item.woeid
            };
        });
    }
    function formatWeatherList(list){
        const maxList = [];
        const minList = [];
        const humidityList = [];

        list.forEach((item)=>{
            const {max_temp , min_temp , humidity ,applicable_date} =item;
            let tmp = {};
            tmp[applicable_date] = max_temp;
            maxList.push({
                ...tmp
            });
            tmp[applicable_date] = min_temp;
            minList.push({
                ...tmp
            });
            tmp[applicable_date] = humidity;
            humidityList.push({
                ...tmp
            });
        });

        return {
            maxTempList:maxList,
            minTempList:minList,
            humidityList:humidityList
        };
    }
}
