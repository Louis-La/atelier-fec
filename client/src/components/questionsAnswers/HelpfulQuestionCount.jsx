import React from 'react';
import $ from 'jquery';
import interact from './Interaction.jsx';

class HelpfulQuestionCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qhelpid: props.id,
      pid: props.pid,
      qhelpfulcount: props.defaultcounter,
      questionVoted: false,
    };
    this.helpfulQincrementer = this.helpfulQincrementer.bind(this);
    this.increasecounter = this.increasecounter.bind(this);
  }

  increasecounter() {
    this.setState({
      qhelpfulcount: this.state.qhelpfulcount + 1,
      questionVoted: true,
    });
  }

  helpfulQincrementer() {
    if (!this.state.questionVoted) {
      $.ajax({
        method: 'POST',
        url: '/qhelpful',
        contentType: 'application/json',
        data: JSON.stringify({ qhelpid: this.state.qhelpid }),
        success: () => {
          this.increasecounter();
          console.log('helpfulQincrementer++ ');
        },
        error: () => {
          console.log('err helpfulAnswerAjax');
        },
      });
    }
  }

  render() {
    const margins = {
      marginTop: '-.2em',
      marginLeft: '-.8em',
      marginRight: '-1.4em'
    };

    return (
      <div onClick={() => {interact('div', 'helpfulQuestionCounter'); }}
        className=" helpfulQuestionCounter">
        Helpful? |
        <button
          type="submit"
          className="helpfulQuestionCounter questionhelpfulbtn"
          onClick={() => {
            this.helpfulQincrementer();
          }}
        >
          <div style={margins}>Yes</div>
        </button>
        ({this.state.qhelpfulcount})
      </div>
    );
  }
}

export default HelpfulQuestionCount;