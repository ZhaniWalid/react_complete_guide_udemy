// import React from 'react';
import Person from './Person/Person';
import React, { PureComponent } from 'react';
// import React, { Component } from 'react';

// PureComponent will auto implement the 'shouldComponentUpdate()' functions with all that code
// Instead of writing it manually
// class Persons extends Component {
class Persons extends PureComponent {    
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // Deprecated
    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps', props);
    // }

    // When using 'extends Component' => Discomment this function 'shouldComponentUpdate()' below 
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     // Compare the 'pointers' of the object 'persons' to 'allow' or 'prevent' the Update
    //     if (
    //         nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked
    //     ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //     // return true;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' };
        //return null;
    }

    // Deprecated
    // componentWillUpdate() {

    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] rendering...');
        return (this.props.persons.map((person, index) => {   
            return (
                <Person name={person.name}
                        age={person.age}
                        click={() => this.props.clicked(index)}
                        key={person.id}
                        // isAuth={this.props.isAuthenticated}
                        changed={(event) => this.props.changed(event, person.id)} />
            );                      
        })
        );
    }
}

export default Persons;

// const persons = (props) => {
//     console.log('[Persons.js] rendering...');
//     return props.persons.map( (person, index) => {   
//         return (
//             <Person name={person.name}
//                        age={person.age}
//                        click={() => props.clicked(index)}
//                        key={person.id}
//                        changed={(event) => props.changed(event, person.id)} />
//         );                       
//     });
// };

// export default persons;    