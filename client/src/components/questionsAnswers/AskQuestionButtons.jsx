import React from 'react';
import LoadMoreAnswers from './LoadMoreAnswers.jsx';
import QuestionForm from './QuestionForm.jsx';
import interact from './Interaction.jsx';

const AskQuestions = (props) => (
  <div className='loadmore-a'>
    <LoadMoreAnswers
      loadMoreAnswers={props.loadMoreAnswers}
      btnvisible={props.btnvisible}
    />
    <div
      className="buttons buttoncontainers">
      <button onClick={() => { interact('button', 'MORE ANSWERED QUESTIONS'); }} className={props.btnvisibleq ? 'loadanswers' : 'btndisappear'}
        onClick={props.loadMoreQuestions}
        type="submit">
        MORE QUESTIONS
      </button>
      <QuestionForm mainProductId={props.mainProductId} updateQuestions={props.updateQuestions}/>
    </div>
  </div>
);

export default AskQuestions;