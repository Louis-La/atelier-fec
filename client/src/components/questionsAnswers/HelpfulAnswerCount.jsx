import React from 'react';
import $ from 'jquery';
import interact from './Interaction.jsx';

class HelpfulAnswerCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ahelpid: props.id,
      pid: props.pid,
      ahelpfulcount: props.defaultcounter,
      answerVoted: false,
    };

    this.helpfulAincrementer = this.helpfulAincrementer.bind(this);
    this.increasecounter = this.increasecounter.bind(this);
  }

  increasecounter() {
    this.setState({
      ahelpfulcount: this.state.ahelpfulcount + 1,
      answerVoted: true,
    });
  }

  helpfulAincrementer() {
    if (!this.state.answerVoted) {
      $.ajax({
        method: 'POST',
        url: '/ahelpful',
        contentType: 'application/json',
        data: JSON.stringify({ ahelpid: this.state.ahelpid }),
        success: () => {
          this.increasecounter();
          console.log('helpfulAincrementer++');
        },
        error: () => {
          console.log('err helpfulAnswerAjax');
        },
      });
    }
  }

  render() {
    return (
      <div onClick={() => {interact('div', 'helpfulQuestionCounter'); }} className='helpfulQuestionCounter'>
        HelpFul?
        <button type="submit" onClick={this.helpfulAincrementer} className="helpfulQuestionCounter answerhelpfulbtn">Yes</button>
        ({this.state.ahelpfulcount})
      </div>
    );
  }
}

export default HelpfulAnswerCount;






