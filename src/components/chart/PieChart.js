import React from 'react'
import BasicBar from './BaicChart'
import {drawPieList} from '../../tool/draw'

const  BarChartHOC = (BasicBar,drawPieList)=>
    class extends React.Component{
        constructor(props){
            super(props);

        }
        drawPieChart =(ctx ,data, canvas_W , canvas_H)=>{
            const {pieColor , padding , titleList} = this.props;
            drawPieList(ctx ,data , canvas_W , canvas_H , pieColor ,titleList ,padding);
        }

        render(){
            return(
                <BasicBar {...this.props} mobile={true} drawChat={this.drawPieChart} >
                </BasicBar>     
            )
            
        }
    }

export default BarChartHOC(BasicBar , drawPieList);