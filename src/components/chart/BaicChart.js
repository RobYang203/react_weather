import React from 'react'

class BaicChart extends React.Component{
    constructor(props){
        super(props);

        this.canvasRef = React.createRef();
        this.cardRef = React.createRef();

        this.state ={
            canvas_W:0,
            canvas_H:300
        }
    }


    render(){
        return(
            <div ref={(ref)=>{ this.cardRef  = ref}} className="chart-card">
                <h2 className={this.props.className} >{this.props.title}</h2>
                <canvas ref={(ref)=>{ this.canvasRef = ref}} width={this.state.canvas_W} height={this.state.canvas_H} >
          
                </canvas>
                {this.props.children}
            </div>
        )
    }

    componentDidMount(){
        const width = this.cardRef.clientWidth;
        const height = width < 400 && this.props.mobile? width/2 * 3 + 50:this.state.canvas_H;
        this.setState({
            canvas_W:width,
            canvas_H:height
        });
    }

    componentDidUpdate(){
        const ctx = this.canvasRef.getContext('2d');
        ctx.clearRect(0 ,0 ,this.state.canvas_W, this.state.canvas_H);
        if(this.props.drawChat && this.props.data){
            console.log(this.props.data);
            this.props.drawChat(ctx,this.props.data, this.state.canvas_W , this.state.canvas_H);
        }
           
    }
}

export default BaicChart;