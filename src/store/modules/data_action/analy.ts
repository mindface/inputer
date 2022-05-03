
import { Action, Dispatch, AnyAction } from 'redux'
import { Posts, SendPosts } from '../../../models/Posts'
import { Card01, Card02, Card03, Card04, Card05, Card06 } from '../../../models/analy'
import { reCard01, reCard02, reCard03 , reCard04, reCard05, reCard06 } from "./analySetData";

export const FETCH_ANALY_DATA_REQUEST = 'FETCH_ANALY_DATA_REQUEST'
export const FETCH_ANALY_DATA_SUCCESS = 'FETCH_ANALY_DATA_SUCCESS'
export const FETCH_ANALY_DATA_FAILURE = 'FETCH_ANALY_DATA_FAILURE'

export interface analyState {
  card01: Card01,
  card02: Card02,
  card03: Card03,
  card04: Card04,
  card05: Card05,
  card06: Card06,
}

export function initalAnalyState():analyState  {
  return {
    card01: reCard01,
    card02: reCard02,
    card03: reCard03,
    card04: reCard04,
    card05: reCard05,
    card06: reCard06,
  }
}

export interface AnalyAction extends Action {
  type: string;
  card01: Card01;
  card02: Card02;
  card03: Card03;
  card04: Card04;
  card05: Card05;
  card06: Card06;
}

export interface FetchAnalyAction extends Action {
  type: string;
  card01: Card01;
}

export interface PostActionFailure extends Action {
  type: string;
  err: string
}

export function analyReducer(state:analyState = initalAnalyState(), action:AnalyAction) {
  switch (action.type) {
    case FETCH_ANALY_DATA_REQUEST:
        return {
          ...state,
            isFetching: true,
            card01: reCard01,
          }
      case FETCH_ANALY_DATA_SUCCESS:
       return {
           ...state,
             isFetching: false,
             card01: action['card01'],
            }
      case FETCH_ANALY_DATA_FAILURE:
        return {
          ...state,
            isFetching: false,
            card01: reCard01,
          }
      case "CARD01":
        return {
            ...state,
              isFetching: false,
              card01: action['card01'],
            }
      case "CARD02":
        return {
            ...state,
              isFetching: false,
              card02: action['card02'],
            }
      case "CARD03":
        return {
            ...state,
              isFetching: false,
              card03: action['card03'],
            }
      case "CARD04":
        return {
            ...state,
              isFetching: false,
              card04: action['card04'],
            }
      case "CARD05":
        return {
            ...state,
              isFetching: false,
              card05: action['card05'],
            }
      case "CARD06":
        return {
            ...state,
              isFetching: false,
              card06: action['card06'],
            }
    default:
      return state
  }
}


export const analyFetchDataRequest = (): FetchAnalyAction  => {
   return {
      type: FETCH_ANALY_DATA_REQUEST,
      card01: reCard01,
   }
}

export const analyFetchDataSuccess = (data:Card01) :FetchAnalyAction  => {
 return {
    type: FETCH_ANALY_DATA_SUCCESS,
    card01: data
  }
}

export const analyFetchDataFailure = (err: string) : PostActionFailure => {
  return {
    type: FETCH_ANALY_DATA_FAILURE,
    err: err
  }
}

export const AddPostData = (sendData:SendPosts) => {
    return new Promise<void>( (resolve,eject) => {
      return async (dispatch:Dispatch<AnyAction>) => {
      dispatch(analyFetchDataRequest())
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
          resolve();
         })
      }
      catch (err) {
        eject();
        console.log(err)
        //  return dispatch(postFetchDataFailure(err))
      }
    }
  })
}

export const UpdatePostData = (sendData:Posts) => {
  return  (dispatch:Dispatch<AnyAction>) => {
    return new Promise<void>( async (resolve,eject) => {  
      dispatch(analyFetchDataRequest())
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
    dispatch(analyFetchDataRequest())
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
    dispatch(analyFetchDataRequest())
    fetch("http://localhost:3001/api/v1/posts/index", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      res.json().then((res) => {
        dispatch(analyFetchDataSuccess(res))
      })
      .catch( (err) => {
        console.log(err)
        // dispatch(postFetchDataFailure(err))
      })
    })
  }
}
