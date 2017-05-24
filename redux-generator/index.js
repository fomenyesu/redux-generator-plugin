/**
 * @name actionType Redux-Generator -- import read config , gen actions and reducers
 * @author winson 654874992@qq.com
 */

import genActions from './actions';
import genActionType from './actionType';
import genReducer from './reducer';

const reduxGenerator = (reduxConfig) => {
  const ActionTypes = genActionType(reduxConfig);
  const Reducers = genReducer(reduxConfig,ActionTypes);
  const Actions = genActions(ActionTypes);

  return {Actions,Reducers}
}



export default reduxGenerator;

