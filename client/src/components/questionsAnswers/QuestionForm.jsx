import React from 'react';
import $ from 'jquery';
import interact from './Interaction.jsx';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      currentPID: props.mainProductId,
      body: '',
      name: '',
      email: '',
      photos: [],
      nameValid: true,
      emailValid: true,
      bodyValid: true
    };

    this.onOpenForm = this.onOpenForm.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.showForm = this.showForm.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.onCloseForm = this.onCloseForm.bind(this);
  }

  onOpenForm() {
    this.setState({ showForm: true });
    interact('form', 'add question form')
  }

  onChangeBody(e) {
    this.setState({
      body: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onCloseForm() {
    if (this.state.showForm === true) {
      console.log('clicked');
      this.setState({
        showForm: false,
      });
    }
  }

  formValidation() {
    const name = this.state.name;
    const body = this.state.body;
    const email = this.state.email;

    let validForm = true;

    if (!name) {
      validForm = false;
      this.setState({
        nameValid: false
      });
    }

    if (!body) {
      validForm = false;
      this.setState({
        bodyValid: false
      });
    }

    if (!email.includes('@') || !email.includes('.com')) {
      validForm = false
      alert('Email just be email format')
      this.setState({
        emailValid: false
      });
    }

    if (!email) {
      validForm = false;
      this.setState({
        emailValid: false
      });
    }

    if (name === 'undefined') {
      if (!name.match(/^[a-zA-Z0-9]+$/)) {
        validForm = false;
        this.setState({
          nameValid: false
        });
      }
    }

    if ( name && body && email) {
      return validForm;
    }
  }

  addQuestion(e) {
    e.preventDefault();


    // checks and alert user if any of these fields are empty
    if (this.state.body === '') {
      alert('Please enter a valid Answer');
    } else if (this.state.email === '') {
      alert(`Please enter a valid email`);
    } else if (this.state.name === '') {
      alert(`Please enter a valid UserName`);
    }

    if (this.formValidation()) {
      const info = {
        body: this.state.body,
        name: this.state.name,
        email: this.state.email,
        product_id: this.state.currentPID
      };
      $.ajax({
        method: 'POST',
        url: '/addQuestion',
        contentType: 'application/json',
        data: JSON.stringify(info),
        success: () => {
          this.setState({
            showForm: false,
            body: '',
            name: '',
            email: '',
            photos: []
          });
          alert('Question Posted Successfully');
          this.props.updateQuestions();
        },
        error: () => {
          console.log('error in addQuestion');
        },
      });
    } else {
    }
  }

  showForm() {
    const divStyle = {
      margin: '0px',
      height: '15vh',
      width: '34vh',
      fontSize: '2.5em',
    };
    const text = {
      fontSize: '2em',
      marginBottom: '-3em'
    };

    const placeholdertext = {
      fontSize: '2.5em',
      width: '34vh'
    };

    const formlabeltext = {
      fontSize: '4em',
      textDecoration: 'none'
    };

    return (
      <div className="qboxcenter">
        <form>
          <button type="submit" className='X' onClick={this.onCloseForm}>X</button>
          <h1 className='questionboxtitle'>Add Question</h1>
          <label>
            <p style={formlabeltext}> Enter UserName*</p>
            <input
              style={placeholdertext}
              value={this.state.name}
              onChange={this.onChangeName}
              type="text"
              name="name"
              maxLength="60"
              placeholder="Example: jack543!**"
            />
          </label>
          < br/>
          <label style={text}> For privacy reasons, do not use your full name or email address**</label>
          <label>
            <p style={formlabeltext}> Enter Email Here*</p>
            <input
              style={placeholdertext}
              value={this.state.email}
              onChange={this.onChangeEmail}
              type="text"
              name="Email"
              placeholder="Example: jack@gmail.com*"
              pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            />
          </label>
          < br/>
          <label style={text}> For authentication reasons, you will not be emailed**</label>
          < br/>
          <label>
            <p style={formlabeltext}> Enter Question Here*</p>
            <textarea
              value={this.state.body}
              onChange={this.onChangeBody}
              type="text"
              cols="50"
              rows="50"
              style={divStyle}
              placeholder="Example: Is this pretty!**"
            />
          </label>
          < br/>
          <input className='questionbutton upload'
            type="submit"
            onClick={this.addQuestion}
            value="Post Answer"
          />
        </form>
      </div>
    );
  }

  render() {
    const { showForm } = this.state;
    return (
      <div className="buttons buttoncontainers">
        <button className="addqbtn" type="submit" onClick={ this.onOpenForm }>
          ADD A QUESTION➕
          {showForm && this.showForm()}
        </button>
      </div>
    );
  }
}

export default QuestionForm;