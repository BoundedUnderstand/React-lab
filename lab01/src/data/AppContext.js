import { createContext } from 'react';

const defaultContextValue = {
  items: [], 
  dispatch: () => {} 
};

const AppContext = createContext(defaultContextValue);

export default AppContext;