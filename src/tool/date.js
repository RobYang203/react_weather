export const getNowDateString = ()=>{
    return formatDateString(new Date());
};

export const addDate = (date , count)=>{
    date.setDate(date.getDate() + count);
    return formatDateString(date);
}

export const formatDateString = (date)=>{
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}

