import { useState } from "react";

const useInputs = (initialState) => {
  const [inputs, setInputs] = useState(initialState);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const reset = () => {
    setInputs(initialState);
  };

  return [inputs, onChange, reset];
};

export default useInputs;
