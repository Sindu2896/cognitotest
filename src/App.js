import React from 'react';
import Amplify, { Auth, Hub, API } from 'aws-amplify'
import awsconfig from './awsconfig'
import awsauth from './awsauth'
import Dashboard from './dashboard'
// const App = () => (
//   <div>
//     <AmplifySignOut />
//     My App
//   </div>
// );

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount () {
        Amplify.configure(awsconfig)
        Auth.configure({ oauth: awsauth }) 
        
        Hub.listen('auth', ({ payload: { event, data } }) => {
          switch (event) {
            case 'signIn':
              console.log('sign in', event, data)
              this.setState({ user: data})
              break
            case 'signOut':
              console.log('sign out')
              this.setState({ user: null })
              break
          }
        })
    }
    render() {
        return (
        <>
        <button onClick={() => Auth.federatedSignIn()}>Open Hosted  email UI</button>
        <button onClick={() => Auth.federatedSignIn({provider: "Google"})}>Open Hosted google UI</button>
        {(this.state.user) ? <Dashboard />:<p>not logged in</p>}
        <button onClick ={() => Auth.signOut()}>Logout</button>
        </>
        )
    }
}

export default App;