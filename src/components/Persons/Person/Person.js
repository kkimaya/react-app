import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import classes from './Person.css'
import withClass from '../../../hoc/withClass';
import PropType from 'prop-types';
class Person extends Component{


    constructor(props){
        super(props);
        this.inputElementRef=React.createRef();
    }
    componentDidMount(){
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                {this.props.isAuth? <p>Authenticated</p>:<p>Please Login</p>}
                <p onClick={this.props.click}> I'm {this.props.name} and I am {this.props.age} years old! </p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed}  value={this.props.name}
                 //ref={(inputEl)=> {this.inputElement=inputEl}}
                 ref={this.inputElementRef}
                 />
            </Aux>
            )
    }
}

Person.propTypes={
    click: PropType.func,
    name: PropType.string,
    age: PropType.number,
    changed: PropType.func
};

export default withClass(Person, classes.Person);