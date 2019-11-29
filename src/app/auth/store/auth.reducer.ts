import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
}

const initialState = {
    user: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN: {
            const user = new User(action.paylod.userId, action.paylod.userId, action.paylod.token, action.paylod.expirationDate)
            return {
                ...state,
                user: user
            };
        }
        case AuthActions.LOGOUT: {
            return {
                ...state,
                user: null
            };
        }
    }
    return state;
}