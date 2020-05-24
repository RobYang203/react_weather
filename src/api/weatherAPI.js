import {apiUrl , cors} from '../config/dataConfig'

export const fetchLoactionList = async (key)=>{
    const action = `search/?query=${key}`;

    const respone = await callAPI(action);
    if(respone.status !== 200){
        return [];
    }
    const d = await respone.json();  
    
    return d === undefined? [] : d;
}

export const fetchLoactionWeatherByDate = async (woeid , dateString)=>{
    const action = `${woeid}/${dateString}/`;
    const respone = await callAPI(action);
    if(respone.status !== 200){
        return [];
    }

    const d = await respone.json();

    return d=== undefined? []:d;

}
const callAPI =  (action , value)=>{
    const url = `${cors}${apiUrl}${action}`;

    const header = new Headers();
    header.append("Access-Control-Allow-Origin" , "*");
    const options ={
        headers:header
    }
    return fetch(url,options);
}