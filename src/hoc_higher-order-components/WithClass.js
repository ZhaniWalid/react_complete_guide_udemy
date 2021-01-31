import React from 'react';

/* const WithClass = props => (
    <div className={props.classes}>
        {props.children}
    </div>
); */

const WithClass = (WrappedComponent, className) => {
    //  '...props' => pulls out all the property of 'props' inside it with all it's keys (Example => Name: 'W' , Age: 28)
    // Will be auto pulls out to '...props' behind the scene
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default WithClass;