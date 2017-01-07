import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './rootReducer'
import AppContainer from './AppContainer'


let store = createStore(rootReducer,
                        undefined,
                        applyMiddleware(thunk)
                      )

store.subscribe( ()=> { console.log(store.getState())})


export default class Root extends Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
