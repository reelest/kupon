import { createContext, useContext } from "react";
const Context = createContext();

export const AppContext = Context.Provider;
export const useAppContext = () => useContext(Context);

export const store = {};

export default AppContext;
