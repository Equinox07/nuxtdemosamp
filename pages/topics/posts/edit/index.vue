<template>
  <div class="container">
      
    <div class="col-md-12 mx-auto card  mt-5" >
      <h4>Update Post</h4>
     
      <div class="card-body">
      <form action="">
              <div class="form-group">
              <label for="email  " class="text-bold" > <strong>Add New Post</strong> </label>
              <textarea class="form-control" v-model.trim="post.body"></textarea>
              <small class="form-text text-danger" v-if="errors.body" >{{errors.body[0]}}</small>
          </div>
          <button class="btn btn-outline-primary" @click.prevent="updatePost" >Updated Post</button>
        </form>
      </div>
  </div>
  <div class="mt-5 btn btn-ouline-info" >Back to Topics</div>
  </div>
</template>

<script>
export default {
     middleware: ["auth"],
    data () {
        return {
            post:  {
                body: ''
            }
        }
    },
    async asyncData({$axios, params}) {
        const {data} = await $axios.get(`/topics/${params.id}/posts/${params.post_id}`)
        return {post: data.data}
    },
    methods: {
        async updatePost(){
            try {
                await this.$axios.patch(`/topics/${this.$route.params.id}/posts/${this.$route.params.post_id}`, {body: this.post.body})
                this.$router.push('/topics')
            } catch (e) {
                this.error = e.response
            }
        }
    },

}
</script>

<style>

</style>