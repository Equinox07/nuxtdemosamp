/*jshint esversion:6 */
/*jshint esversion:9 */
import Vue from 'vue';
import {mapGetters} from 'vuex';

const User = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    authenticated: 'isAuthenticated',
                    user: 'loggedInUser'
                })
            },
        });
    }
};

Vue.use(User);