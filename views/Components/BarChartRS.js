import React from "react";
import {rect, line, text} from "./ChartFunctions";


let max,
    color= [
        'red', 'yellow', 'blue', 
        'orange', 'green', 'purple', 
        '#FF4D00', '#FFBF00', 'chartreuse', 'teal', 'violet', 'magenta'
    ],
    ctx;
    
    var BarChartRS = React.createClass({
        getInitialState: function() {
            return({
                width: this.props.width,
                height: this.props.height,
                margin: this.props.margin,
                container: {width: 0, height: 0}
            });
        },
        
        drawBackground:function() {
            rect(ctx, 0, 0, this.state.width, this.state.height, '#ccc');
        },
        
        drawTicks: function() {
            let grid = {color: 'rgba(255, 255, 255, 0.3)', weight: 2};
            max = Math.max.apply(Math, this.props.poll.options.map(function(obj) {return obj.votes;}));
            let increment;
            if(max > 100){
                increment = 20;
            }else if(max > 10 && max < 100){
                increment = 10;
            }else if(max < 10){
                increment = 1;
            }
            
            while(max % increment !== 0) {
              max++;
            }
            let ticks = max/increment;
            let tickHeight = (this.state.height - ( this.props.margin*2))/ticks;
            for(let i = 0; i <= ticks; i++){
              let next = tickHeight * i;
              let int = max - (increment * i);
              let point = 10;
              text(ctx, int, 2,  this.props.margin + next + (point/2), point+'px', 'Arial', '#fff', 'right');
              line(ctx,  this.props.margin/2,  this.props.margin + next,  this.props.margin,  this.props.margin + next, grid.color, grid.weight);
            }
        },  
        
        drawAxes: function() {
            let grid = {color: 'rgba(255, 255, 255, 0.7)', weight: 2};
            var xAxis = line(ctx,  this.props.margin,  this.props.margin,  this.props.margin, this.state.height - ( this.props.margin/2), grid.color, grid.weight);
            var yAxis = line(ctx,  this.props.margin/2, this.state.height -  this.props.margin, this.state.width -  this.props.margin, this.state.height -  this.props.margin, grid.color, grid.weight);
        },
        
        drawBars: function() {
            let chartWidth = this.state.width - ( this.props.margin*2);
            let chartHeight = this.state.height - ( this.props.margin*2);
            let barArea = chartWidth/this.props.poll.options.length;
            let barWidth = barArea - ( this.props.margin*2);
            let barY = this.state.height - this.props.margin;
            for(let i = 0; i < this.props.poll.options.length; i++) {
                let nextX = barArea * i;
                max = Math.max.apply(Math, this.props.poll.options.map(function(obj) {return obj.votes;}));
                let tick = chartHeight/max;
                let barHeight = this.props.poll.options[i].votes * tick;
                rect(ctx, ( this.props.margin*2) + nextX, barY - barHeight, barWidth, barHeight, color[i], '#fff');//text(ctx, this.props.poll.options[i].votes, nextX + (barArea/2) + this.props.margin, this.state.height - this.props.margin - buffer, '16px',  'Arial', '#fff', 'center');
            }
        },
        
        drawLabels: function() {
            let chartWidth = this.state.width - ( this.props.margin*2);
            let barArea = chartWidth/this.props.poll.options.length;
            for(let i = 0; i < this.props.poll.options.length; i++) {
              let textWidth = ctx.measureText(this.props.poll.options[i].text).width;
              let nextBar = barArea * i;
              let middle = ((barArea - textWidth) / 2);
              let buffer = 5;
              text(ctx, this.props.poll.options[i].text, ( this.props.margin*2) + nextBar + (middle/2), this.state.height - buffer, '12px', 'Arial', '#fff', 'center');
            }
        },
        
        draw: function() {
            ctx.clearRect(0, 0, this.state.width, this.state.height);
            this.drawBackground();
            this.drawAxes();
            this.drawTicks();
            this.drawBars();
            this.drawLabels();
        },
        
        
        componentDidMount: function() {
            let divID = `div${this.props.poll._id}`;
            let canvas = this.refs[this.props.poll._id];
            let div = this.refs[divID];
            let dim = div.getBoundingClientRect();//Dimensions
            ctx = canvas.getContext('2d');
            window.addEventListener('resize', this.handleResize, false);
            this.setState({container: {width: dim.width, height: dim.height}});
            if(this.state.container.width < this.props.width){
                this.setState({width: dim.width, height: dim.height});
            }
            this.draw();
        },
        
        componentDidUpdate:function() {
            let canvas = this.refs[this.props.poll._id];
            ctx = canvas.getContext('2d');
            window.addEventListener('resize', this.handleResize, false);
            this.draw();
        },
        
        handleResize: function() {
            let divID = `div${this.props.poll._id}`;
            let div = this.refs[divID];
            let dim = div.getBoundingClientRect();
            this.setState({container: {width: dim.width, height: dim.height}});
            let pW = this.props.width;
            let cW = this.state.container.width;
            let cH = this.state.container.height;
            let aspRat = (this.state.width/4) * 3; //Aspect Ratio
            this.setState({width: cW < pW ? cW - 40 : pW});
            this.setState({height: aspRat < cH ? aspRat: cH});
        },
        
        render: function() {
            
            return (
                <div ref={"div"+this.props.poll._id}>
                    <canvas className="center-block" ref={this.props.poll._id} width={this.state.width} height={this.state.height} />
                </div>
            );
        }
    });
    
module.exports = BarChartRS;