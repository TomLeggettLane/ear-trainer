import React, { useState } from 'react';

function Checkbox(props) {
    const [checked, setChecked] = React.useState(props.checked);
    console.log(props.octave);
    return (
      <label>
        <input type="checkbox"
          defaultChecked={checked}
          onChange={() => {setChecked(!checked)
                        props.onChange("answerSet", props.octave , !checked)}
          }
        />
        {props.label}
      </label>
    );
  }

export default Checkbox;