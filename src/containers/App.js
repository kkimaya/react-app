import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
class App extends Component {
  state = {
    persons: [
      { id:'unique001',name: 'Max', age: 28 },
      { id:'unique002',name: 'Manu', age: 29 },
      { id:'unique003',name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

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
        this.setState({
              persons: updatedPersons
            });
   };

  togglePersonsHandler = () =>{
     const doesShow= this.state.showPersons;
     this.setState({showPersons: !doesShow});
  }
  render() {

    let persons=null;
    if(this.state.showPersons){
        persons=
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}/>
    }

    return (

          <div className={classes.App}>
             <Cockpit
                showPersons={this.state.showPersons}
                 persons={this.state.persons}
                clicked={this.togglePersonsHandler}      />
             {persons}
          </div>

    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
