import React from 'react';
import $ from 'jquery';
import MainAnswerQuestionBox from './MainAnswerQuestionBox.jsx';
import SearchBar from './searchBar.jsx';

class QuestionsAnswersState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnvisible: true,
      btnvisibleq: true,
      visibleAnswers: 2,
      visibleQuestions: 2,
      questionanswerslist: [],
      questionsList: [],
      startinglist: [],
      isReported: false,
      searchTerm: '',
      productId: props.productId,
    };

    this.sendProductIdToServer = this.sendProductIdToServer.bind(this);
    this.getQuestionsApi = this.getQuestionsApi.bind(this);
    this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
    this.getQuestionAnswerList = this.getQuestionAnswerList.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getQuestionsApi();
  }

  componentDidUpdate() {
    if (this.state.productId !== this.props.productId) {
      this.getQuestionsApi();
      this.setState({
        productId: this.props.productId,
      });
    }
  }

  getQuestionsApi() {
    fetch(`/questions?qid=${this.state.productId}`)
      .then((response) => response.json())
      .then((questions) => {
        // more than 2 questions, load more question button will not appear
        if (questions.results.length > 2) {
          this.setState({
            btnvisibleq: true,
          });
        // less than 2 questions, load more question button will not appear
        } else if (questions.results.length < 2) {
          this.setState({
            btnvisibleq: false,
            btnvisible: false,
          });
        }
        this.setState({
          questionsList: questions.results
        });
      })
      .then(() => {
        this.sendProductIdToServer();
        this.getQuestionAnswerList();
      });
    // console.log('getQuestionsApi test');
  }

  getQuestionAnswerList() {
    const list = this.state.questionsList;
    const newObj = [];
    list.map(e => {
      let answersList = Object.values(e.answers);
      let sellerListPriority = [];
      let sortedAnswersByHelpfulCount = [];
      let sellerAndHelpfulCounterSorted = [];

      //create new answer list to be sorted
      answersList.map(e => {
        //if seller add to priority array
        if (e.answerer_name.toLowerCase() === 'seller') {
          sellerListPriority.push({
            answerername: e.answerer_name,
            body: e.body,
            date: e.date,
            helpfulness: e.helpfulness,
            id: e.id,
            photos: e.photos
          });
        } else {
        // if not seller push to array
          sortedAnswersByHelpfulCount.push({
            answerername: e.answerer_name,
            body: e.body,
            date: e.date,
            helpfulness: e.helpfulness,
            id: e.id,
            photos: e.photos
          });
        }
        // sorting answer list by helpful counter
        sortedAnswersByHelpfulCount.sort(function(a,b) {
          return b.helpfulness - a.helpfulness;
        });
        //merge seller list with sorted helpful array to get final list
        sellerAndHelpfulCounterSorted = sellerListPriority.concat(sortedAnswersByHelpfulCount);
        return sellerAndHelpfulCounterSorted;
      });
      // setting the current react state with sorted answers list
      newObj.push({
        qID: e.question_id,
        question: e.question_body,
        questionHelpful: e.question_helpfulness,
        answers: sellerAndHelpfulCounterSorted
      });
    });
    this.setState({
      questionanswerslist: newObj
    }, () => {
      const list = this.state.questionanswerslist;
      const term = this.state.searchTerm;
      // Checks searched term and filters list to show only searched questions if 3 charactors are entered
      list.map((e, index) => {
        if (e.question.toLowerCase().includes(term.toLowerCase()) && term.length >= 3 ) {
          this.setState({
            questionanswerslist: list.splice(index, this.state.visibleQuestions),
          });
        }
      });
    });
  }

  //Function sends main app current productID to server
  sendProductIdToServer() {
    const productID = { pid: this.state.productId };
    $.ajax({
      method: 'POST',
      url: '/questions',
      contentType: 'application/json',
      data: JSON.stringify(productID),
      success: () => {
        // console.log('pID sent success');
      },
      error: () => {
        console.log('err sendProductIdToServer');
      },
    });
  }

  loadMoreAnswers() {
    //Sorts the answer array of all questions to get max length
    const answersArray = this.state.questionanswerslist.map(e => {
      return e.answers.length;
    });
    const sorted = answersArray.sort(function(a,b) {
      return b - a;
    });

    //Check if any more answers left if not load answers button disappears
    if ((this.state.visibleAnswers >= sorted[0]) || (answersArray.length === 0)) {
      this.setState({
        btnvisible: false,
      });
    }
    this.setState((prev) => ({ visibleAnswers: prev.visibleAnswers + 2 }));
  }

  loadMoreQuestions() {
    // checks to see question displayed length is equal or greater than list of questions
    if (this.state.visibleQuestions > this.state.questionanswerslist.length) {
      // if there no more questions make more question button disappear
      this.setState({
        btnvisibleq: false,
      });
    } else {
      this.setState((prev) => ({ visibleQuestions: prev.visibleQuestions + 2 }));
      this.getQuestionsApi();
    }
  }

  search(term) {
    //sets search term as variable
    let searchTerm = term;
    this.setState({
      searchTerm: searchTerm
    });
    // check if at least 3 charactor type before searching questions/keywords match
    if (searchTerm.length >= 3) {
      this.setState({
        questionanswerslist: this.getQuestionsApi(),
        visibleQuestions: 2,
        visibleAnswers: 2
      });
    }
    this.getQuestionsApi();
    this.getQuestionAnswerList();
  }

  render() {
    return (
      <div>
        <div className="search">
          <SearchBar
            onSearch={this.search}
          />
        </div>
        <div className={this.state.visibleQuestions > 2 || this.state.visibleAnswers > 2 ? 'q-a-box-scroll question-scroll answerbox-scroll' : 'q-a-box'}>
          <MainAnswerQuestionBox
            questionsList={this.state.questionsList}
            answersList={this.state.answersList}
            loadMoreAnswers={this.loadMoreAnswers}
            loadMoreQuestions={this.loadMoreQuestions}
            visibleAnswers={this.state.visibleAnswers}
            visibleQuestions={this.state.visibleQuestions}
            btnvisibleq={this.state.btnvisibleq}
            btnvisible={this.state.btnvisible}
            photos={this.state.photos}
            productId={this.state.productId}
            searched={this.state.searched}
            searchTerm={this.state.searchTerm}
            questionanswerslist={this.state.questionanswerslist}
            updateQuestions={this.getQuestionsApi}
          />
        </div>
      </div>
    );
  }
}
export default QuestionsAnswersState;