<template>
  <div class="col-md-4 mx-auto card  mt-5 p-0" >
      <div class="card-header"> <h5>LOGIN</h5></div>
     
      <div class="card-body">
      <form action="" class="form">
          <div class="form-group">
              <label for="email">Email Address</label>
              <input class="form-control" v-model.trim="login.email" type="email">
              <small class="form-text text-danger" v-if="errors.email" >{{errors.email[0]}}</small>
          </div>
          <div class="form-group">
              <label for="email">Password</label>
              <input class="form-control" type="password"  v-model="login.password">
               <small class="form-text text-danger" v-if="errors.password" >{{errors.password[0]}}</small>
          </div>
          <button class="btn btn-primary" @click.prevent="submit" >Login</button>
          <h4>Don't have and account ?  <nuxt-link to="register" >Register</nuxt-link></h4> 
      </form>
      </div>
  </div>
</template>

<script>
export default {
    // middleware: ["guest"],
    auth: 'guest',
    data() {
        return {
            login:{
                email: '',
                password: ''
            },
            error: null
        }
    },
    methods: {
        async submit(){
            try {
                await this.$auth.loginWith("local",{
                data: this.login
            })
            //  this.$router.push('/profile')
            this.$router.push({
                path: this.$route.query.redirect || "/profile"
            })
            } catch (e) {
                this.error = e.response
            }
            // this.$router.push('/')
        }
    },

}
</script>

<style>

</style>

