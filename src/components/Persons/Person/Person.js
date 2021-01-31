import React, { Component } from 'react'; // { Component, Fragment }
// Use this cmd: 'npm install --save radium' in the Integrated Terminal of VS CODE or Terminal of Windows to install it
// import Radium from 'radium';

// Use this cmd: 'npm install --save styled-components' in the 'Integrated Terminal of VS CODE' or 'Terminal of Windows' to install it
// import styled from 'styled-components';

// import './Person.css'; // When we use 'styled-components', we can get rid of './Person.css' and use the CSS directly into " styled.div'' " for example
import classes from './Person.css';
import Aux from '../../../hoc_higher-order-components/Auxiliary';
import WithClass from '../../../hoc_higher-order-components/WithClass';
// This is an external library installed with this cmd: 'npm install --save prop-types' in the integrated terminal
// It's help to define the exact 'type' of data passed => like 'number', 'string', 'email' ...  
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef(); // Moden method to create 'Reference' in 'React'
    }

    // Should be 'static' and with this exact name = 'contextType'
    // This allows 'React' to auto connect this 'class based component' to the 'Context API' behind the scene
    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering...');      
        return (
          // Here the '<Aux></Aux> = Auxiliary.js' => wrapping those 'elements' as it's children
          // We can use our customised 'hoc' component
          // The 'ref' property below => used to 'reference' to a component (Old method to create 'Reference' in 'React' )
          <Aux>
            {/* Or we can simply use '<Fragment />' who did the same work as '<Aux />'     */}
            {/* <Fragment>     */}
            {/* We are using the 'Context API' for the 'Login' */}
            {/* <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p>Successfuly Authenticated!</p> : <p>Error, please verify your credenitals and LogIn again!</p>}
                </AuthContext.Consumer> */}

            {/* We can use this and ignore '<AuthContext.Consumer />' because we will use the 'contextType' who is connected to the 'Context API' */}
            {this.context.authenticated ? (
              <p>Successfuly Authenticated!</p>
            ) : (
              <p>Error, please verify your credenitals and LogIn again!</p>
            )}
            
            {/* {this.props.isAuth ? <p>Successfuly Authenticated!</p> : <p>Error, please verify your credenitals and LogIn again!</p>} */}
            <p key="key#1" onClick={this.props.click}>
              I am {this.props.name} and I am {this.props.age} years old !
            </p>
            ,<p key="key#2">{this.props.children}</p>,
            <input
              key="key#3"
              // ref={(inputEl) => {this.inputElement = inputEl}}
              ref={this.inputElementRef}
              type="text"
              onChange={this.props.changed}
              value={this.props.name}
            />
            {/* </Fragment>     */}
          </Aux>
        );    

        // This return below => represent the concept of 'Adjecent JSX elements' on an array separated by a ',' 
        // And every element shoud have a 'unique key' to make it simple to 'React' to identify them 
        // return [
        //     <p key="key#1" onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old !</p>,
        //     <p key="key#2">{this.props.children}</p>,
        //     <input key="key#3" type="text" onChange={this.props.changed} value={this.props.name} />
        // ];

        // return (
        //     // <div className="Person" style={style}>
        //     // <StyledDiv>
        //     //     <p onClick={props.click}>I am {props.name} and I am {props.age} years old !</p>
        //     //     <p>{props.children}</p>
        //     //     <input type="text" onChange={props.changed} value={props.name} />
        //     // </StyledDiv>
        //     <div className={classes.Person}>
        //         <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old !</p>
        //         <p>{this.props.children}</p>
        //         <input type="text" onChange={this.props.changed} value={this.props.name} />
        //     </div>
        //     // </div> // end of: <div className="Person" style={style}> 
        // );
    }
}

// It's help to define the exact 'type' of data passed => like 'number', 'string', 'email' ...
// It's related to the element in the 'return' function on the 'Person' class
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

// Export with 'hoc' class 'WithClass' component
export default WithClass(Person, classes.Person); // WithClass = (WrappedComponent, className)

// export default Person;

/* const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px) {
            width: 450px;       
    }    
`; */

// const person = (props) => {
//     /* const style = {
//         '@media (min-width: 500px)': {
//             width: '450px'
//         }
//     } */
//     /* const rand = Math.random();
//     if (rand > 0.7) {
//         throw new Error('Something went wrong here');
//     } */
    
//     console.log('[Person.js] rendering...');
//     return (
//         // <div className="Person" style={style}>
//         // <StyledDiv>
//         //     <p onClick={props.click}>I am {props.name} and I am {props.age} years old !</p>
//         //     <p>{props.children}</p>
//         //     <input type="text" onChange={props.changed} value={props.name} />
//         // </StyledDiv>
//         <div className={classes.Person}>
//             <p onClick={props.click}>I am {props.name} and I am {props.age} years old !</p>
//             <p>{props.children}</p>
//             <input type="text" onChange={props.changed} value={props.name} />
//         </div>
//         // </div>
//     );
// };

// export default person;

// Export with 'Radium' package
// export default Radium(person);