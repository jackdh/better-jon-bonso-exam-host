/* tslint:disable:jsx-no-lambda */
/**
 *
 * Question
 *
 */

import React from 'react';
import { Card, Checkbox, Row, Divider, Radio, Tag, Alert, Button } from 'antd';
import { has } from 'lodash';
import styled from 'styles/styled-components';

const order = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
};

const Wrap = styled.section`
  display: flex;
  flex-direction: row;
  img {
    width: 100%;
  }
`;

// border: ${(p: {border: boolean}) => p.border ? 1 : 0}px solid #dcd3d3;


const Left = styled.div`
  flex: 0 0 20px;
  min-height: 50px;
  border: 1px solid #dcd3d3;
  border-radius: 5px;
  cursor: pointer;
`;

const LeftButton = styled(Left)`
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;
  &:hover {
    transition: background-color 0.5s ease;
    border: 1px solid #dcd3d3;
    background-color: rgba(144,168,243,0.3);
  }
  .ant-radio-wrapper {
    margin-right: 0;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  max-width: calc(100% - 15px);
`;

const UL = styled.div`
  max-width: 100%
`;


interface Props {
  question: string;
  answers: string[];
  correct_response: string[];
  explanation: string;
  question_number: number;
}

interface State {
  cache: any;
  selected: string[];
  open: boolean;
}
// tslint:disable-next-line:variable-name
const getSelected = questionNumber => {
  return localStorage.getItem(`${questionNumber}-selected`)
    ? (JSON.parse(localStorage.getItem(
    `${questionNumber}-selected`,
    ) as string) as string[])
    : [];
};

export class Question extends React.PureComponent<Props, State> {
  public state: State = {
    selected: getSelected(this.props.question_number),
    cache: {},
    open: this.props.correct_response.length === getSelected(this.props.question_number).length,
  };

  public markAsDone = num => {
    if (!localStorage.getItem('cache')) {
      localStorage.setItem('cache', JSON.stringify({}));
    }
    const cache: any = JSON.parse(localStorage.getItem('cache') as string);

    if (has(cache, num)) {
      delete cache[num];
    } else {
      cache[num] = true;
    }

    localStorage.setItem('cache', JSON.stringify(cache));
    this.setState({ cache: cache });
  };

  public isDone = num => {
    if (!localStorage.getItem('cache')) {
      localStorage.setItem('cache', JSON.stringify({}));
    }

    const cache: any = JSON.parse(localStorage.getItem('cache') as string);

    return has(cache, num);
  };

  public updateStorage = () => {
    localStorage.setItem(
      `${this.props.question_number}-selected`,
      JSON.stringify(this.state.selected),
    );
  };

  public toggleAnswer = (item: string) => {
    if (
      !this.state.selected.includes(order[item]) &&
      this.state.selected.length < this.props.correct_response.length
    ) {
      this.setState({ selected: this.state.selected.concat(order[item]) }, () =>
        this.updateStorage(),
      );
    } else {
      this.setState(
        {
          selected: this.state.selected.filter(x => x !== order[item]),
        },
        () => this.updateStorage(),
      );
    }
  };

  public radioAnswer = (item: string) => {
    if (!this.state.open) {
      this.setState({ selected: [item] }, () => this.updateStorage());
    }
  };

  public isCorrect = () => {
    let correct = true;
    // @ts-ignore
    this.state.selected.forEach(r => {
      if (!this.props.correct_response.includes(r)) {
        correct = false;
      }
    });
    return correct;
  };

  public submitAnswer = () => {
    let correct = parseInt(localStorage.getItem('correct') as string, 10);
    let wrong = parseInt(localStorage.getItem('wrong') as string, 10);

    if (this.isCorrect()) {
      correct += 1;
      localStorage.setItem('correct', (correct).toString());
    } else {
      wrong += 1;
      localStorage.setItem('wrong', (wrong).toString());
    }

    this.setState({ open: true});

  };

  public render() {
    const {
      question,
      answers,
      correct_response,
      explanation,
      question_number,
    } = this.props;

    const isDone = this.isDone(question_number);

    return (
      <div>
        <h3>Question Number: {question_number}</h3>

        <Wrap>
          <Left onClick={() => this.markAsDone(question_number)} />
          <Right>
            {!isDone && (
              <React.Fragment>
                <div dangerouslySetInnerHTML={{ __html: question }} />
                <p>Select: {correct_response.length}</p>
                <UL>
                  {correct_response.length === 1 && answers.map((answer, i) => {
                      return (
                        <Row key={i} style={{ marginBottom: '15px' }}>
                          <Wrap onClick={() => this.radioAnswer(order[i])}>
                            <LeftButton>
                              <Radio
                                value={i}
                                checked={this.state.selected.includes(order[i])}
                              />
                            </LeftButton>
                            <Right>
                              {order[i]} -{' '}
                              <span dangerouslySetInnerHTML={{__html: answer}}/>
                            </Right>
                          </Wrap>

                          <Divider />
                        </Row>
                      );
                    })}
                  {correct_response.length !== 1 && (
                    <React.Fragment>
                      {answers.map((answer, i) => {
                        return (
                          <Row key={i} style={{ marginBottom: '15px' }}>
                            <Checkbox
                              checked={this.state.selected.includes(order[i])}
                              value={i}
                              onChange={e => this.toggleAnswer(e.target.value)}
                              disabled={
                                !this.state.open &&
                                !this.state.selected.includes(order[i]) &&
                                this.state.selected.length ===
                                  correct_response.length
                              }
                            >
                              {order[i]} -{' '}
                              {answer.replace(/<\/?[^>]+(>|$)/g, '')}
                            </Checkbox>
                            <Divider />
                          </Row>
                        );
                      })}
                    </React.Fragment>
                  )}
                </UL>
                {correct_response.length === this.state.selected.length && (
                  <div>
                    {!this.state.open && <Button onClick={this.submitAnswer}>Click to open</Button>}
                    {this.state.open && <Card>
                      <Alert
                        type={this.isCorrect() ? 'success' : 'error'}
                        message={
                          <span>
                            {this.isCorrect() ? 'Correct: ' : 'Wrong: '}
                            {correct_response.map(r => (
                              <Tag key={r}>{r}</Tag>
                            ))}
                          </span>
                        }
                      />
                      <div dangerouslySetInnerHTML={{ __html: explanation }} />
                    </Card>}
                  </div>
                )}
              </React.Fragment>
            )}

            <hr />
          </Right>
        </Wrap>
      </div>
    );
  }
}

export default Question;
