import React from "react";
import {Router, Route, Link}  from "react-router";
import $ from 'jquery';
import {rect, line, text} from "./ChartFunctions";
import BarChart from './BarChart';
import BarChartRS from './BarChartRS_es6';

export default class Poll extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            id: this.props.id,
            poll: this.props.poll,
            owner: false,
            chart: true,
            option: '',
            customOption: '',
            addCustom: false,
            baseURL: ''
        };
        
        //this.getOwner = this.getOwner.bind(this);
        this.toggleChart = this.toggleChart.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.cancelCustom = this.cancelCustom.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.toggleCustom = this.toggleCustom.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.handleCustomInput = this.handleCustomInput.bind(this);
    }
    
    getOwner() {
        //if(!this.props._id){this.getUser();}
        if(this.props._id == this.props.poll.author) {
            this.setState({
               owner: true 
            });
        }
    }
    
    handleVote() {
        let obj = {};
        obj.option = this.state.option;
        obj._id = this.state.poll._id;
        this.props.vote(obj);
        this.cancelCustom();
    }
    
    handleDelete() {
        this.props.del(this.state.poll._id);  
    }
    
    handleOption(e) {
        this.setState({option: e.target.value});
    }
    
    handleCustomInput(e) {
        this.setState({
            customOption: e.target.value,
            option: e.target.value 
        });
    }
    
    cancelCustom() {
        this.setState({
            customOption: '',
            addCustom: false
        });
    }
    
    toggleCustom() {
        this.setState({addCustom: true});
    }
    
    toggleChart() {
        this.setState({chart: !this.state.chart});
    }
    
    componentDidMount() {
        this.getOwner();
        let thisURLSplit = window.location.href.split('/');
        let baseURL = thisURLSplit[2];
        this.setState({baseURL: 'https://' + baseURL});
        this.setState({option: this.state.poll.options[0].text});
    }
    
    componentWillReceiveProps(newProps) {
        this.setState({poll : newProps.poll});
        this.setState({_id: newProps._id});
        this.setState({option: newProps.poll.options[0].text});
        this.getOwner();
    }
    
    render() {
        let VoteList = this.state.poll.options.map((option, i) => {
            return (
                <li key={i}>{option.text}: {option.votes}</li>  
            );
        });
        
        let Chart = (
            <div className="dataViz col-xs-8" onClick={this.toggleChart}>
                <p className="text-center">Click to toggle Chart view</p>
                <BarChartRS className='center-block' ref={`div${this.state.poll._id}`} poll={this.state.poll} width={600} height={300} margin={20}/>
            </div>
        );
        
        let List = (
            <div className="dataViz col-xs-8" onClick={this.toggleChart}>
                <p className="text-center">Click to toggle Chart view</p>
                <ul>{VoteList}</ul>
            </div>
        );
        
        let dataViz = this.state.chart ? Chart : List;
            
        let optionNodes = this.state.poll.options.map((opt, i) => {
            return (
                <option key={i} value={opt.text}>{opt.text}</option>
            );
        });
        
        //Delete button
        let delButton = this.state.owner ? 
            (<input id="del" type="button" className="col-xs-12 btn btn-danger" value="Delete" onClick={this.handleDelete}/>) : 
            (<input id="del" type="button" className="col-xs-12 btn btn-danger hidden" value="Delete"/>);
        
        //Custom option
        let customVB = this.state.addCustom && this.state.customOption ?        //Custom Vote Button
            <span className="btn btn-primary col-xs-4" onClick={this.handleVote}>Vote</span> :
            <span className="btn btn-primary disabled col-xs-4">Vote</span>;
        
        let custom = this.state.addCustom ? 
            (
                <div className="form-group">
                    <input className="form-control col-xs-8" type="text" placeholder='Custom Option' value={this.state.customOption} onChange={this.handleCustomInput}/>
                    <span className="btn btn-danger col-xs-4" onClick={this.cancelCustom}>Cancel</span>
                    {customVB}
                    </div>
            ) : 
            (<h5 onClick={this.toggleCustom}>Click here to create your own option</h5>);
        let noAuth = <span></span>;
        let showCustom = this.props.auth ? custom : noAuth;
        
        //Twitter share button
        let tweetString = `https://twitter.com/intent/tweet?text=Hey, check out my new poll. ${this.state.poll.title}&url=${this.state.baseURL}/poll/${this.state.poll._id}`;
        let tweet = encodeURI(tweetString);
        
        return (
            <div className="col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <Link to={`/poll/${this.state.poll._id}`}>
                            <h4 className="panel-title">{this.state.poll.title}</h4>
                        </Link>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-3">
                                {showCustom}
                                <select className="col-xs-12" ref="select" onChange={this.handleOption}>
                                    {optionNodes}
                                </select>
                            </div>
                            {dataViz}
                        </div>
                        <div className="row">
                            <div className="col-xs-3">
                                <input id="vote" 
                                    type="button" 
                                    className="col-xs-12 btn btn-primary" 
                                    value="Vote" 
                                    onClick={this.handleVote}
                                />
                                <a href={tweet} className="col-xs-12 btn btn-twitter ">
                                    <span className="fa fa-twitter-square" alt="twitter logo"></span> Twitter
                                </a>
                            </div>
                            <div className="col-xs-8">
                                {delButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}