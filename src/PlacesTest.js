import React, {Component} from 'react'
import Geosuggest from 'react-geosuggest'

export default class PlacesTest extends Component {
  constructor(props){
    super(props)
    this.state ={ }
    
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSuggestNoResults = this.onSuggestNoResults.bind(this)
  }
  onSuggestSelect(suggest) {
    console.log(suggest)
  }
  onFocus(){
    console.log('onFocus')
  }

  onBlur(value){
    console.log('onBlur', value)
  }
  onChange(value){
    console.log("changed input... ", value )
  }
  onSuggestNoResults(userInput){
    console.log("onSuggestNoResults for: ", userInput)
  }
  render(){

    return (
      <div>
        <Geosuggest
            placeholder="what is the location of your event?"
            onSuggestSelect={this.onSuggestSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onSuggestNoResults={this.onSuggestNoResults}
            />
      </div>
    )
  }
}
