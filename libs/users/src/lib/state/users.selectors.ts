import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersPartialState, UsersState, USERS_FEATURE_KEY } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<UsersPartialState,UsersState>(USERS_FEATURE_KEY);

export const getUser=createSelector(getUsersState,(state)=>state.user);

export const getUserIsAuthenticated=createSelector(getUsersState,(state)=>state.isAuthenticated)
