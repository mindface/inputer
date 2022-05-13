
import { Action, Dispatch, AnyAction } from 'redux'
import { Posts, SendPosts } from '../../../models/Posts'

export const FETCH_POST_DATA_REQUEST = 'FETCH_POST_DATA_REQUEST'
export const FETCH_POST_DATA_SUCCESS = 'FETCH_POST_DATA_SUCCESS'
export const FETCH_POST_DATA_FAILURE = 'FETCH_POST_DATA_FAILURE'

interface PostState {
  isFetching: boolean,
  postItems: Posts[],
}


export function initalPostsState():PostState  {
  return {
    isFetching: true,
    postItems: [],
  }
}

export interface PostAction extends Action {
  type: string;
  postItems: Posts[];
}

export interface PostActionFailure extends Action {
  type: string;
  err: string
}

export function postReducer(state:PostState = initalPostsState(), action:PostAction) {
  switch (action.type) {
    case FETCH_POST_DATA_REQUEST:
        return {
          ...state,
            isFetching: true,
            postItems: []
          }
      case FETCH_POST_DATA_SUCCESS:
       return {
           ...state,
             isFetching: false,
             postItems: action['postItems']
           }
       case FETCH_POST_DATA_FAILURE:
        return {
          ...state,
            isFetching: false,
            postItems: []
          }
    default:
      return state
  }
}


export const postFetchDataRequest = (): PostAction  => {
   return {
      type: FETCH_POST_DATA_REQUEST,
      postItems: []
   }
}

export const postFetchDataSuccess = (data: Posts[]) :PostAction  => {
 return {
    type: FETCH_POST_DATA_SUCCESS,
    postItems: data
  }
}

export const postFetchDataFailure = (err: string) : PostActionFailure => {
  return {
    type: FETCH_POST_DATA_FAILURE,
    err: err
  }
}

export const AddPostData = (sendData:SendPosts) => {
    return async (dispatch:Dispatch<AnyAction>) => {
      dispatch(postFetchDataRequest())
      const params:object = {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({post:sendData}) 
      }
      try {
         const res = await fetch("http://localhost:3001/api/v1/posts", params);
         res.json().then((res) => {
          console.log(res)
          dispatch<any>(getPostData())
         })
      }
      catch (err) {
        console.log(err)
        //  return dispatch(postFetchDataFailure(err))
      }
  }
}

export const UpdatePostData = (sendData:Posts) => {
  return  (dispatch:Dispatch<AnyAction>) => {
    return new Promise<void>( async (resolve,eject) => {  
      dispatch(postFetchDataRequest())
      console.log(sendData)
      const params:object = {
        method: 'PATCH',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({post:sendData,id:sendData.id}) 
      }
      try {
        const res = await fetch("http://localhost:3001/api/v1/posts", params);
        res.json().then((res) => {
          console.log(res)
          dispatch<any>(getPostData())
          resolve();
        })
      }
      catch (err) {
        eject();
        console.log(err)
        //  return dispatch(postFetchDataFailure(err))
      }
    })
  }
}

export const deletePostData = (id:number) => {
  return async (dispatch:Dispatch) => {
    dispatch(postFetchDataRequest())
    const params:object = {
      method: 'DELETE',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    }
    try {
       const res = await fetch(`http://localhost:3001/api/v1/posts`,params);
       res.json().then((res) => {
        console.log(res)
        dispatch<any>(getPostData())
       })
    }
    catch (err) {
      console.log(err)
      //  return dispatch(postFetchDataFailure(err))
    }
  }
}

export const getPostData = () => {
  return (dispatch: Dispatch)  => {
    dispatch(postFetchDataRequest())
    fetch("http://localhost:3001/api/v1/posts/index", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      res.json().then((res) => {
        dispatch(postFetchDataSuccess(res))
      })
      .catch( (err) => {
        console.log(err)
        // dispatch(postFetchDataFailure(err))
      })
    })
  }
}
