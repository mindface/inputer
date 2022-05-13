
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector as rawUseSelector } from 'react-redux'
import * as post from './data_action/post'
import * as analy from './data_action/analy'
import * as modal from './data_action/modal'
import * as user from './data_action/user'

import * as PostsModels from '../../models/Posts'
import * as ModalModels from '../../models/modal'

export interface RootStore {
  post: {
    isFetching: boolean,
    postItems:PostsModels.Posts[],
  },
  modal: ModalModels.Modals,
  analy: analy.analyState,
  user: user.UserState,
}

export const reducers = combineReducers({
  post: post.postReducer,
  modal: modal.modalReducer,
  analy: analy.analyReducer,
  user: user.userReducer,
})
 
export const rootReducer = (state:(RootStore|undefined), action:any) => {
  if(action?.type === ''){
     state = undefined
  }
  return reducers(state,action)
}

export const useRootSelector: TypedUseSelectorHook<RootStore> = rawUseSelector;
