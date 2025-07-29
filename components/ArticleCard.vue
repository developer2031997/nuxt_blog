<template>

  <div class="p-4 w-full sm:w-1/2 lg:w-1/3">
    <NuxtLink :to="`/posts/${article.slug}`">
      <div
        class="card h-full border-2 border-grey rounded-lg overflow-hidden hover:border-blue"
      >
        <img
          v-if="article.thumbnail"
          :src="article.thumbnail"
          class="lg:h-48 md:h-36 w-full object-cover object-center"
          alt="Thumbnail"
        />
        <hr />
        <div class="p-6">
          <h2
            class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
          >
            TITLE
          </h2>
          <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
            {{ article.title }}
          </h1>
          <div v-if="article.tags" class="my-3 flex flex-wrap">
            <p
              v-for="tag in article.tags"
              :key="tag"
              class="m-1 rounded-lg post-tag px-2"
            >
              {{ tag }}
            </p>
          </div>
          <div class="flex items-center flex-wrap">
            <a class="text-black inline-flex items-center md:mb-2 lg:mb-0"
              >🕒 {{ article.date }}</a
            ><span
              class="text-black mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1"
              >{{ article.time }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
