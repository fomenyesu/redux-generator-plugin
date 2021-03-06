/**
 * @name actionType Redux-Generator --gen actiontypes by config
 * @author winson 654874992@qq.com
 */

import _ from 'lodash';

/** 根据reduxConfig，生成对应的ActionTypes **/

const getActionTypes = (ReduxConfig) => {
  let result = {};
  _.mapKeys(ReduxConfig,(value,key)=>{
    let dataObj = {}, dataNamearr = [],dataValue = value.data?value.data:"";
    result[`${key}`] = {};
    if (typeof(dataValue)!="string"&&dataValue.length>0) {
      dataValue.forEach((item) => {
        dataNamearr.push(item);
      })
    }else if (typeof(dataValue)=="string"){
      dataNamearr.push(dataValue);
    }
    dataNamearr.forEach((item) => {
      result[`${key}`][`${item}LOAD_DATA`] = `${key}_${item}LOAD_DATA`;
      result[`${key}`][`${item}LOAD_FAIL`] = `${key}_${item}LOAD_FAIL`;
      result[`${key}`][`${item}RECEIVE_DATA`] = `${key}_${item}RECEIVE_DATA`;
      result[`${key}`][`${item}CONDITIONS`] = `${key}_${item}CONDITIONS`;
    });
    result[`${key}`]["REVERTCONDITIONS"] = `${key}_REVERTCONDITIONS`;
  });
  return result;
}

export default getActionTypes;
