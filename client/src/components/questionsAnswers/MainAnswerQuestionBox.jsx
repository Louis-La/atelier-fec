import React from 'react';
import Moment from 'react-moment';
import AskQuestions from './AskQuestionButtons.jsx';
import AnswerReport from './AnswerReport.jsx';
import QuestionReport from './QuestionReport.jsx';
import HelpfulAnswerCount from './HelpfulAnswerCount.jsx';
import HelpfulQuestionCount from './HelpfulQuestionCount.jsx';
import AnswerForm from './AnswerForm.jsx';

const MainAnswerQuestionBox = (props) => {

  const margins = {
    marginRight: '-.3em',
    marginLeft: '-.3em',
  };

  const QABOX = props.questionanswerslist.slice(0, props.visibleQuestions).map((data, index) => (
    <div key={index} className='QABOX'>
      <div key={data.qID}>
        <ul>
          <div className="questionbox">
            <b>
              <p className={data.answers[0] ? 'question' : 'question'}> Q:  {data.question} </p>
            </b>
            <div className="questionuserbar qbarspacing">
              <div style={margins}>
                <HelpfulQuestionCount
                  pid={props.productId}
                  id={data.qID}
                  defaultcounter={data.questionHelpful}
                />
              </div>
              |
              <p>{ data.question_helpfulness}</p>
              <QuestionReport qid={data.qID} />
              |
              <AnswerForm pid={props.productId} qid={data.qID} updateQuestions={props.updateQuestions}/>
            </div>
          </div>
        </ul>
        <div>
          <div>
            <ul>
              {data.answers.slice(0, props.visibleAnswers).map(answerlist => (
                <div key={answerlist.id}>
                  <p className={answerlist.body[0] ? 'answerbox' : 'answerbox'}> <b>A:‍‍ _‍</b>   {answerlist.body.toString().toLowerCase()}
                  </p>
                  <div className="userinfobox">
                    by:{' '}
                    { answerlist.answerername.toLowerCase() === 'seller'
                      ? <b> {answerlist.answerername} </b>
                      : answerlist.answerername}
                    {' '}|
                    <Moment format="MMMM-DD-YYYY" date={answerlist.date} />
                    |
                    <HelpfulAnswerCount
                      id={answerlist.id}
                      pid={props.productId}
                      defaultcounter={answerlist.helpfulness}
                    />
                    |
                    <AnswerReport aID={answerlist.id}/>
                  </div>
                  <div>
                    {answerlist.photos.map((photo, index) => {
                      return (
                        <div className='imagezoom iimg iimg-spacing' key={index}>
                          <img src={photo} className='iimg' alt='photo' />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </ul>
            <p className='seperator'>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex-container" >
      {QABOX}
      <AskQuestions
        loadMoreAnswers={props.loadMoreAnswers}
        loadMoreQuestions={props.loadMoreQuestions}
        btnvisible={props.btnvisible}
        btnvisibleq={props.btnvisibleq}
        mainProductId={props.productId}
        updateQuestions={props.updateQuestions}
      />
    </div>
  );
};

export default MainAnswerQuestionBox;
