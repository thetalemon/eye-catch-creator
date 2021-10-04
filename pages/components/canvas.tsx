import React, {useEffect, useRef, useState} from 'react';
// import Image from 'next/image'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const sampleImgRef = useRef<HTMLImageElement>(null);
  const canvasWidth = 800
  const canvasHeight = 300
  const [text, setText] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => event.target.value)
    const inputText = event.target.value
    const ctx: CanvasRenderingContext2D = getContext();
    const canvas: any = canvasRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (sampleImgRef !== null && sampleImgRef.current !== null) {
      ctx.drawImage(sampleImgRef.current, 0, 0);
    }

    var fontSize = 24 ;
    ctx.font = `${fontSize}px serif`;
    var textWidth = ctx.measureText( inputText ).width ;

    if(inputText.length !== 0 ){
      ctx.fillStyle = "rgba(" + [255, 255, 255, 0.5] + ")";
      ctx.fillRect((canvasWidth - textWidth) / 2 - 25, (canvasHeight/2) - (fontSize + 20)/2 , textWidth + 50, fontSize + 20);
    }
    ctx.fillStyle = "rgba(" + [1, 1, 1, 1] + ")";
    ctx.fillText( inputText, (canvasWidth - textWidth) / 2, (canvasHeight/2) + fontSize/2 ) ;
  }

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext('2d');
  };

  function activateLasers() {
    if (canvasRef !== null && canvasRef.current !== null && imgRef !== null && imgRef.current !== null) {
      const png = canvasRef.current.toDataURL();
      imgRef.current.src = png;            
    } 
  }

  return (
    <div>
      <div><img ref={sampleImgRef} src="/sample.jpg" width={canvasWidth} height={canvasHeight} /></div>
      <hr></hr>
      <button onClick={activateLasers}>出力 </button>
      <hr></hr>
      <canvas className="canvas" width={canvasWidth} height={canvasHeight} ref={canvasRef} />
      <hr></hr>
      <div><img ref={imgRef} width={canvasWidth} height={canvasHeight} /></div>
      <input value={text} onChange={handleChange} type="text" />

    </div>
  );
}

export default Canvas;