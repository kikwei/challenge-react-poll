import React from 'react';
import styled from 'styled-components';

type Props = {
  votes: number;
};

const VotesSpan = styled.span`
  color: #808080;
`;

export default function Votes({ votes }: Props) {
  return <VotesSpan>{votes} Votes</VotesSpan>;
}
