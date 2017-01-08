import React, {Component} from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './rootReducer'
import AppContainer from './AppContainer'

let composeEnhancers = compose

const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (typeof composeWithDevToolsExtension === 'function') {
  composeEnhancers = composeWithDevToolsExtension
}

if (window.devToolsExtension) {
  window.devToolsExtension.open()
}

const middleawares = [thunk]

// there are a lot of ways we can enhance
// redux devtools, let this be a placeholder
let enhancers = []

let store = createStore(rootReducer,
                        undefined,
                        composeEnhancers(
                          applyMiddleware(...middleawares),
                          ...enhancers
                        )
                      )

// we have redux tools now, no need to be ugly
// store.subscribe( ()=> { console.log(store.getState())})


export default class Root extends Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
