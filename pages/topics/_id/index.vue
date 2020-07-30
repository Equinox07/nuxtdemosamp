<template>
  <div class="mx-auto container" >
      <h2 class="text-center" >Single Topic</h2>
      <div v-if="topic" class="my-5">
          <div class="card p-3">
              <h4 class="card title bg-info p-2 ">{{topic.title}}</h4>
              <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
              <div class="card-body" v-for="(content, index) in topic.posts" :key="index" >
                  {{content.body}}
                  <p class="text-muted">{{content.created_at}} by {{content.user.name}}</p>
                   <div v-if="authenticated" >
                <nuxt-link :to="{name: 'topics-posts-edit', params:{id: $route.params.id,  post_id: content.id}}">
                <button v-if="user.id === content.user.id" class="btn btn-outline-info  fa fa-edit pull-right" ></button>
                </nuxt-link>

                <button v-if="user.id === topic.user.id" @click="deletePost(content.id)" class="btn btn-outline-danger  fa fa-trash pull-right" ></button>
        </div>
              </div>
          </div>
      </div>


      <div class="mt-5 ml-5" v-if="authenticated" >
          <form action="">
              <div class="form-group">
              <label for="email  " class="text-bold" > <strong>Add New Post</strong> </label>
              <textarea class="form-control" v-model.trim="post.body"></textarea>
              <small class="form-text text-danger" v-if="errors.body" >{{errors.body[0]}}</small>
          </div>
          <button class="btn btn-outline-primary" @click.prevent="createPost" >Add New Post</button>
        </form>
      </div>
  </div>
</template>

<script>
export default {
    middleware: ["auth"],
    data () {
        return {
            topic: '',
            post: {
                body: ''
            }

        }
    },
    async asyncData({$axios, params}) {
        let {data} = await $axios.$get(`/topics/${params.id}`)
        return {
            topic: data,
        }
    },
    methods: {
        async createPost(){
            try {
                await this.$axios.post(`/topics/${this.$route.params.id}/posts`, {body: this.post.body})
                this.$router.push('/')
            } catch (e) {
                this.error = e.response
            }
        },
        async deletePost(post){
            console.log(post)
            await this.$axios.delete(`/topics/${this.$route.params.id}/posts/${post}`)
            this.$router.push('/') 
        }
    }

}
</script>

<style>

</style>