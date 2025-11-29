import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, 
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS
    ,LOGOUT} from "./ActionTypes"


const initialState={
    user:null,
    Loading:false,
    error:null,
    jwt:null
}


const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return{
                ...state,
                Loading:true,
                error:null
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return{
                ...state,
                Loading:false,
                error:null,
                jwt:action.payload
            }

        case GET_USER_SUCCESS:
            return{
                ...state,
                Loading:false,
                error:null,
                user:action.payload
            }


        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return{
                ...state,
                Loading:false,
                error:action.payload,
            }

        case LOGOUT:
            return initialState;

    default:
        return state;
        break;
    }
}

export default authReducer;