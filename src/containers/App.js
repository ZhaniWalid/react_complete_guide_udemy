import React, { Component } from 'react'; // 1. 'Component'
// import React, { useState } from 'react'; // 2. Constant like this ('Using the useState() Hook)
// import logo from './logo.svg';
import './App.css';
import classes from './App.css'; // CSS MODULES

// Use this cmd: 'npm install --save radium' in the Integrated Terminal of VS CODE or Terminal of Windows to install it
// With 'Radium' we can use this properties ':hover'
// import Radium, { StyleRoot } from 'radium';

// Use this cmd: 'npm install --save styled-components' in the Integrated Terminal of VS CODE or Terminal of Windows to install it
//import styled from 'styled-components';

// import Person from '../components/Persons/Person/Person';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc_higher-order-components/WithClass';
import Aux from '../hoc_higher-order-components/Auxiliary';
import AuthContext from '../context/auth-context';

// We are using here 'styled-components' to style a button and use it below
// const StyledButton = styled.button`
//   // background-color: green;
//   background-color: ${props => props.alt ? 'red' : 'green'}; // if 'props.alt(=this.state.showPersons) == true' => 'red' else 'green'
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;

//   &:hover { // We can use '&:hover' (type: 'sudo selector') 'styled-components' like the one used 'Radium'
//     // background-color: lightgreen;
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'}; // if 'props.alt(=this.state.showPersons) == true' => 'salmon' else 'lightgreen'
//     color: black;
//   }
// `;

// 1. We can use a 'Component' like this :
class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // this.state = .. ;    
  }

  // 1. 'Component'
  state = {
    persons: [
      { id: 'wZhy#7', name: 'Walid', age: 27 },
      { id: 'aF25', name: 'Aida',  age: 25 },
      { id: 'wBayern5', name: 'Wael',  age: 23 }
    ],
    otherState: 'Some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillUnmount() {
  //   console.log('[App.js] componentWillUnmount...');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount...');
  }

  shouldComponentUpdate() {
    console.log('[App.js] shouldComponentUpdate...');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate...');
  }

  // 1. 'Component' 
  switchNameHandler = (newName) => {
    //console.log('Button #Switch #Name was clicked !');
    //DON'T DO THIS ==> this.state.persons[0].name = 'Edzio';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Aida',  age: 26 },
        { name: 'Wael',  age: 23 }
      ]
    } );
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id; // return true ==> if: the 'id' is equals to 'p.id'    
    });
    const person = {
      ...this.state.persons[personIndex] // Copy the Data of 'this.state.persons[personIndex]' into 'const persons' (Method #1 of ES6 ==> plus moderne)
    };
    // const person = Object.assign({}, this.state.persons[personIndex]); // Copy the Data of 'this.state.persons[personIndex]' into 'const persons' (Method #2)
    person.name = event.target.value;
        
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // this.setState({persons: persons});
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });    

    /* this.setState( {
      persons: [
        { name: 'Walid', age: 28 },
        { name: event.target.value,  age: 26 },
        { name: 'Wael',  age: 23 }
      ]
    } ) */ 

  }; // end of function 'nameChangedHandler'

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); // Copy the Data of 'this.state.persons' into 'const persons' (Method #1)
    const persons = [...this.state.persons]; // Copy the Data of 'this.state.persons' into 'const persons' (Method #2 of ES6 ==> plus moderne)
    persons.splice(personIndex, 1); // ' splice() ' method used to 'Removes elements from an array'
    this.setState({persons: persons});
  };

  tooglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    /* if 'doesShow === true' ==> 'doesShow === false' / else if 'doesShow === false' ==> 'doesShow === true'*/
    this.setState({showPersons: !doesShow});
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

// Or 2. Constant like this ('Using the useState() Hook) ==> the same result
  // const app = props => {
  //   const [ personsState, setPersonsState ] = useState({
  //     persons: [
  //       { name: 'Walid', age: 27 },
  //       { name: 'Aida',  age: 25 },
  //       { name: 'Wael',  age: 23 }
  //     ]
  //     //otherState: 'Some other value'
  //   });

  //   // 2. Constant like this ('Using the useState() Hook)
  //   const [otherState, setOtherState] = useState(' Hey, #PS5 #PLAYSTATION5 will be sold on "November, 12 / November, 19" ');

  //   console.log(personsState, otherState);

  //   // 2. Constant like this ('Using the useState() Hook)
  //   const switchNameHandler = () => {
  //   //console.log('Button #Switch #Name was clicked !');
  //   //DON'T DO THIS ==> this.state.persons[0].name = 'Edzio';
  //   setPersonsState( {
  //     persons: [
  //       { name: 'Edzio', age: 28 },
  //       { name: 'Aida',  age: 26 },
  //       { name: 'Wael',  age: 23 }
  //     ],
  //     otherState: personsState.otherState
  //   } )
  // }

  // 1. 'Component'  
   render() {
    // this 'const style' used on the button who have this Text 'Switch Name'
    //  const style = {
    //    backgroundColor: 'green',
    //    color: 'white',
    //    font: 'inherit',
    //    border: '1px solid blue',
    //    padding: '8px',
    //    cursor: 'pointer',
    //    ':hover': { // We can use ':hover' (type: 'sudo selector') like this only when we have installed 'Radium' package
    //       backgroundColor: 'lightgreen',
    //       color: 'black'
    //    }
    //  };
    
    console.log('[App.js] render');
    let persons = null;

    // Was Moved to 'Cockpit.js'
    // let btnClass = '';

    //let btnClass = [classes.Button];

    // if(this.state.showPersons) {
      // persons = (
      //   <div>
      
      if(this.state.showPersons) {
          // This
          persons = <Persons persons={this.state.persons}
                             clicked={this.deletePersonHandler}
                             changed={this.nameChangedHandler}
                             isAuthenticated={this.state.authenticated} />;
                             
          // Or this => the 2 are corrects                   
          /* persons = (
              <Persons persons={this.state.persons}
                       clicked={this.deletePersonHandler}
                       changed={this.nameChangedHandler} />
          ); */                           
      }             
                   
                   
          // {/* {this.state.persons.map( (person, index) => { */}
          //      {/* return <Person name={person.name}
          //                    age={person.age}
          //                    click={() => this.deletePersonHandler(index)}
          //                    key={person.id}
          //                    changed={(event) => this.nameChangedHandler(event, person.id)} /> */}
          //      {/* return <ErrorBoundary key={person.id}>
          //               <Person name={person.name}
          //                           age={person.age}
          //                           click={() => this.deletePersonHandler(index)}
          //                           key={person.id}
          //                           changed={(event) => this.nameChangedHandler(event, person.id)} />
          //            </ErrorBoundary>                */}
          // {/* })} */}
          // {/* <Person name={this.state.persons[0].name}
          //         age={this.state.persons[0].age} />
          // <Person name={this.state.persons[1].name}
          //         age={this.state.persons[1].age}
          //         click={this.switchNameHandler.bind(this, '#PS5 #PLAYSTATION5')}
          //         changed={this.nameChangedHandler}>My Hobbies: Makiage AND Lebssa</Person>
          // <Person name={this.state.persons[2].name}
          //         age={this.state.persons[2].age} /> */}

      //   </div>
      // );

      // style.backgroundColor = 'red';
      // style[':hover'] = { // We can use ':hover' (type: 'sudo selector') like this only when we have installed 'Radium' package
      //     backgroundColor: 'salmon',
      //     color: 'black'
      //  }

      // btnClass.push(classes.Red);

      // Was Moved to 'Cockpit.js'
      // btnClass = classes.Red;
    
    // }

    //let classes = ['red', 'bold'].join(' '); // Will return ==> 'red bold' with a white space (' ') between
    
    // Here in this 2 NEXT 'if', we will assign dynamicly '.red' & '.bold' classes from 'App.css'
    // To: const classes = [];
    // And then we use it as a string with the 'join()' method here:
    // <p className={classes.join(' ')}>This is really working</p>  
    
    // Was Moved to 'Cockpit.js'
    // const assignedClasess = [];
    // if(this.state.persons.length <= 2) {
    //   // assignedClasess.push('red'); // ==> assignedClasess = ['red']
    //   assignedClasess.push(classes.red);
    // }
    // if(this.state.persons.length <= 1) {
    //   // assignedClasess.push('bold'); // ==> assignedClasess = ['red', 'bold']
    //   assignedClasess.push(classes.bold);
    // } 
    
    return (
      // <StyleRoot>
          // <div className="App">
          // <header className="App-header">
          //   <img src={logo} className="App-logo" alt="logo" />
          //   <h1 className="App-title">Welcome to React</h1>
          // </header>
          // <p className="App-intro">
          //        To get started, edit <code>src/App.js</code> and save to reload.
          // </p>
          // <h1>Hi, I'm a ReactJS App</h1>
          // </div>
            // <div className="App">
            // <div className={classes.App}>
            // <WithClass classes={classes.App}>
            <Aux>
                  {/* Was moved to 'Cockpit.js' */}
                  {/* <h1>Hi, I'm a ReactJS App</h1> */}
                  {/* <p className={assignedClasess.join(' ')}>This is really working</p> */}

                  {/* 1. 'Component' */}
                  {/* <button style={style} onClick={() => this.switchNameHandler('Edzio !!')}>Switch Name</button> */}
                  {/* <button style={style} onClick={this.tooglePersonsHandler}>Switch Name</button> */}
                  {/* <button className="button" onClick={this.tooglePersonsHandler}>Switch Name</button> */}

                  {/* Was moved to 'Cockpit.js' */}
                  {/* <button className={btnClass} onClick={this.tooglePersonsHandler}>Switch Name</button> */}
                  
                  {/* <StyledButton alt={this.state.showPersons} onClick={this.tooglePersonsHandler}>Switch Name</StyledButton> */}
                  {/* 2. Constant like this ('Using the useState() Hook)
                  <button onClick={switchNameHandler}>Switch Name</button> */}
                  {/* 1. 'Component' */}
                  {/* { */}
                  {/* // if the statement is === true => render the 'div' else render 'nothing' */}
                  {/* this.state.showPersons === true ? */}
                  {/* <div>
                    <Person name={this.state.persons[0].name}
                            age={this.state.persons[0].age}/>
                    <Person name={this.state.persons[1].name}
                            age={this.state.persons[1].age}
                            click={this.switchNameHandler.bind(this, '#PS5 #PLAYSTATION5')}
                            changed={this.nameChangedHandler}>My Hobbies: Makiage AND Lebssa</Person> 
                    <Person name={this.state.persons[2].name}
                            age={this.state.persons[2].age}/>
                  </div> {/* : null */
                  // ==> This <div></div> is replaced by {persons} bellow :
                  }
                  <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
                  {/* We are using the 'Context API' for the 'Login' */}
                  <AuthContext.Provider 
                    value={{
                      authenticated: this.state.authenticated,
                      login: this.loginHandler
                    }}
                  >
                    {this.state.showCockpit ? ( // if 'this.state.showCockpit == true' => render 'Cockpit..'
                      <Cockpit title={this.props.appTitle}
                              showPersons={this.state.showPersons}
                              // persons={this.state.persons}
                              personsLength={this.state.persons.length}
                              // login={this.loginHandler} 
                              clicked={this.tooglePersonsHandler} />
                    ): null} {/* else 'render' nothing */}         
                    {persons}
                  </AuthContext.Provider>
                  {/* } */}
                  {/* 2. Constant like this ('Using the useState() Hook)
                  <Person name={personsState.persons[0].name}  age={personsState.persons[0].age}/>
                  <Person name={personsState.persons[1].name}  age={personsState.persons[1].age}>My Hobbies: Makiage AND Lebssa</Person> 
                  <Person name={personsState.persons[2].name}  age={personsState.persons[2].age}/>   */}
            </Aux>
            // </WithClass>
            // </div>
        //  </StyleRoot>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi this is my 1st ReactJS App !!'));
  }
}

// 1. 'Component' 
// export default App;

// Export with 'hoc' class 'WithClass' component
export default WithClass(App, classes.App); // WithClass = (WrappedComponent, className)

// Export with 'Radium' package
// export default Radium(App);

// 2. Constant like this ('Using the useState() Hook)
//  export default app;
