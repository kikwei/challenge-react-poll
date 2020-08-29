import React from 'react';
import styled from 'styled-components';

type Props = {
  votes: number;
};

const VotesSpan = styled.span`
  color: #808080;
`;

const Votes = ({ votes }: Props) => {
  return <VotesSpan>{votes} Votes</VotesSpan>;
};

export default Votes;
