/*jshint esversion:6 */
export const getters = {
    authenticated(state) {
        return state.auth.loggedIn;
    },
    authUser(state) {
        return state.auth;
    }
};