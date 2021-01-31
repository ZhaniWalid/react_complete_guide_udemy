import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const authContext = useContext(AuthContext);
  const toggleBtnRef = useRef(null); // 'useRef()' 'Hook' used to reference to objects like 'React.creatRef()'
  // toggleBtnRef.current.click(); // => TypeError: Cannot read property 'click' of null
  
  console.log(authContext.authenticated);

  // useEffect => is one of famous 'react Hooks' => Life Cycle Hooks
  // The code inside 'useEffect' => will run it's code AFTER this 'JSX' code is executed 'return (<div className={classes.Cockpit}></div> ..)
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http requests...
    // const timer = setTimeout(() => {
    // setTimeout(() => {  
    //   alert('Saved Data from Cloud !');  
    // }, 1000); // 1000 ms = 1s
    toggleBtnRef.current.click();
    return () => {
      // Will run BEFORE the main 'useEffect' function runs, but AFTER the 1st render cycle
      // clearTimeout(timer);
      console.log('[Cockpit.js] Cleanup work in useEffect');
    }
  }, []); // We want to launch the 1st argument of 'useEffect' and execute it when the 2nd one '[props.persons]' is changed
          // if the 2nd argument is empty like this '[]' => the alert will show only 1 time on opening screen and never come back

  // This 2nd 'useEffect' has no 2nd argument => so i m not controlling it when it's excecuted        
  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] Cleanup work in 2nd useEffect');
    }
  });        

  const assignedClasess = [];
  let btnClass = '';

  if (props.showPersons) {
      btnClass = classes.Red;
  }
    

  // if(props.persons.length <= 2) {
  if(props.personsLength <= 2) {  
    // assignedClasess.push('red'); // ==> assignedClasess = ['red']
    assignedClasess.push( classes.red );
  }
  // if(props.persons.length <= 1) {
  if(props.personsLength <= 1) {  
    // assignedClasess.push('bold'); // ==> assignedClasess = ['red', 'bold']
    assignedClasess.push( classes.bold );
  } 

  return (
      <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
          <p className={assignedClasess.join(' ')}>This is really working</p>
          <button ref={toggleBtnRef}
                  className={btnClass}
                  onClick={props.clicked}>Switch Name</button>
          {/* We can use this and ignore '<AuthContext.Consumer />' because we will use the 'authContext' who is connected to the 'Context API' */}        
          <button onClick={authContext.login}>LogIn</button>
          
          {/* We are using the 'Context API' for the 'Login' */}
          {/* <AuthContext.Consumer>
            {context => <button onClick={context.login}>LogIn</button>}
          </AuthContext.Consumer>         */}
          
          {/* <button onClick={props.login}>LogIn</button> */}
      </div>
  );
};

export default React.memo(cockpit); // React will store a snapshot of 'cockpit' => if there is inputs it will change else it will render the default version
// export default cockpit;