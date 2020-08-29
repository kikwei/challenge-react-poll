import React from 'react';
import styled from 'styled-components';

const ChoicesWrapper = styled.div<{
  disabled?: boolean;
}>`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(227, 227, 227);
  border-radius: 8px;
  line-height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
  pointer-events: ${(props) =>
    props.disabled ? 'none' : 'normal'}; //Disable voting after one votes
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

type Props = {
  choice: string;
  backGroundColor: string;
  percentage: number;
  handleVoting: Function;
  chosen: boolean;
  fontWeight: string;
  disabled: boolean;
};

export default function Choice({
  choice,
  backGroundColor,
  percentage,
  handleVoting,
  chosen,
  fontWeight,
  disabled,
}: Props) {
  return (
    <ChoicesWrapper onClick={() => handleVoting(choice)} disabled={disabled}>
      <WrapperDiv
        spanWidth={percentage}
        spanBackGroundColor={backGroundColor}
        fontWeight={fontWeight}
      >
        <NameSpan>{choice}</NameSpan>
        {chosen ? (
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
        {disabled ? <PercentageSpan>{percentage}%</PercentageSpan> : ''}
      </WrapperDiv>
    </ChoicesWrapper>
  );
}
