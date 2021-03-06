import React, { Component } from 'react';
import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import withClass from '../hoc/withClass';
import Aux from "../hoc/Auxiliary";
class App extends Component {

    constructor(props){
        super(props);
        console.log('[App.js] constructor');


    }

//a more modern syntax than initializing the state in the constructor
    state = {
                 persons: [
                   { id:'unique001',name: 'Max', age: 28 },
                   { id:'unique002',name: 'Manu', age: 29 },
                   { id:'unique003',name: 'Stephanie', age: 26 }
                 ],
                 otherState: 'some other value',
                 showPersons: false,
                 showCockpit: true,
                 changeCounter: 0,
                 authenticated: false
             };

    static getDerivedStateFromProps(props,state){
        console.log('[App.js] getDerivedStateFromProps' , props);
        return state;
    }

    /* componentWillMount(){ //will be deprecated
        console.log('[App.js] componentWillMount');
    }*/
    componentDidMount(){
        console.log('[App.js] componentDidMount')
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('[App.js] shouldComponentUpdate')
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[App.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot'};
    }

    componentDidUpdate(){
        console.log('[App.js] componentDidUpdate');
    }

    deletePersonHandler= (personIndex) => {
      const persons = this.state.persons.slice(); //make a copy of the array before splicing.
      //alternatively you could also use the spread operator.
      //const persons = [...this.state.persons];
      persons.splice(personIndex,1);
      this.setState({persons: persons})
    }

    nameChangedHandler = (event, personId) => {
    //find the index of the person to be changed.
        const personIndex=this.state.persons.findIndex(p => {
            return p.id===personId
        })

        //const person = this.state.persons[personIndex]; // This method would mutate the original persons object.
        //so a better approach would be to copy the state persons object
        const person= {
            ...this.state.persons[personIndex]
        }
        //alternative approach; const person = Object.assign({}, this.state.persons[personIndex])

        person.name=event.target.value;

        const updatedPersons =[...this.state.persons];
        updatedPersons[personIndex]=person;
        this.setState((prevState, props) =>{

            return{
              persons: updatedPersons,
              changeCounter: prevState.changeCounter+1
              //changeCounter: this.state.changeCounter+1 //depending on the old state (this.state.changCounter) to update the state is a bad way of programming
                                                        // even though this setState call may seem synchronous, it mostly is not. React schedules state updates.//#endregion
                                                        //For this reason, if you have a setState somewhere else which has updated the state, this call here,  might not get all the changes
                                                        //until it executes and might have stale/old data                
            }});
   };

  togglePersonsHandler = () =>{
     const doesShow= this.state.showPersons;
     this.setState({showPersons: !doesShow});
  }

  loginHandler = ()=> {
    this.setState({
        authenticated: true
    })

  }
  render() {

    console.log('[App.js] render')

    let persons=null;
    if(this.state.showPersons){
        persons=
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    isAuthenticated={this.state.authenticated}/>
    }

    return (

          <Aux>
            <button onClick={() => {this.setState({showCockpit:false})}}>RemoveCockpit </button>
             {this.state.showCockpit?
             <Cockpit
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}  
                login={this.loginHandler}    />

              :null}
             {persons}
          </Aux>

    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App,classes.App);
