import React from 'react'
import BasicBar from './BaicChart'
import {drawBarChart} from '../../tool/draw'

const  BarChartHOC = (BasicBar,drawBarChartFn)=>
    class extends React.Component{
        constructor(props){
            super(props);

        }
        drawBarChart =(ctx , data , canvas_W , canvas_H)=>{
            const {barColor , padding} = this.props;
            drawBarChartFn(ctx , data , canvas_W , canvas_H , barColor , padding);
        }

        render(){
            return(
                <BasicBar {...this.props} drawChat={this.drawBarChart} />       
            )
            
        }
    }

export default BarChartHOC(BasicBar , drawBarChart);