import React, {useState} from 'react';
import {convertColorCode2RgbObject} from '../../../helper/rgbHelper'
import styled from '@emotion/styled'
import {InputLabel,InputAreaDiv} from '../../../styles/input/style'

export const ColorInput = styled.input`
margin-right: 16px;
`
export const TitleH2 = styled.h2`
font-size: 1.5rem;
margin: 8px 0 0 8px;
`

type PropsType = {
  onChange: Function,
  onChangeOpacity: Function,
  labelText: string,
  defaultValue: string,
  defaultOpacity: number 
}

function InputWithColorCode(props: PropsType) {
  const [backgroundColorCode, setBackgroundColorCode] = useState(props.defaultValue)
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColorCode(() => event.target.value)
    props.onChange(convertColorCode2RgbObject(event.target.value))
  }
  const [backgroundOpacity, setBackgroundColorOpacity] = useState(props.defaultOpacity)
  const handleChangeOpacity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColorOpacity(() => parseFloat(event.target.value))
    props.onChangeOpacity(parseFloat(event.target.value))
  }
  
  return (
    <InputAreaDiv>
      <InputLabel htmlFor="text">色: </InputLabel>
      <ColorInput id="text" value={backgroundColorCode} onChange={handleChangeText} type="color" />
      <InputLabel htmlFor="opacity">透明度: </InputLabel>
      <ColorInput id="opacity" value={backgroundOpacity} onChange={handleChangeOpacity} type="number" step="0.1" min="0.0" max="1.0" />
    </InputAreaDiv>
  );
}

export default InputWithColorCode;