/*eslint no-unused-vars: ["error", { "caughtErrorsIgnorePattern": "^ignore" }]*/
/*jshint esversion: 6 */
export const state = () => ({
    errors: {}
});

//getters
export const getters = {
    errors(state) {
        return state.errors;
    }
};

export const mutations = {
    SET_VALIDATION_ERRORS(state, errors) {
        state.errors = errors;
    }
};

export const actions = {
    setErrors({commit}, errors) {
        commit('SET_VALIDATION_ERRORS', errors);
    },
    clearErrors({commit}) {
        commit('SET_VALIDATION_ERRORS', {});
    }
};