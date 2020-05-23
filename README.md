## React Weather 

### 元件
* LocationInput 
    * 位置輸入欄，輸入後搜尋可查詢地址
* BarChart
    * 直條圖，顯示未來五天最高溫度 ＆ 最低溫度
* PieChart
    * 顯示未來五天濕度百分比

### 流程
1. 輸入地址， **input onChange** 偵測， 不為空值呼叫 **weatherAPI**搜尋可用地名，用 dispatch 傳入參數顯示列表
2. 呼叫時延遲**1s**呼叫，當持續輸入**取消前次呼叫**
3. 顯示地名在自動填補，選擇後保存 **woeid**，並藉由 **woeid**呼叫 **weatherAPI**搜尋未來五天天氣
4. 在 reducer 處理資訊
    ```js
        const initalState={
            maxTempList :[],
            minTempList :[],
            humidityList :[],
            locationList: []
        }
        const temp = {
            "yyyy-MM-dd":value
        }
        const location ={
            title:"",
            woeid:0
        }

    ```