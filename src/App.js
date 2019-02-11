import React, { Component } from 'react';
import Radium, {StyleRoot} from 'radium';
import './App.css';
import Person from './Person/Person';
import './Person/Person.css';

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

 /* switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };*/

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

    const style = {
        backgroundColor: 'green',
        font: 'inherit',
        border : '1px solid blue',
        padding: '8px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'lightgreen',
            color: 'white'
        }

    };
    let persons=null;
    if(this.state.showPersons){
        persons=(
             <div>
                {this.state.persons.map((person,index) => {
                    return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>
                })}
             </div>
        );

        style.backgroundColor='red';
        style[':hover'] = {
            backgroundColor: 'pink',
            color: 'black'
        }
    }


    const classes = [];
    if(this.state.persons.length <= 2)
        classes.push('red');
    if(this.state.persons.length <= 1)
            classes.push('bold');

    return (
       <StyleRoot>
          <div className="App">
            <h1>Hi, I'm a React App</h1>
            <p className={classes.join(' ')}>This is really working!</p>

            <button
             style={style}
             onClick={this.togglePersonsHandler}>Switch Name</button>
             { //ternary expression below: If showPersons is true show div, else (:) show null
              //  this.state.showPersons === true ?
               persons
                 //: null
             }
          </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
