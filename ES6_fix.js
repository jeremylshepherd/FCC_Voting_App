
// import React, {Component} from "react";
// import Nav from "./Nav";
// import Footer from "./Footer";
// import Jumbotron from "./Jumbotron";
// import Subotron from "./Subotron";
// import Poll from './Poll';
// import InfoColumn from "./InfoColumn";
// import PollForm from "./PollForm";
// import {Link} from 'react-router';
// import $ from "jquery";


// export default class ReactApp extends Component {
//     constructor() {
//         super();
//         this.state = {
//             user: {},
//             username: '',
//             auth: false,
//             polls: [],
//             avatar: '',
//             addPoll: false
//         };
//     }
    
//     getUser() {
//       $.ajax({
//         url: '/api/me',
//         dataType: 'json',
//         cache: false,
//         success: function(data) {
//           this.setState({
//               user: data,
//               displayName: data.github.displayName,
//               username: data.github.username,
//               avatar: data.github.avatar,
//               auth: true
//             });
//             this.loadPolls();
//         }.bind(this),
//         error: function(xhr, status, err) {
//           console.error('/api/me', status, err.toString());
//         }.bind(this)
//       });
//     }
    
//     loadPolls() {
//         if(!this.state.username){
//             return;
//         }
//         $.ajax({
//           url: '/api/' + this.state.username + '/polls',
//           dataType: 'json',
//           cache: false,
//           success: function(data) {
//             console.log('Loaded!');
//             this.setState({
//                 polls: data
//               });
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error('/' + this.state.user.github.username + '/polls', status, err.toString());
//           }.bind(this)
//         });
//     }
    
//     addNewPoll(obj) {
//         let poll = obj;
//         $.ajax({
//           url: '/api/newpoll',
//           dataType: 'json',
//           type: 'POST',
//           data: poll,
//           success: function(data) {
//               this.loadPolls();
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error('/' + this.state.user.github.username + '/polls', status, err.toString());
//           }.bind(this)
//         });
//         this.setState({addPoll: false});
//     }
    
//     handleVote(obj) {
//         $.ajax({
//           url: `/api/vote/${obj._id}`,
//           dataType: 'json',
//           type: 'POST',
//           data: obj,
//           success: function(data) {
//             console.log(JSON.stringify(data, null, 2));
//             this.loadPolls();
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error(`/api/vote/${obj._id}`, status, err.toString());
//           }.bind(this)
//         });
//     }
    
//     deletePoll(id) {
//         $.ajax({
//           url: '/api/delete/' + id,
//           type: 'DELETE',
//           success: function(data) {
//               this.loadPolls();
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error('/api/' + id + '/delete', status, err.toString());
//           }.bind(this)
//         });
//     }
    
//     showForm() {
//         this.setState({addPoll: true});
//     }
    
//     cancelForm() {this.setState({addPoll: false})}
    
//     componentDidMount() {
//         this.getUser();
//         this.loadPolls();
//     }
    
//     render() {
//       var form;
//       if(this.state.addPoll) {
//           form = (
//               <div>
//                 <h3 className="text-center">Click button to cancel. <span className="btn btn-danger" onClick={this.cancelForm}>Cancel Poll</span></h3>
//                 <PollForm submit={this.addNewPoll}/>
//               </div>
//           );
//       }else{
//           form = (
//               <div className="col-xs-12">
//                   <h3 className="text-center">Here are your polls. Click button to add additional polls. <span className="btn btn-primary" onClick={this.showForm}>Add Poll</span></h3>
//               </div>
//           );
//       }
      
//       let pollNodes = this.state.polls.map((poll, i) => {
//           return (
//             <Poll poll={poll} key={i} del={this.deletePoll } vote={this.handleVote}/>
//           );
//       });
//       let all = (
//         <div className="col-xs-12">
//             <h3 className="text-center">Welcome, please register or log in. Click button view all polls. <Link to="polls" type="button" className="btn btn-default">View Polls</Link></h3>
//         </div>
//       );
//       let subheading = this.state.auth ? form : all;
//         return (
//             <div>
//                 <Nav avatar={this.state.avatar}/>
//                 <Jumbotron displayName={this.state.displayName}/>
//                 <div className="container">{subheading}</div>
//                 <div className="container">{pollNodes}</div>
//                 <Footer />
//             </div>
//         );
//     }
// }


// import React from "react";
// import ReactDOM from "react-dom";
// import Poll from "./Poll";
// import {Link} from 'react-router';
// import Nav from "./Nav";
// import Footer from "./Footer";
// import $ from 'jquery';
    
    
// export default class AllPolls extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             avatar: '',
//             list: true,
//             polls: []
//         };
//         this.toggleList = this.toggleList.bind(this);
//         this.handleVote = this.handleVote.bind(this);
//         this.getPolls = this.getPolls.bind(this);
//         this.getUser = this.getUser.bind(this);
//         this.deletePoll = this.deletePoll.bind(this);
//     }
    
//     getPolls() {
//         $.ajax({
//           url: '/api/polls',
//           dataType: 'json',
//           cache: false,
//           success: function(data) {
//             this.setState({
//                 polls: data
//               });
//           }.bind(this),
//           error: function(xhr, status, err) {
//              console.error('/api/polls', status, err.toString());
//           }.bind(this)
//         });
//     }
    
//     getUser() {
//         $.ajax({
//             url: '/api/me',
//             dataType: 'json',
//             cache: false,
//             success: function(data) {
//               this.setState({
//                   avatar: data.github.avatar
//                 });
//             }.bind(this),
//             error: function(xhr, status, err) {
//                 console.log('No user logged in.');
//               //console.error('/api/me', status, err.toString());
//             }.bind(this)
//         });
//     }
    
//     handleVote(obj) {
//         $.ajax({
//           url: `/api/vote/${obj._id}`,
//           dataType: 'json',
//           type: 'POST',
//           data: obj,
//           success: function(data) {
//             this.getPolls();
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error(`/api/vote/${obj._id}`, status, err.toString());
//           }.bind(this)
//         });
//     }
    
//     deletePoll(id) {
//         $.ajax({
//           url: '/api/delete/' + id,
//           type: 'DELETE',
//           success: function(data) {
//               this.getPolls();
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error('/api/delete/' + id, status, err.toString());
//           }.bind(this)
//         });
//     }
    
//     toggleList() {
//         this.setState({list: !this.state.list});
//     }
    
//     componentDidMount() {
//         this.getPolls();
//         this.getUser();
//     }
    
//     render() {
//         let pollNodes = this.state.polls.map((poll, i) => {
//             return (
//                 <Poll poll={poll} key={i} del={this.deletePoll} vote={this.handleVote}/>
//             );
//         });
//         let listNodes = this.state.polls.map((poll, i) => {
//             return (
//                 <div className='col-xs-12 panel panel-primary' key={i}>
//                     <Link to={`/poll/${poll._id}`}>
//                         <h3 className="panel-heading text-center">{poll.title}</h3>
//                     </Link>
//                 </div>
//             );
//         });
//         let nodes = this.state.list ? listNodes : pollNodes;
//         let view = this.state.list ? (
//                 <div className="center-block" onClick={this.toggleList}>
//                     <h3 className="text-center"><strong>List View</strong> | ChartView </h3>
//                 </div>
//             ) : (
//                 <div className="center-block" onClick={this.toggleList}>
//                     <h3 className="text-center">List View | <strong>ChartView</strong></h3>
//                 </div>
//             );
//         return (
//             <div>
//                 <Nav avatar={this.state.avatar} />
//                 <div className="container">
//                     {view}
//                     {nodes}
//                 </div>
//                 <Footer />
//             </div>
//         );
//     }    
// }

// import React from "react";
// import {Router, Route, Link}  from "react-router";
// import $ from 'jquery';
// import {rect, line, text} from "./ChartFunctions";
// import BarChart from './BarChart';
// import BarChartRS from './BarChartRS';

// export default class Poll extends React.Component {
//         constructor(props){
//             super(props); 
//             this.state = {
//                 id: this.props.id,
//                 poll: this.props.poll,
//                 userId: '',
//                 owner: false,
//                 chart: true,
//                 option: '',
//                 customOption: '',
//                 addCustom: false,
//                 auth: false,
//                 baseURL: ''
//             };
            
//             this.toggleChart = this.toggleChart.bind(this);
//             this.handleVote = this.handleVote.bind(this);
//             this.handleDelete = this.handleDelete.bind(this);
//             this.cancelCustom = this.cancelCustom.bind(this);
//             this.getUser = this.getUser.bind(this);
//             this.handleOption = this.handleOption.bind(this);
//             this.toggleCustom = this.toggleCustom.bind(this);
//             this.handleOption = this.handleOption.bind(this);
//             this.handleCustomInput = this.handleCustomInput.bind(this);
//         }
    
//     handleVote() {
//         let obj = {};
//         obj.option = this.state.option;
//         obj._id = this.state.poll._id;
//         this.props.vote(obj);
//     }
    
//     getUser() {
//         let poll =  this.props.poll || this.state.poll;
//         $.ajax({
//           url: '/api/me',
//           dataType: 'json',
//           cache: false,
//           success: function(data) {
//               this.setState({
//                   auth: true,
//                   userId: data._id
//               }); //Verify registered user
              
//               if(poll.author == data._id){ //Determine if User created the poll
//                 this.setState({
//                     owner: true
//                 });
//               }
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error('/api/me', status, err.toString());
//           }.bind(this)
//         });
//     }
    
//     handleDelete() {
//         this.props.del(this.state.poll._id);  
//     }
    
//     handleOption(e) {
//         this.setState({option: e.target.value});
//     }
    
//     handleCustomInput(e) {
//         this.setState({
//             customOption: e.target.value,
//             option: e.target.value 
//         });
//     }
    
//     cancelCustom() {
//         this.setState({
//             customOption: '',
//             addCustom: false
//         });
//     }
    
//     toggleCustom() {
//         this.setState({addCustom: true});
//     }
    
//     toggleChart() {
//         this.setState({chart: !this.state.chart});
//     }
    
//     componentDidMount() {
//         let thisURLSplit = window.location.href.split('/');
//         let baseURL = thisURLSplit[2];
//         this.setState({baseURL: 'https://' + baseURL});
//         this.setState({option: this.state.poll.options[0].text});
//         this.getUser();
//     }
    
//     componentWillReceiveProps(newProps) {
//         this.setState({poll : newProps.poll});
//         this.setState({option: newProps.poll.options[0].text});
//     }
    
//     render() {
//         let optionNodes = this.state.poll.options.map((option, i) => {
//             return (
//                 <li key={i}>{option.text}: {option.votes}</li>  
//             );
//         });
        
//         let dataViz = this.state.chart ? 
//             (<div className="dataViz col-xs-8" onClick={this.toggleChart}>
//                 <p className="text-center">Click to toggle Chart view</p>
//                 <BarChartRS className='center-block' poll={this.state.poll} width={600} height={300} margin={20}/>
//             </div>) : 
//             (<div className="dataViz col-xs-8" onClick={this.toggleChart}>
//                 <p className="text-center">Click to toggle Chart view</p>
//                 <ul>{optionNodes}</ul>
//             </div>);
            
//         let vote = this.state.poll.options.map((opt, i) => {
//             return (
//                 <option key={i} value={opt.text}>{opt.text}</option>
//             );
//         });
        
//         //Delete button
//         let delButton = this.state.owner ? 
//             (<input id="del" type="button" className="col-xs-12 btn btn-danger" value="Delete" onClick={this.handleDelete}/>) : 
//             (<input id="del" type="button" className="col-xs-12 btn btn-danger hidden" value="Delete"/>);
        
//         //Custom option
//         let customVB = this.state.addCustom && this.state.customOption ?        //Custom Vote Button
//             <span className="btn btn-primary col-xs-4" onClick={this.handleVote}>Vote</span> :
//             <span className="btn btn-primary disabled col-xs-4">Vote</span>;
//         let custom = this.state.addCustom ? 
//             (
//                 <div className="form-group">
//                     <input className="form-control col-xs-8" type="text" placeholder='Custom Option' value={this.state.customOption} onChange={this.handleCustomInput}/>
//                     <span className="btn btn-danger col-xs-4" onClick={this.cancelCustom}>Cancel</span>
//                     {customVB}
//                     </div>
//             ) : 
//             (<h5 onClick={this.toggleCustom}>Click here to create your own option</h5>);
//         let noAuth = <span></span>;
//         let showCustom = this.state.auth ? custom : noAuth;
        
//         //Twitter share button
//             let tweetString = `https://twitter.com/intent/tweet?text=Hey, check out my new poll. ${this.state.poll.title}&url=${this.state.baseURL}/poll/${this.state.poll._id}`;
//             let tweet = encodeURI(tweetString);
        
//         return (
//             <div className="col-xs-12">
//                 <div className="panel panel-default">
//                     <div className="panel-heading">
//                         <Link to={`/poll/${this.state.poll._id}`}>
//                             <h4 className="panel-title">{this.state.poll.title}</h4>
//                         </Link>
//                     </div>
//                     <div className="panel-body">
//                         <div className="row">
//                             <div className="col-xs-3">
//                                 {showCustom}
//                                 <select className="col-xs-12" ref="select" onChange={this.handleOption}>
//                                     {vote}
//                                 </select>
//                             </div>
//                             {dataViz}
//                         </div>
//                         <div className="row">
//                             <div className="col-xs-3">
//                                 <input id="vote" 
//                                     type="button" 
//                                     className="col-xs-12 btn btn-primary" 
//                                     value="Vote" 
//                                     onClick={this.handleVote}
//                                 />
//                                 <a href={tweet} className="col-xs-12 btn btn-twitter ">
//                                     <span className="fa fa-twitter-square" alt="twitter logo"></span> Twitter
//                                 </a>
//                             </div>
//                             <div className="col-xs-8">
//                                 {delButton}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

