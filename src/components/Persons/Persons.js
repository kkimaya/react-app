import React, {Component} from 'react';
import Person from './Person/Person';


class Persons extends Component {

    /*static getDerivedStateFromProps(props,state){
        console.log('[Persons.js] getDerivedStateFromProps',props);
        return state;
    }*/

    /*componentWillReceiveProps(props){ //deprecated
         console.log('[Persons.js] componentWillReceiveProps', props);
    }*/

    shouldComponentUpdate(nextProps,nextState){
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot'};
    }

    componentDidUpdate(prevProps,prevState,snapShot){
        console.log('[Persons.js] componentDidUpdate',snapShot);
    }

    componentWillUnmount(){
            console.log('[Persons.js] componentWillUnMount');
    }
    render(){
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((person,index) => {
            return(
                <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    key={person.id}
                    age={person.age}
                    changed={(event) => this.props.changed(event, person.id)}/>
            );
         })
    }
};

export default Persons;