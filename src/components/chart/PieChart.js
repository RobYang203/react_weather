import React from 'react'
import BasicBar from './BaicChart'
import {drawPieList} from '../../tool/draw'

const  BarChartHOC = (BasicBar,drawPieList)=>
    class extends React.Component{
        constructor(props){
            super(props);

        }
        drawPieChart =(ctx ,data, canvas_W , canvas_H)=>{
            const {pieColor , padding} = this.props;
            drawPieList(ctx ,data , canvas_W , canvas_H , this.props.pieColor ,padding);
        }

        render(){
            return(
                <BasicBar {...this.props} drawChat={this.drawPieChart} />       
            )
            
        }
    }

export default BarChartHOC(BasicBar , drawPieList);