import React, {useState} from 'react';
import {InputLabel,InputAreaDiv} from '../../../styles/input/style'

type PropsType = {
  onChange: Function,
  labelText: string,
  defaultValue: number
}

function InputNumber(props: PropsType) {
  const [text, setText] = useState(props.defaultValue)
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => parseInt(event.target.value))
    props.onChange(parseInt(event.target.value))
  }
  
  return (
    <InputAreaDiv>
      <InputLabel htmlFor="number">{props.labelText}: </InputLabel>
      <input id="number" value={text} onChange={handleChangeText} type="number" />
    </InputAreaDiv>
  );
}

export default InputNumber;