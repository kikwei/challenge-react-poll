import React from 'react';
import styled from 'styled-components';
import { ChoicesCtxt } from './Context';

const ChoicesWrapper = styled.div<{
  hasVoted?: boolean;
}>`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(227, 227, 227);
  border-radius: 8px;
  line-height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
  pointer-events: ${(props) =>
    props.hasVoted ? 'none' : 'normal'}; //Disable voting after one votes
`;

const WrapperDiv = styled.div<{
  spanWidth?: number;
  spanBackGroundColor?: string;
  fontWeight?: string;
}>`
  background: -webkit-linear-gradient(
    left,
    ${(props) => props.spanBackGroundColor} ${(props) => props.spanWidth}%,
    white 0%
  );
  background: -moz-linear-gradient(
    left,
    ${(props) => props.spanBackGroundColor} ${(props) => props.spanWidth}%,
    white 0%
  );
  background: -ms-linear-gradient(
    left,
    ${(props) => props.spanBackGroundColor} ${(props) => props.spanWidth}%,
    white 0%
  );
  background: linear-gradient(
    left,
    ${(props) => props.spanBackGroundColor} ${(props) => props.spanWidth}%,
    white 0%
  );
  margin: 0 auto;
  font-weight: ${(props) => props.fontWeight};
`;

const PercentageSpan = styled.span`
  float: right;
  margin-right: 10px;
`;

const NameSpan = styled.span`
  margin-bottom: 10px;
`;

export default function Choice() {
  const CurrentContext = React.useContext(ChoicesCtxt);
  const {
    choice,
    backGroundColor,
    percentage,
    handleVoting,
    isTheChosen,
    fontWeight,
    hasVoted,
  } = CurrentContext;

  return (
    <ChoicesWrapper onClick={() => handleVoting(choice)} hasVoted={hasVoted}>
      <WrapperDiv
        spanWidth={percentage}
        spanBackGroundColor={backGroundColor}
        fontWeight={fontWeight}
      >
        <NameSpan>{choice}</NameSpan>
        {isTheChosen ? (
          <>
            <img
              src={require('../static/check-circle.svg')}
              style={{
                position: 'absolute',
                maxWidth: '50px',
                marginLeft: '30px',
              }}
            />
          </>
        ) : (
          ''
        )}
        {hasVoted ? <PercentageSpan>{percentage}%</PercentageSpan> : ''}
      </WrapperDiv>
    </ChoicesWrapper>
  );
}
