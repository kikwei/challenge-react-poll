import React from 'react';

type Props = {
  question: string;
};

const Question = ({ question }: Props) => {
  return <h3>{question}</h3>;
};

export default Question;
