import React, {useState} from 'react';
import {InputLabel,InputAreaDiv} from '../../../styles/input/style'

type PropsType = {
  onChange: Function,
  labelText: string
}

function InputText(props: PropsType) {
  const [text, setText] = useState('')
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(() => event.target.value)
    props.onChange(event.target.value)
  }
  
  return (
    <InputAreaDiv>
      <InputLabel htmlFor="text">{props.labelText}: </InputLabel>
      <textarea id="text" value={text} onChange={handleChangeText} />
    </InputAreaDiv>
  );
}

export default InputText;