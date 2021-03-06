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
    formDisplay:false,
    orderBy:'petName',
    orderDir:'asc'

  }
  this.deleteAppoinmrnt=this.deleteAppoinmrnt.bind(this);
  this.toggleForm=this.toggleForm.bind(this);
  this.AddAppoinment=this.AddAppoinment.bind(this);
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

AddAppoinment(apt){
  let tempApts=this.state.myAppoinments;
  apt.aptID=this.state.lastIndex;
  tempApts.unshift(apt);
  this.setState({myAppoinments:tempApts, lastIndex:this.state.lastIndex+1});
}

render()
{

 let order;
 let filteredApts=this.state.myAppoinments;
 if(this.state.orderDir === 'asc')
 {
   order=1;
 }
 else
 {
   order=-1;
 }
  filteredApts.sort((a,b)=>{
    if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase())
    {
      return -1*order;
    }
    else
    {
      return 1*order;
    }
  })

  return (
    <main className="page bg-white" id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
            <AddAppoinment formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} AddAppoinment={this.AddAppoinment} ></AddAppoinment>
            <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir}></SearchAppointments>
            <ListAppointments appointments={filteredApts}
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
