import * as React from 'react';
import styled from 'styled-components';
import { QandAsDocument } from '../types';
import Question from './Question';
import Choice from './Choice';
import Votes from './Votes';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  z-index: 20;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(63, 63, 68, 0.1);
  background-color: #ffffff;
  padding: 4rem;
`;

export default function Poll({ qandas }: Props) {
  const { questions } = qandas;

  // Picking a random question
  const [item] = React.useState(
    questions[Math.floor(Math.random() * questions.length)]
  );

  // Access the answers and question from the randomly picked question
  const { answers, question } = item;

  // Get the initial total votes
  const [votes, setVotes] = React.useState(
    answers.reduce(
      (previous: number, current: any) => previous + current.votes,
      0
    )
  );

  const [choice, setChoice] = React.useState('');
  const [highestPercentage, setHighestPercentage] = React.useState(0);

  // Handle click event on voting
  const handleVoting: Function = (choice: string) => {
    // Set the chosen answer
    setChoice(choice);

    // Increse votes count of the chosen answer by 1
    answers.map((answer) =>
      answer.text === choice ? { text: choice, votes: answer.votes++ } : answer
    );

    // Votes summation
    let totalVotes: number = answers.reduce(
      (previous: number, current: any) => previous + current.votes,
      0
    );

    // Set the total votes
    setVotes(totalVotes);

    // Calculate percentages and set the highest percentage
    let percentages: number[] = [];

    answers.forEach((choice) =>
      percentages.push(Math.round((choice.votes / totalVotes) * 100))
    );

    setHighestPercentage(Math.max(...percentages));
  };

  return (
    <PollWrapper>
      <Question question={question.text} />
      {choice === ''
        ? answers.map((answer: any, key: number) => (
            <Choice
              key={key}
              choice={answer.text}
              backGroundColor={'#ffffff'}
              percentage={0}
              handleVoting={handleVoting}
              chosen={choice === answer.text}
              fontWeight={'normal'}
              disabled={choice !== ''}
            />
          ))
        : answers.map((answer: any, key: number) => (
            <Choice
              key={key}
              choice={answer.text}
              backGroundColor={
                Math.round((answer.votes / votes) * 100) === highestPercentage
                  ? '#00FFFF'
                  : '#e0e0e0'
              }
              percentage={Math.round((answer.votes / votes) * 100)}
              handleVoting={handleVoting}
              chosen={choice === answer.text}
              fontWeight={
                Math.round((answer.votes / votes) * 100) === highestPercentage
                  ? 'bold'
                  : 'normal'
              }
              disabled={choice !== ''}
            />
          ))}

      <Votes votes={votes} />
    </PollWrapper>
  );
}
