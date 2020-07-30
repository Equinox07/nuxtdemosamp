/*jshint esversion: 6 */

export default function({ $axios, store, redirect }){
    $axios.onError(err => {
        console.log(err);
        if (err.response.status === 422 ) {
            console.log('Error from plugin', err.response.data.errors);
            store.dispatch('validation/setErrors', err.response.data.errors);
            // return redirect("/login");
        }
    });

    $axios.onRequest(() => {
        // console.log('Error from plugin 2');
        store.dispatch('validation/clearErrors');
    });
}
