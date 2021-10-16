import React, {useState} from 'react';
import {InputLabel,InputAreaDiv} from '../../../styles/input/style'

type PropsType = {
  onChange: Function,
  labelText: string
}

function InputText(props: PropsType) {
  const [text, setText] = useState('')
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => event.target.value)
    props.onChange(event.target.value)
  }
  
  return (
    <InputAreaDiv>
      <InputLabel htmlFor="text">{props.labelText}: </InputLabel>
      <input id="text" value={text} onChange={handleChangeText} type="text" />
    </InputAreaDiv>
  );
}

export default InputText;