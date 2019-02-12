import React, {PureComponent} from 'react';
import Person from './Person/Person';


class Persons extends PureComponent {

    /*static getDerivedStateFromProps(props,state){
        console.log('[Persons.js] getDerivedStateFromProps',props);
        return state;
    }*/

    /*componentWillReceiveProps(props){ //deprecated
         console.log('[Persons.js] componentWillReceiveProps', props);
    }*/

    //shouldcomponentupdate should not be added in components which you're sure will update each time a parent component updates. that slows down your app processing.
    //In our case, Persons doesn't update each time its parent component, cockpit, updates. So it is fine to use this method here. 
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('[Persons.js] shouldComponentUpdate');

    //     if(nextProps.persons !== this.props.persons){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    //PureComponent already implements shouldcomponentupdate and checks if ANY props changed, 
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