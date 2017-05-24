
## Redux-Generator

A plugin inspire by the idea : aotu gen actions gen actiontype gen reducers by redux config file.

### Usage

import the plugin and the use the reduxGenerator function to generate reducers and actions for you.

### example:

#### reducer file 

``` sh
import { combineReducers } from 'redux';
//import redux generator
import znReduxSuperFetch from "znReduxSuperFetch"; 
//import config
import {ReduxConfig} from "./reduxConfig.js";

//use the reduxGenerator function to generate reducers and actions
const GenByConfig= znReduxSuperFetch(ReduxConfig); 

//get actions
export const Actions = GenByConfig.Actions; 

//get reducers
export const Reducer = (state, action) => {
  const cbr = combineReducers({...GenByConfig.Reducers});
  return cbr(state, action);
};
```

#### config file 

``` sh
export const ReduxConfig={
  ConfigModule:{
    data:["banner","recommend","page"],
    condition:{
      orgId: ""
    }
  }
}
```
#### domo
[generate-redux-code](https://github.com/fomenyesu/generate-redux-code)


