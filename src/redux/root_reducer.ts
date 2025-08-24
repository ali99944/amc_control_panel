import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from './reducers/auth_reducer'
import SidebarReducer from './reducers/sidebar_reducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  sidebar: SidebarReducer

});

export default rootReducer