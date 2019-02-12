import React from 'react';

// a function that returns a component function but not a component itself.
const withClass = (WrappedComponent, className) => {
    
    return props => (
        <div className={className}>
            <WrappedComponent />
        </div>
    ); 
};
export default withClass;