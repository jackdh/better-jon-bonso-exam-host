/* tslint:disable:jsx-no-lambda max-line-length */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import * as React from 'react';
import { Layout, Card, Button, Alert } from 'antd';
import baseQuestions from './data';
import Question from 'components/Question';
import styled from 'styles/styled-components';

import MainFooter from 'containers/Footer';
import store2 from 'store2';

const { Header, Footer, Content } = Layout;


const HeaderStyle = styled(Header)`
  color: white;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  .ant-btn {
      display: flex;
      flex: 1;
      height: 70px;
      justify-content: center;
  }
`;

interface State {
  questionNumber: number;
  showOptions: boolean;
}
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent<{}, State, any> {

  public componentDidMount() {
    if (!localStorage.getItem('correct')) {
      localStorage.setItem('correct', '0');
    }
    if (!localStorage.getItem('wrong')) {
      localStorage.setItem('wrong', '0');
    }
  }

  public state = {
    // @ts-ignore
    questionNumber: localStorage.getItem('questionNumber') ? parseInt(localStorage.getItem('questionNumber'), 10) : 0,
    showOptions: false,
  };

  public updateQuestion = (questionNumber: number) => {
    localStorage.setItem('questionNumber', questionNumber.toString());
    this.setState({ questionNumber: questionNumber });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  public render() {
    const correct = parseInt(localStorage.getItem('correct') as string, 10);
    const wrong = parseInt(localStorage.getItem('wrong') as string, 10);

    const percentage = correct / (correct + wrong) * 100;

    const stats = (
      <span>
      {isNaN(percentage) ? '0' : percentage.toFixed(2)}% | Correct: {correct} Wrong: {wrong}
      </span>
    );

    const data = store2('questionData') ? store2('questionData') : baseQuestions;

    const finished = this.state.questionNumber === data.length;

    const showDemo = data.length === 2;

    const showStats = store2('showStats');

    return (
      <Layout>
        <HeaderStyle>
          <span>
            Exam Four: | {showStats && stats}
          </span>
          <span style={{float: 'right'}}>
            <Button type="link" onClick={() => this.setState({showOptions: !this.state.showOptions})}>Options</Button>
          </span>
        </HeaderStyle>
        {showDemo && <Alert showIcon type="warning" message="Only Two Example Questions" description={<span>You can get more excellent questions from <a href="https://tutorialsdojo.com" target="_blank">tutorialsdojo</a>. This message will disappear when you insert the full exam.</span>} />}
        <Content>
          {finished && <Card>
            You're done!
            Correct: {correct}
            Wrong: {wrong}
            Percentage: {percentage}&
          </Card>}
          {!finished && <Card>
              <Question
                answers={data[this.state.questionNumber].prompt.answers}
                correct_response={data[this.state.questionNumber].correct_response}
                explanation={data[this.state.questionNumber].prompt.explanation}
                question_number={this.state.questionNumber}
                question={data[this.state.questionNumber].prompt.question}
                key={this.state.questionNumber}
              />
          </Card>}
          <ButtonWrap>
            {this.state.questionNumber !== 0 && <Button  onClick={() => this.updateQuestion(this.state.questionNumber - 1)} >Previous</Button>}
            {!finished && <Button  type="primary" onClick={() => this.updateQuestion(this.state.questionNumber + 1)} >Next</Button>}
          </ButtonWrap>
        </Content>
        {this.state.showOptions && <Footer>
          <MainFooter />
        </Footer>}
      </Layout>
    );
  }
}
