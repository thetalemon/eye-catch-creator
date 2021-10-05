import React, {useEffect, useRef, useState} from 'react';
// import Image from 'next/image'
// import styled from '@emotion/styled'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const sampleImgRef = useRef<HTMLImageElement>(null);
  const canvasWidth = 800
  const canvasHeight = 300
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [colorCode, setColorCode] = useState('#ffffff')
  const [backgroundOpacity, setOpacity] = useState(0.5)
  const [rgb, setRgb] = useState({
    red: 0,
    green: 0,
    blue: 0
  })

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => event.target.value)
  }
  const handleChangeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(() => parseInt(event.target.value))
  }
  const handleChangeColorCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorCode(() => event.target.value)

    setRgb({
      red: parseInt(event.target.value.substr(1, 2), 16),
      green: parseInt(event.target.value.substr(3, 2), 16),
      blue: parseInt(event.target.value.substr(5, 2), 16)
    })
  }
  const handleChangeBackgroundOpacity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(() => parseFloat(event.target.value))
  }

  function redraw() {
    const ctx: CanvasRenderingContext2D = getContext();
    if(!canvasRef) return
    if(!canvasRef.current) return
    const canvas: HTMLCanvasElement = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (sampleImgRef !== null && sampleImgRef.current !== null) {
      ctx.drawImage(sampleImgRef.current, 0, 0);
    }

    ctx.font = `${fontSize}px serif`;
    var textWidth = ctx.measureText( text ).width ;

    if (text.length !== 0) {
      console.log(rgb)
      console.log(backgroundOpacity)
      ctx.fillStyle = "rgba(" + [rgb.red, rgb.green, rgb.blue, backgroundOpacity] + ")";
      ctx.fillRect((canvasWidth - textWidth) / 2 - 25, (canvasHeight/2) - (fontSize + 20)/2 , textWidth + 50, fontSize + 20);
    }
    ctx.fillStyle = "rgba(" + [0, 0, 0, 1] + ")";
    ctx.fillText( text, (canvasWidth - textWidth) / 2, (canvasHeight/2) + fontSize/2 ) ;
  }

  const getContext = (): CanvasRenderingContext2D | null => {
    if(!canvasRef.current) return null
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    return canvas.getContext('2d');
  };

  function activateLasers() {
    if (canvasRef !== null && canvasRef.current !== null && imgRef !== null && imgRef.current !== null) {
      const png = canvasRef.current.toDataURL();
      imgRef.current.src = png;            
    } 
  }

  useEffect(() => {
    redraw()
  });

  return (
    <div>
      <div>
        <label>文字列: </label><input value={text} onChange={handleChangeText} type="text" />
        <br/>
        フォントサイズ: <input value={fontSize} onChange={handleChangeFontSize} type="number" />
        <br/>
        文字の背景色(rgb):
        <input value={colorCode} onChange={handleChangeColorCode} type="color" />
        <br/>
        文字の背景の透明度:
        <input value={backgroundOpacity} onChange={handleChangeBackgroundOpacity} type="number" step="0.1" min="0.0" max="1.0" />
      </div>

      <hr />
      <button onClick={activateLasers}>出力 </button>
      <hr />
      <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef} />
      <hr />
      <div><img ref={imgRef} width={canvasWidth} height={canvasHeight} /></div>
      <hr />
      背景
      <div><img ref={sampleImgRef} src="/sample.jpg" width={canvasWidth} height={canvasHeight} /></div>
    </div>
  );
}

export default Canvas;