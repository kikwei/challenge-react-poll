import * as React from 'react';
import styled from 'styled-components';
import { QandAsDocument } from '../types';
import Question from './Question';
import Choice from './Choice';
import Votes from './Votes';
import { ChoicesCtxt } from './Context';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

type MappedAns = {
  votes: number;
  text: string;
  percentage?: number;
};

const PollWrapper = styled.div`
  z-index: 20;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(63, 63, 68, 0.1);
  background-color: #ffffff;
  padding: 4rem;
`;

export default function Poll({ qandas }: Props) {
  const [choice, setChoice] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [highestPercentage, setHighestPercentage] = React.useState(0);
  const [items, setItems] = React.useState<MappedAns[]>([]);

  const { questions } = qandas;

  // Picking a random question
  const [item] = React.useState(
    questions[Math.floor(Math.random() * questions.length)]
  );

  const [votes, setVotes] = React.useState(0);

  React.useEffect(() => {
    const { answers, question } = item;
    setItems(answers);
    setQuestion(question.text);
    setVotes(totalVotes(answers));
  }, [item]);

  //Calculate Total Votes
  const totalVotes = (answers: MappedAns[]) => {
    return answers.reduce(
      (previous: number, current: any) => previous + current.votes,
      0
    );
  };

  // Get votes percentages
  const setPercentages = (answers: MappedAns[]) => {
    const votesSum: number = totalVotes(answers);

    const answesWithPercentages = answers.map((answer) => ({
      ...answer,
      percentage: Math.round((answer.votes / votesSum) * 100),
    }));

    setItems(answesWithPercentages);

    let percentages: number[] = [];

    answesWithPercentages.forEach((answer) =>
      percentages.push(answer.percentage)
    );

    //Set the total votes
    setVotes(votesSum);

    setHighestPercentage(Math.max(...percentages));
  };

  // Handle click event on voting
  const handleVoting: Function = (choice: string) => {
    // Set the chosen answer
    setChoice(choice);

    // Increase votes count of the chosen answer by 1
    items.map((answer) =>
      answer.text === choice ? { ...answer, votes: answer.votes++ } : answer
    );

    setPercentages(items);
  };

  return (
    <PollWrapper>
      <Question question={question} />
      {choice === ''
        ? items.map((answer: any, key: number) => (
            <ChoicesCtxt.Provider
              value={{
                choice: answer.text,
                handleVoting: handleVoting,
                isTheChosen: choice === answer.text,
                backGroundColor: '#ffffff',
                percentage: answer.percentage,
                fontWeight: 'normal',
                hasVoted: choice !== '',
              }}
              key={key}
            >
              <Choice />
            </ChoicesCtxt.Provider>
          ))
        : items.map((answer: any, key: number) => (
            <ChoicesCtxt.Provider
              value={{
                choice: answer.text,
                handleVoting: handleVoting,
                isTheChosen: choice === answer.text,
                backGroundColor:
                  answer.percentage === highestPercentage
                    ? '#00FFFF'
                    : '#e0e0e0',
                percentage: answer.percentage,
                fontWeight:
                  answer.percentage === highestPercentage ? 'bold' : 'normal',
                hasVoted: choice !== '',
              }}
              key={key}
            >
              <Choice />
            </ChoicesCtxt.Provider>
          ))}
      <Votes votes={votes} />{' '}
    </PollWrapper>
  );
}
