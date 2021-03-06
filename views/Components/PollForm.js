import React from "react";

export default class PollForm extends React.Component {
    constructor() {
        super();
        this.state = {
          title: '',
          options: [
            {
              text: ''
            },
            {
              text: ''
            }
          ]
        };
        
        this.addInputs = this.addInputs.bind(this);
        this.removeInputs = this.removeInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleOptionInput = this.handleOptionInput.bind(this);
    }
    
    handleTitleInput(e) {
        this.setState({
          title: e.target.value
        });
    }
    
    handleOptionInput(i, e) {
        let newOptions = JSON.parse(JSON.stringify(this.state.options));
        newOptions[i].text = e.target.value;
        this.setState({
          options: newOptions
        });
    }
    
    addInputs() {
        let newOptions = JSON.parse(JSON.stringify(this.state.options));
        newOptions.push({text: ''});
        this.setState({
          options: newOptions
        });
    }
    
    removeInputs() {
        let newOptions = JSON.parse(JSON.stringify(this.state.options));
        newOptions.pop();
        this.setState({
          options: newOptions
        });
    }
    
    handleSubmit() {
        let title = JSON.parse(JSON.stringify(this.state.title));
        let options = JSON.parse(JSON.stringify(this.state.options));
        let obj = {};
        obj.title = title;
        obj.options = options;
        this.props.submit(obj);
        this.setState({title: '', options: [{text: ''}, {text: ''}]});
    }
    
    render() {
    var inputNodes = this.state.options.map((input, i) => {  
      return (
        <div className="form-group" key={i}>
          <label htmlFor={"Input" + (i+1)}>{"Poll Item " + (i+1)}</label>
          <input
            className="form-control input-lg" 
            id={"Input" + (i+1)}
            name={"Input" + (i+1)}
            type="text" 
            value={this.state.options[i].text}
            onChange={this.handleOptionInput.bind(this, i)}
            placeholder={"Poll Item " + (i+1)} 
          />
        </div>
      );
    });
    return (
      <div className="container well">
        <h3 className="text-center">Create your New Poll</h3>
        <form>
          <input type="text" className="form-control input-lg" value={this.state.title} placeholder="Title" onChange={this.handleTitleInput} name="title"/>
          {inputNodes}
          <label>Adjust Number of Options</label><br/>
          <input type="button" className="btn btn-primary" value="+" onClick={this.addInputs}/>
          <input type="button" className="btn btn-danger" value="-" onClick={this.removeInputs}/>
          <input type="button" className="btn btn-success pull-right" value="Create Poll" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
    }
}