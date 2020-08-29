import * as React from 'react';

interface ChoicesState {
  choice: string;
  handleVoting: Function;
  chosen: boolean;
  backGroundColor: string;
  percentage: number;
  fontWeight: string;
  disabled: boolean;
}

export const ChoicesCtxt = React.createContext({} as ChoicesState);
