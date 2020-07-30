<template>
  <div class="col-md-4 mx-auto card  mt-5 p-0" >
      <div class="card-header"> <h5>Register</h5></div>
     
      <div class="card-body">
      <form action="" class="form">
          <div class="form-group">
              <label for="email">Full Name</label>
              <input class="form-control" v-model="register.name" type="name">
             <small class="form-text text-danger" v-if="errors.name" >{{errors.name[0]}}</small>
          </div>
          <div class="form-group">
              <label for="email">Email Address</label>
              <input class="form-control" v-model="register.email" type="email">
              <small class="form-text text-danger" v-if="errors.email" >{{errors.email[0]}}</small>
          </div>
          <div class="form-group">
              <label for="email">Password</label>
              <input class="form-control" v-model="register.password" type="password">
               <small class="form-text text-danger" v-if="errors.password" >{{errors.password[0]}}</small>
          </div>
          <button class="btn btn-primary" @click.prevent="submit" > Register </button>
          <h5>Have an account already ?  <nuxt-link to="login" >Login</nuxt-link></h5> 
      </form>
      </div>
  </div>
</template>

<script>
export default {
    auth: 'guest',
     data() {
        return {
            register:{ 
                email: '',
                password: '',
                name: ''
            },
            error: null
        }
    },
    methods: {
        async submit(){
            try {
                await this.$axios.post("register", this.register)
                await this.$auth.loginWith("local", {data: {'email': this.register.email, 'password': this.register.password}})
                this.$router.push({path: this.$route.query.redirect || "/profile"})
            } catch (e) {
                this.error = e.response.data
                console.log(this.error)
                console.log('Error login in....')
            }
        }
    },

}
</script>

<style>

</style>