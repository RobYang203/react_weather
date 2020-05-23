export const drawBarChart = (ctx ,data , canvasWidth , canvasHeight , colorList , padding)=>{
    if(data.length === 0)
        return;

    let maxValue = 0 ;
    data.forEach((item)=>{
        const v = Object.values(item)[0];
        maxValue = v > maxValue? v: maxValue;  
    });
    const scale = Math.round(maxValue / 5);
    drawGrid(ctx , maxValue ,  canvasWidth , canvasHeight - 100 , scale , "#cccccc" , padding);

    drawBarList(ctx , canvasWidth , canvasHeight  - 100, data, maxValue , colorList[0] , padding);
}

export const drawPieList = (ctx ,data, canvasWidth , canvasHeight , colorList , padding)=>{
    if(data.length === 0)
        return;

    const count = data.length;
    const singleWidth = (canvasWidth - padding)/ count ;
    const centerX = singleWidth /2;
    const centerY = canvasHeight/2;
    const step = 10;
    const radius =  Math.min(centerX , centerY) - step;
    const twoPI = 2 * Math.PI;
    data.map((pieObj , i)=>{
        const key = Object.keys(pieObj)[0];
        const val = Object.values(pieObj)[0];
        const value_ratio = val / 100;
        const empty_ratio = 1 - value_ratio;
 
        const value_angle = twoPI * value_ratio;
        const empty_angle = twoPI * empty_ratio;
        const angleList = [value_angle , empty_angle];
        const color = [ colorList[0] , colorList[1]];
        const slicePieCenterX = centerX + (singleWidth * i);

        let start_angle = 0;
        for(let j = 0 ; j < 2; j++){
            const slice_angle = angleList[j];
            const cosX = Math.cos(start_angle + slice_angle/2);
            const sinY = Math.sin(start_angle + slice_angle/2);
            const pieCOlor = setLinearGradientColor(ctx ,color[j] , slicePieCenterX ,centerY , slicePieCenterX+ cosX * radius , centerY + sinY*radius);
            drawPieSlice(ctx ,
                slicePieCenterX,
                centerY,
                radius,
                start_angle,
                start_angle + slice_angle,
                pieCOlor
                );
            

            const labelX = slicePieCenterX + radius/2 * cosX;
            const labelY = centerY  + radius/2 * sinY;
            const msg = `${ Math.round(slice_angle / twoPI * 100)} %`;
            drawText(ctx ,msg , labelX , labelY , "#fff" , "bold 20px Arial");
            start_angle += slice_angle;
        }

        drawText(ctx ,key , slicePieCenterX , canvasHeight - padding, "#000" , "15px Arial" , "center");
    });
}
const setLinearGradientColor = (ctx , color , startX , startY , endX , endY)=>{
    const gradient = ctx.createLinearGradient(startX , startY , endX , endY);
    switch(color){
        case "red":
            gradient.addColorStop(0 , "#e01616" );
            gradient.addColorStop(1, "#e6dede");
                 
            break;
        case "blue":
            gradient.addColorStop(0, "#1107a9");
            gradient.addColorStop(1, "#f1efef");     
            break;
        case "gray":
            gradient.addColorStop(0, "#cccccc");
            gradient.addColorStop(1, "#f1efef");     
            break;
    }
    return gradient;
}
const drawGrid = (ctx , maxValue , canvasWidth , canvasHeight , scale , color , padding)=>{
    let gridValue = 0 ;
    
    while(gridValue <= maxValue){
        const ratio = 1 - gridValue / maxValue;
        const fix1px = (ctx.lineWidth % 2 === 0) ?0: 0.5;
        const gridY = Math.round(canvasHeight  * ratio) +fix1px + padding;
        drawLine(ctx , padding , gridY , canvasWidth - padding  , gridY ,color);
        const textY = (gridY === 0 ? 12 : gridY -2 ) + fix1px;
        drawText(ctx , gridValue , 10 , textY , color , "#000", "bold 10px Arial");
        gridValue += scale;     
    }
    
}
const drawBarList = (ctx, canvasWidth , canvasHeight , data , maxValue , color , padding , bar_w)=>{
    const barCount = data.length;
    const barSize = bar_w || (canvasWidth / barCount - padding);
    const startX = (padding || 0) + 20;
    const step = 10;
    for(let barIndex =0 ; barIndex < barCount ; barIndex++){
        const barObj = data[barIndex];
        const barKey = Object.keys(barObj)[0];
        const barVal = Object.values(barObj)[0];
        
        const ratio = barVal / maxValue;
        const barHeight = canvasHeight * ratio;
        
        const x = startX + barIndex * barSize;
        const y = canvasHeight - barHeight + padding;

        const barColor = setLinearGradientColor(ctx , color ,x, y,  x + barSize -step ,  barHeight);
        drawBar(ctx, 
            x,
            y ,
            barSize -step,
            barHeight,
            barColor);
        const textX =  x + (barSize -step) /2
        drawText(ctx , barKey ,textX , canvasHeight + padding + 20 , "#000", " 15px Arial" , "center");
    }
}




const drawText = (ctx , msg , x , y , color,fontStyle , align)=>{
    const textAlign = align || "";
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = fontStyle;
    ctx.textAlign = textAlign;
    ctx.fillText(msg , x , y);
    ctx.restore();
}
const drawLine = (ctx, startX, startY, endX, endY, color) =>{
    ctx.save();//保存畫筆設定
    ctx.strokeStyle = color;
    ctx.beginPath();//開始新路線
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();//下筆

    ctx.restore();//畫完切回原本設定
}
const drawBar = (ctx , upperLeftCornerX , upperLeftCornerY, width , height , color)=>{
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX , upperLeftCornerY , width , height);
    ctx.restore();
}

const drawArc = (ctx , centerX , centerY ,radius , startAngle , endAngle)=>{
    ctx.beginPath();
    ctx.arc(centerX ,  centerY , radius , startAngle , endAngle);
    ctx.stroke();
}

const drawPieSlice =(ctx , centerX , centerY ,radius ,startAngle , endAngle ,color)=>{
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX ,centerY ,radius , startAngle , endAngle);
    ctx.closePath();//以當下畫筆位置進行封閉
    ctx.fill();//填滿
    ctx.restore();
}

