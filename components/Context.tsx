import * as React from 'react';

interface ChoicesState {
  choice: string;
  handleVoting: Function;
  isTheChosen: boolean;
  backGroundColor: string;
  percentage: number;
  fontWeight: string;
  hasVoted: boolean;
}

export const ChoicesCtxt = React.createContext({} as ChoicesState);
