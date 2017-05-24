/**
 * @name actionType Redux-Generator --gen actions by config
 * @author winson 654874992@qq.com
 */
import ajax from "../../../common/ajax";


const genActions = (actionTypes) => {
    
  /** 数据加载中的状态 **/
  const loadData = (actype,tableName='') => {
    return {type: actionTypes[actype][tableName+"LOAD_DATA"]}
  };
  /** 获取数据 **/
  let ajaxObj = {};
   const fetchDCData = (url, params,success=()=>{},failFun=()=>{},resultDataParam) => {
    return (dispatch) => {
      /** 改变对应的condition **/
      dispatch(changeConditions(params.actype,params));
      /** 数据加载中的状态 **/
      dispatch(loadData(params.actype,params.tableName));
      /** 加载数据 **/
      let tableName = params.actype + (params.tableName || "");
      ajaxObj[tableName] && ajaxObj[tableName].abort();
      ajaxObj[tableName] = ajax({
        url,
        method : /(txt|json)/.test(url)?"get":"post",
        data: params
      }).done((data) => {
        if (data.code!=200) {
          /** 数据加载失败 **/
          dispatch(fail(data,params.actype,params.tableName));
          failFun(data);
        }else{
          /** 数据加载成功，更新数据状态 **/
          dispatch(receiveDCData(data,resultDataParam,params.actype,params.tableName));
          success(data,resultDataParam);
        }
      }).fail((msg) => {
          /** 数据加载失败 **/
          if(typeof msg == "object" && msg.statusText == "abort"){
            return;
          }
          dispatch(fail(msg,params.actype,params.tableName));
          failFun(msg);
      })
    }
  };

  /** 改变条件数据状态 **/
   const changeConditions = (actype,conditions) => {
      let tableName=conditions.tableName?conditions.tableName:"";
    return {
      type: actionTypes[actype][tableName+"CONDITIONS"],
      conditions
    }
  };

  /** 清空条件数据 **/
  const revertConditions = (actype,conditions) => {
    return {
      type: actionTypes[actype]["REVERTCONDITIONS"],
      conditions
    }
  };

  /** 获取数据 **/
  const receiveDCData = (tableInfo,resultDataParam,actype,tableName='') => {
    let dataObj;
    dataObj = tableInfo.body;
    const timeforkey = Date.parse(new Date());
    if (dataObj.list) {
      const dataList = dataObj.list.map((item, index)=>{
        let tempObj = {"key":index + timeforkey};
        for(let i = 0; i < resultDataParam.length; i++){
          tempObj[resultDataParam[i]] = item[resultDataParam[i]];
        }
        return tempObj;
      });
      dataObj.list = dataList;
    }
    return {
      type: actionTypes[actype][tableName+"RECEIVE_DATA"],
      data: dataObj,
    }
  };

  /** 数据加载失败 **/
  const fail = (msg,actype,tableName='') => {
    return {
      type: actionTypes[actype][tableName+"LOAD_FAIL"],
      data: {}
    }
  };

  //简单操作请求
  const updateData = (url, params,success=()=>{},failFun=()=>{}) => {
    return (dispatch) => {
      dispatch(loadData(params.actype,params.tableName));
      /** 加载数据 **/
      let tableName = params.actype + (params.tableName || "");
      ajax({
        url,
        method : "post",
        data: params
      }).done((data) => {
        if (data.code!=200) {
          /** 数据加载失败 **/
          dispatch(fail(data,params.actype,params.tableName));
          failFun(data);
        }else{
          /** 数据加载成功，回调更新列表 **/
          success(data); 
        }
      }).fail((msg) => {
        /** 数据加载失败 **/
        if(typeof msg == "object" && msg.statusText == "abort"){
          return;
        }
        dispatch(fail(msg,params.actype,params.tableName));
        failFun(msg);
      })
    }
  };

  return {fetchDCData,changeConditions,revertConditions,fail,updateData}
}

export default genActions;
