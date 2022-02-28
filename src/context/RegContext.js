import React, { useState, createContext } from "react";

export const RegContext = createContext({
  reg: false,
  edit: false,
  signUp: () => {},
  profileEdit: () => {},
});

export function RegProvider(props) {
  const { children } = props;
  const [reg, setReg] = useState(undefined);
  const [edit, setEdit] = useState(undefined);

  const signUp = (reg) => {
    setReg(reg);
  };
  const profileEdit = (edit) => {
    setEdit(edit);
  };

  const valueContext = {
    reg,
    signUp,
    edit,
    profileEdit,
  };

  return (
    <RegContext.Provider value={valueContext}>{children}</RegContext.Provider>
  );
}
