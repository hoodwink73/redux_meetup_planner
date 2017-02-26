import React, {Component} from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './reducers/rootReducer'
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

let enhancers = []

let store = createStore(rootReducer,
                        undefined,
                        composeEnhancers(
                          applyMiddleware(...middleawares),
                          ...enhancers
                        )
                      )

export default class Root extends Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
