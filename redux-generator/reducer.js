/**
 * @name actionType Redux-Generator --gen reducers by config
 * @author winson 654874992@qq.com
 */

import _ from 'lodash';

/** 根据reduxConfig，生成对应的REDUCER **/
const getReducer = (ReduxConfig,actionTypes) => {
  const ReduxConfig1 = _.cloneDeep(ReduxConfig);
  let result = {};
    _.mapKeys(ReduxConfig,(value,key)=>{
    let dataObj = {}, dataNamearr = [],dataValue = value.data?value.data:"";
    if (typeof(dataValue)!="string"&&dataValue.length>0) {
      dataValue.forEach((item) => {
        dataObj[`${item}Data`]={};
        dataObj[`${item}Loading`]=false;
        dataNamearr.push(item);
      })
    }else if (typeof(dataValue)=="string"){
      dataObj[`${dataValue}Data`]={};
      dataObj[`${dataValue}Loading`]=false;
      dataNamearr.push(dataValue);
    }
    result[`${key}_Reducer`] = (state=dataObj,action)=>{
      let tempobj = {}, dataName = "",loadingName = "";
      dataNamearr.forEach((item) => {
        dataName = `${item}Data`,loadingName = `${item}Loading`;
        if (action.type === actionTypes[key][`${item}LOAD_DATA`]) {
          tempobj[loadingName] = true;
        }
        if (action.type === actionTypes[key][`${item}RECEIVE_DATA`]) {
          tempobj[loadingName] = false;
          tempobj[dataName] = action.data;
        }
        if (action.type === actionTypes[key][`${item}LOAD_FAIL`]) {
          tempobj[loadingName] = false;
          tempobj[dataName] = action.data;
        }
        // if (action.type === actionTypes[key][`${item}OP_Success`]) {
        //   tempobj[loadingName] = false;
        // }
      });
      return Object.assign({}, state, tempobj);
    }
    if(value.condition){
      result[`${key}_conditionReducer`]=(state=value.condition,action)=>{
        let tableName = action.conditions&&action.conditions.tableName?action.conditions.tableName:"";
        if (action.type === actionTypes[key][`${tableName}CONDITIONS`]) {
          state = Object.assign(state, action.conditions || {});
        }else if (action.type === actionTypes[key]["REVERTCONDITIONS"]) {
          value["condition"] = Object.assign(value["condition"],ReduxConfig1[key]["condition"],{});
          state = Object.assign(state, value.condition, action.conditions || {});
        }
        return state;
      }
    }
  });
  return result;
};

export default getReducer;
