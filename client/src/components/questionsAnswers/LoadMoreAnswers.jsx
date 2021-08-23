import React from 'react';
import interact from './Interaction.jsx';

const LoadMoreAnswers = (props) => (
  <div>
    <button type="submit buttoncontainers" onClick={props.loadMoreAnswers} className={props.btnvisible ? 'loadmoreanswers' : 'btndisappear'}>LOAD MORE ANSWER!</button>
  </div>
);

export default LoadMoreAnswers;