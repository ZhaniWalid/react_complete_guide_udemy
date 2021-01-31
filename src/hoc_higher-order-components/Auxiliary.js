// In Windows we couldn't name this file as 'Aux.js' like in the tuto because it's a key word reserved to Windows
// So we named the File as 'Auxiliary.js' ('Aux.js' => Works for 'MacOS' & 'Linux')

// children => Will return what it's opened between 'opened' and 'closed' tag of this compenent 'aux'
// Will be used to wrap into it sub elements (children)
const aux = props => props.children;

export default aux;