import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled'
import InputText from './inputs/inputText'
import InputNumber from './inputs/inputNumber'
import InputWithColorCode from './inputs/inputWithColorCode'
import { RgbObject,  rgbaFormatter} from './helper/rgbHelper'

const ResultImage = styled.img`
width: 100%;
object-fit: cover;
height: auto;
`
const ResultCanvas = styled.canvas`
width: 100%;
`
const InputLabel = styled.label`
display: block;
/* width: 154px; */
margin-right: 8px;
`
const InputAreaDiv = styled.div`
display: flex;
margin-left: 8px;
margin-top: 4px;
`
export const TitleH2 = styled.h2`
font-size: 1.5rem;
margin: 8px 0 0 8px;
`

type NullableHTMLCanvasElement = HTMLCanvasElement | null
type NullableHTMLImageElement = HTMLImageElement | null

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const outputImgRef = useRef<HTMLImageElement>(null);
  const canvasWidth = 1280
  const canvasHeight = 670
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(60)
  const [xMargin, setXMargin] = useState(10)
  const [yMargin, setYMargin] = useState(25)
  const [backgroundOpacity, setOpacity] = useState(0.5)
  const [textOpacity, setTextOpacity] = useState(1)
  const [backgroundRgb, setBackgroundRgb] = useState({
    red: 255,
    green: 255,
    blue: 255
  })
  const [textRgb, setTextRgb] = useState({
    red: 0,
    green: 0,
    blue: 0
  })

  const handleChangeText = (text: string) => {
    setText(() => text)
  }

  const handleChangeFontSize = (size: number) => {
    setFontSize(() => size)
  }

  const handleChangeXMargin = (size: number) => {
    setXMargin(() => size)
  }

  const handleChangeYMargin = (size: number) => {
    setYMargin(() => size)
  }

  const handleChangeBackgoundColor = (rgb: RgbObject) => {
    setBackgroundRgb(() => rgb)

  }
  const handleChangeTextColor = (rgb: RgbObject) => {
    setTextRgb(() => rgb)
  }

  const handleChangeBackgroundOpacity = (opacity: number) => {
    setOpacity(() => opacity)
  }
  const handleChangeTextOpacity = (opacity: number) => {
    setTextOpacity(() => opacity)
  }

  function redraw() {
    const ctx: CanvasRenderingContext2D | null = getContext();
    if(!ctx) return 
    const canvas: NullableHTMLCanvasElement = getCanvasRef();
    if(!canvas) return 
    const outputImage: NullableHTMLImageElement = getImageRef(outputImgRef);
    if(!outputImage) return 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (outputImage !== null) {
      ctx.drawImage(outputImage, 0, 0);
    }

    ctx.font = `${fontSize}px serif`;
    const measure = ctx.measureText( text )
    var textWidth = measure.width;
    var textHeight = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent

    if (text.length !== 0) {
      ctx.fillStyle = rgbaFormatter({...backgroundRgb, alpha: backgroundOpacity})
      ctx.fillRect((canvasWidth - textWidth) / 2 - xMargin, (canvasHeight- textHeight) / 2 - yMargin, textWidth + xMargin*2, textHeight + yMargin*2);
    }

    ctx.fillStyle = rgbaFormatter({ ...textRgb, alpha: textOpacity })
    ctx.fillText( text, (canvasWidth - textWidth) / 2, (canvasHeight/2) + textHeight/2 ) ;
  }

  const getCanvasRef = (): NullableHTMLCanvasElement => {
    if(!canvasRef.current) return null
    return canvasRef.current;
  };

  const getImageRef = (imRef : React.RefObject<HTMLImageElement>): NullableHTMLImageElement => {
    if(!imRef.current) return null
    return imRef.current;
  };

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas: NullableHTMLCanvasElement = getCanvasRef();
    if(!canvas) return null
    return canvas.getContext('2d');
  };

  function activateLasers() {
    const canvas: NullableHTMLCanvasElement = getCanvasRef();
    const image: NullableHTMLImageElement = getImageRef(imgRef);
    if (!canvas || !image) return 
    image.src = canvas.toDataURL();
  }

  useEffect(() => {
    redraw()
  });

  return (
    <div>
      <div>
        <TitleH2>文字</TitleH2>
        <InputText
          onChange={handleChangeText}
          labelText="文字"
        />
        <InputNumber
          onChange={handleChangeFontSize}
          defaultValue={60}
          labelText="フォントサイズ"
        />
        <InputWithColorCode
          onChange={handleChangeTextColor}
          labelText="文字の背景"
          defaultValue="#000000"
          defaultOpacity={1}
          onChangeOpacity={handleChangeTextOpacity}
        />
        <TitleH2>文字の背景</TitleH2>
        <InputWithColorCode
          onChange={handleChangeBackgoundColor}
          labelText="文字"
          defaultValue="#ffffff"
          defaultOpacity={0.5}
          onChangeOpacity={handleChangeBackgroundOpacity}
        />
        <InputNumber
          onChange={handleChangeYMargin}
          defaultValue={25}
          labelText="上下マージン"
        />
        <InputNumber
          onChange={handleChangeXMargin}
          defaultValue={10}
          labelText="左右マージン"
        />

      </div>
      <hr/>
      <ResultCanvas width={canvasWidth} height={canvasHeight} ref={canvasRef} />
      <hr />
      <button onClick={activateLasers}>出力</button>
      <hr />
      <div><ResultImage ref={imgRef} width={canvasWidth} height={canvasHeight} /></div>
      <hr />
      背景
      <div><ResultImage ref={outputImgRef} src="/sample.jpg" width={canvasWidth} height={canvasHeight} /></div>
    </div>
  );
}

export default Canvas;