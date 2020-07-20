import { useState } from "react";

export default defaultValue => {
  // console.log('useInput');
  const [value, setValue] = useState(defaultValue);

  const onChange = async e => {
    // console.log('useInput onChange');
    // console.log(value);
    // console.log(e.target.value);
    await setValue(e.target.value);
  };
  return { value, onChange, setValue };
};
