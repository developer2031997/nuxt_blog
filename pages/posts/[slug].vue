<template>
  <div class="">
    <!-- Breadcrumb -->
    <nav
      class="breadcrum-background flex px-5 py-3 my-5 mx-10 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol
        class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
      >
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-white"
          >
            <svg
              class="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
              />
            </svg>
            <NuxtLink :to="`/posts`" class="text-white hover:text-blue"
              ><b>Posts</b></NuxtLink
            >
          </a>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg
              class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span
              class="ms-1 text-sm font-medium text-gray-200 md:ms-2 dark:text-gray-400"
            >
              <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }">
                <li v-if="doc" aria-current="page">{{ doc.title }}</li>
              </ContentDoc>
            </span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="mx-10 py-5">
      <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }">
        <div class="text-center">
          <h1 class="text-4xl font-bold blue">{{ doc.title }}</h1>
          <br />
          <p class="text-xl text-gray-500 mt-2">
            {{ doc.date }} {{ doc.time }}
          </p>
        </div>

        <div class="flex justify-center">
          <img
            v-if="doc.thumbnail"
            :src="doc.thumbnail"
            :alt="doc.title"
            class="my-5"
          />
        </div>
        <!-- <hr/> -->
        <div class="py-3 content-renderer">
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>
    </div>
    <div class="col-lg-12 text-center pt-3">
      <NuxtLink :to="`/posts`" class=""
        ><button class="btn-back my-10 py-3 px-10 rounded-full shadow">
          Back
        </button></NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const { slug } = useRoute().params;
const doc = ref(null);
import { useRoute } from "vue-router";
const route = useRoute();

// Remove trailing slash (fixes refresh errors)
const actualPath = route.path.replace(/\/$/, "");

const fetchDoc = async () => {
  const { data1 } = await useAsyncData(`doc-${slug}`, () =>
    $fetch(`/posts/${slug}`)
  );

  // Fetch the markdown content at build time (good for static)
  const { data: doc } = await useAsyncData(`doc-${actualPath}`, () =>
    queryContent().where({ _path: actualPath }).findOne()
  );
};

onMounted(fetchDoc);

watch(doc, (newDoc) => {
  if (newDoc) {
    useHead({
      title: newDoc.title,
    });
  }
});
</script>

<style>
.breadcrum-background {
  background-color: #003a70;
  border-radius: 10px;
}
.content-renderer {
  line-height: 2;
}
.content-renderer h1 {
  color: #003a70;
  font-size: 40px;
  font-weight: 600;
}

.content-renderer p {
  font-size: 16px;
  line-height: 3;
}

.content-renderer img {
  max-width: 100%;
  border-radius: 10px;
  margin: 20px 0;
}

.btn-back {
  background-color: #003a70;
  /* padding: 6px 20px; */
  color: #fff;
  font-weight: 600;
}

.btn-back:hover {
  background-color: #000;
  transform: scale(1.05);
}
</style>
