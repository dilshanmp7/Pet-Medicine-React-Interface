import React, { Component } from 'react';
import '../css/App.css';
import AddAppoinment from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import {without} from 'lodash';

class App extends Component {

constructor() {
  super();
  this.state ={
    myName:'Dilshan',
    myAppoinments:[],
    lastIndex:0,
    formDisplay:false
  }
  this.deleteAppoinmrnt=this.deleteAppoinmrnt.bind(this);
  this.toggleForm=this.toggleForm.bind(this);
}

componentDidMount(){
  fetch('./data.json').then(r=>r.json()).then(r=>
    {
      const appoins=r.map(i=>{
          i.aptID=this.state.lastIndex
          this.setState({lastIndex:this.state.lastIndex+1});
          return i;
      })
      this.setState({
        myAppoinments:appoins
      });
    }
  );
}


deleteAppoinmrnt(apt){

  let tempApts= this.state.myAppoinments;
  tempApts=without(tempApts,apt)
  this.setState({myAppoinments:tempApts});
}

toggleForm(){
  this.setState({formDisplay:!this.state.formDisplay})
}


render()
{
  return (
    <main className="page bg-white" id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
            <AddAppoinment formDisplay={this.state.formDisplay} toggleForm={this.toggleForm}></AddAppoinment>
            <SearchAppointments></SearchAppointments>
            <ListAppointments appointments={this.state.myAppoinments}
              deleteAppoinmrnt={this.deleteAppoinmrnt}
            ></ListAppointments>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}
}

export default App;
