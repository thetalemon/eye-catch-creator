import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled'
import InputTextArea from './input/textArea'
import InputNumber from './input/number'
import InputColorCodeAndOpacity from './input/colorCodeAndOpacity'
import { TitleH2 } from '../../styles/title/style'
import { RgbObject,  rgbaFormatter } from '../../helper/rgbHelper'

const PreviewImage = styled.img`
margin-top: 4px;
width: 50%;
object-fit: cover;
height: auto;
`
const ResultCanvas = styled.canvas`
width: 100%;
`
const InputAreaDiv = styled.div`
margin-left: 24px;
`

const DownloadButtonWrapper = styled.p`
  text-align: center;
`

const DownloadButton = styled.button`
  appearance: none;
  border: 0;
  border-radius: 5px;
  background: #063506;
  color: #67CC3E;
  padding: 8px 16px;
  font-size: 16px;
  margin: 8px 0;
  &:disabled {
    background: #5f5f5f;
    color: #b1b1b1;
  }
`

type NullableHTMLCanvasElement = HTMLCanvasElement | null
type NullableHTMLImageElement = HTMLImageElement | null

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputImgRef = useRef<HTMLImageElement>(null);
  const canvasWidth = 1280
  const canvasHeight = 670
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(60)
  const [xMargin, setXMargin] = useState(10)
  const [yMargin, setYMargin] = useState(25)
  const [backgroundOpacity, setOpacity] = useState(0.5)
  const [textOpacity, setTextOpacity] = useState(1)
  const [selectedImg, setImg] = useState('')
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
  const handleChangeImg = (data: React.ChangeEvent<HTMLInputElement>) => {
    if (data.target.files === null || data.target.files.length === 0) {
      return;
    }
    setImg(URL.createObjectURL(data.target.files[0]))
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
    const splitedText = text.split("\n")
    splitedText.forEach((target, index) => {
      const measure = ctx.measureText(target)

      var textWidth = measure.width;
      var textHeight = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent

      if (target.length !== 0) {
        ctx.fillStyle = rgbaFormatter({...backgroundRgb, alpha: backgroundOpacity})
        ctx.fillRect(
          (canvasWidth - textWidth) / 2 - xMargin,
          (canvasHeight - textHeight) / 2 - yMargin + (textHeight + yMargin * 2) * (index - 1),
          textWidth + xMargin * 2,
          textHeight + yMargin * 2 + 2
        );
      }

      ctx.fillStyle = rgbaFormatter({ ...textRgb, alpha: textOpacity })
      ctx.fillText(
        target,
        (canvasWidth - textWidth) / 2,
        (canvasHeight / 2) + textHeight / 2 + (textHeight + yMargin * 2) * (index - 1)
      );
    })
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
    if (!canvas ) return 

    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "test.png";
    link.click();
  }

  useEffect(() => {
    redraw()
  });


  const PreviewImgBranch: '' | JSX.Element = selectedImg === ''
    ? ''
    : (
      <PreviewImage ref={outputImgRef} src={selectedImg} width={canvasWidth} height={canvasHeight} />
    );

  const PreviewCanvasBranch: '' | JSX.Element = selectedImg === '' || text　=== ''
    ? ''
    : (
      <ResultCanvas width={canvasWidth} height={canvasHeight} ref={canvasRef} />
    );

  const DownloadButtonBranch: '' | JSX.Element = selectedImg === '' || text　=== ''
    ? (
      
      <DownloadButtonWrapper>
        <DownloadButton disabled>画像を選択＆文字を入力してね！</DownloadButton>
      </DownloadButtonWrapper>)
    : (
      <DownloadButtonWrapper>
        <DownloadButton onClick={activateLasers}>ダウンロード</DownloadButton>
      </DownloadButtonWrapper>
    );
  
  return (
    <div>
      <TitleH2>背景画像</TitleH2>
      <InputAreaDiv>
        ※1280×670以上の画像を選んでください<br />
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImg}
        /> <br />
        {PreviewImgBranch}
      </InputAreaDiv>

      <TitleH2>文字</TitleH2>
      <InputAreaDiv>
        <InputTextArea
          onChange={handleChangeText}
          labelText="文字"
        />
        <InputNumber
          onChange={handleChangeFontSize}
          defaultValue={60}
          labelText="フォントサイズ"
        />
        <InputColorCodeAndOpacity
          onChange={handleChangeTextColor}
          labelText="文字の背景"
          defaultValue="#000000"
          defaultOpacity={1}
          onChangeOpacity={handleChangeTextOpacity}
        />
      </InputAreaDiv>
      <TitleH2>文字の背景</TitleH2>
      <InputAreaDiv>
        <InputColorCodeAndOpacity
          onChange={handleChangeBackgoundColor}
          labelText="文字"
          defaultValue="#ffffff"
          defaultOpacity={0.5}
          onChangeOpacity={handleChangeBackgroundOpacity}
        />
        <InputNumber
          onChange={handleChangeYMargin}
          defaultValue={25}
          labelText="上下のふち"
        />
        <InputNumber
          onChange={handleChangeXMargin}
          defaultValue={10}
          labelText="左右のふち"
        />
      </InputAreaDiv>
      <TitleH2>プレビュー</TitleH2>
      { PreviewCanvasBranch }
      { DownloadButtonBranch }
    </div>
  );
}

export default Canvas;