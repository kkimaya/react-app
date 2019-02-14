import React, { useEffect,useRef } from 'react';
import classes from './Cockpit.css'
const cockpit = props =>  {


    
    const toggleBtnRef= useRef(null);
    
    
    //runs after every render cycle
    useEffect(()=>{
        console.log('[Cockpit.js] useEffect');

        // setTimeout(() =>{
        //     alert('Saved data to cloud!');
        // }, 1000);
        toggleBtnRef.current.click();
        return () =>{
            console.log('[Cockpit.js] cleanup work')
        };
    }, []);//empty array is passed so that useEffect is called only the first time that the component renders.
    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] 2nd useffect cleanup work')
        };
    });
    let btnClass='';

    if(props.showPersons){
        btnClass = classes.Red;
    }

    const assignedClasses = [];
    if(props.personsLength <= 2)
        assignedClasses.push(classes.red);
    if(props.personsLength <= 1)
            assignedClasses.push(classes.bold);
    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>

            <button
             ref={toggleBtnRef}
             className={btnClass}
             onClick={props.clicked}>Switch Name</button>
        </div>
    )
}

export default React.memo(cockpit); //optimizing functional components. Used to wrap components that do not need to run opn every single update on teh components within it. 