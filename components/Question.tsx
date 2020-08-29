import React from 'react';

type Props = {
  question: string;
};

export default function Question({ question }: Props) {
  return <h3>{question}</h3>;
}
