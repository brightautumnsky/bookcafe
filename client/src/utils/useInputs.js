import { useState, useCallback } from "react";

const useInputs = (initialState) => {
  const [inputs, setInputs] = useState(initialState);
  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }, []);
  const reset = () => {
    setInputs(initialState);
  };

  return [inputs, onChange, reset];
};

export default useInputs;
