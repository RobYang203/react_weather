import {GET_LOCATION,GET_WEATHER_BY_DATE} from './actionType'

export const getLocation =(list)=>{
    return {
        type:GET_LOCATION,
        payload:{
            list:list
        }
    }
}

export const getWeatcherList =(woeid , city ,list)=>{
    return {
        type:GET_WEATHER_BY_DATE,
        payload:{
            woeid: woeid,
            city: city,
            list:list
        }
    }
}