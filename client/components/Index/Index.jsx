import React, { Component } from 'react';

import _ from 'lodash'
import $ from 'jquery';

import Sitebox from 'components/Sitebox/Sitebox';

class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  setInterval() {
   this.intervals.push( setInterval.apply(null, arguments) );
  }

  componentDidMount() {
    this.intervals = [];
    this.serverRequest = $.get('/api/scenarios', function (scenarios) {
      this.setState({ items: scenarios });

      // update trigger statuses every 10s
      this.tick();
      this.setInterval(this.tick.bind(this), 10000);
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
    this.intervals.forEach(clearInterval);
  }

  tick() {
    this.serverRequest = $.get('/api/scenarios', function (scenarios) {
      this.serverRequest = $.get('/api/triggers/error', function (triggers) {
        // generate a random colour
        var getRandomColour = function() {
          var hexval = Math.floor( Math.random() * 0xffffff );
          return '#' + hexval.toString(16);
        };
        scenarios.forEach((item) => {
          // reduce the trigger from result for item
          var trigger = triggers.reduce((prev, curr, index, triggers) => {
            // description is something like hostname.example.com error
            // so we check if the first word of the description matches the item name
            if( curr.description.substr(0, curr.description.indexOf(' ')) == item.name )
              return curr;

            return prev;
          });

          // Change colour based on problem state
          // 1 = OK
          // 2 = PROBEM
          var problem = null;
          if( trigger.lastEvent ) {
            problem = trigger.lastEvent.value;
          }

          item.colour = '#555';
          item.problem = false;
          if( 0 == problem || 1 == trigger.lastEvent.acknowledged ) {
            // if there is no problem, or the problem event is acknowledged
            item.colour = '#68a94a';
          }
          else if( 1 == problem ) {
            item.colour = '#ce0000';
            item.problem = true;
          }

        });
        // update state
        this.setState({ items: scenarios });
      }.bind(this));
    }.bind(this));
  }

  render() {
    var monitored = this.state.items.length; // total monitored sites
    var errors = this.state.items.filter((item) => { return item.problem == 1 }).length; // sites that currently have an error
    return (
      <main className="wrap">
        <header>
          <span>Total monitored sites: <span className="count">{monitored}</span>, </span>
          <span>Total errors: <span className="count">{errors}</span>, </span>
          <span>Down: <span className="count">{ Math.round( 10000 * ( errors / monitored ) ) * .01 }  %</span></span>
        </header>
        <section className="box-grid">
          {this.state.items.map((item, key) => {
            return (<Sitebox key={key} name={item.name} colour={item.colour}/>);
          })}
        </section>
      </main>
    );
  }
}

export default IndexComponent;
