import React from 'react';
import interact from './Interaction.jsx';

class AnswerReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      reportedArray: [],
      reportedID: this.aID = this.props,
    };
    this.reportedBtn = this.reportedBtn.bind(this);
  }
  reportedBtn() {
    if (!this.state.reportedArray.includes(this.state.reportedID)) {
      this.setState({
        reported: true,
      });
    } else {
      this.setState({
        reported: false,
      });
    }
  }
  render() {
    return (
      <div onClick={() => {interact('div', 'AnswerReportButton')}}>
        <button type="submit" onClick={this.reportedBtn} className=" reporthelpful-btn">
          {this.state.reported ? 'Reported' : 'Report'}
        </button>
      </div>
    );
  }
}
export default AnswerReport;