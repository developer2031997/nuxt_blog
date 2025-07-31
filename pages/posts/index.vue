<template>
  <div class="container px-5 py-5 mx-auto">
    <div class="text-center pb-4">
      <form
        class="flex flex-wrap gap-5 justify-center items-center"
        @submit="serchPost"
      >
        <div class="col-auto my-2">
          <input
            type="text"
            v-model="search"
            @input="textsearch"
            class="form-control post-input p-1 rounded-md"
            id="inputPassword2"
            placeholder="Search Article Here.."
          />
        </div>
        <div class="col-auto my-2">
          <select
            v-model="selectedFilter"
            @change="applyFilter"
            class="form-select post-input p-1 rounded-md"
          >
            <option disabled value="">Sort By</option>
            <option value="alphabetasc">Sort By Alphabets Asc</option>
            <option value="alphabetdesc">Sort By Alphabets Desc</option>
            <option value="dateasc">Sort By Date & Time Asc</option>
            <option value="datedesc">Sort By Date & Time Desc</option>
          </select>
        </div>
        <div class="col-auto my-2">
          <select
            v-model="selectedCategory"
            @change="applyFilter"
            class="form-select post-input p-1 rounded-md"
            :disabled="isCategoryDisabled"
          >
            <option disabled value="">Filter By Category</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
              class="py-5"
            >
              {{ category }} ({{ getCategoryCount(category) }})
            </option>
          </select>
        </div>

        <div class="col-auto my-2" v-if="selectedCategory">
          <select
            v-model="selectedSubCategory"
            @change="applyFilter"
            class="form-select post-input p-1 rounded-md"
          >
            <option disabled value="">Filter By Subcategory</option>
            <option
              v-for="subCategory in subCategories[selectedCategory]"
              :key="subCategory"
              :value="subCategory"
            >
              {{ subCategory }}
            </option>
          </select>
        </div>
        <div class="col-auto my-2">
          <a
            href=""
            class="btn-clear p-2 px-4 rounded-md shadow-md"
            @click="clearFilter"
            ><b>Clear</b></a
          >
        </div>

        <!-- {{ search }} -->
      </form>
    </div>
    <hr />
    <hr />
    <div class="flex flex-wrap m-4" v-if="filteredPosts">
      <ArticleCard
        v-for="article in filteredPosts"
        :key="article._id"
        :article="article"
      />
    </div>
    <!-- <div class="flex flex-wrap m-4" v-if="filteredPosts">
      <div
        class="p-4 w-full sm:w-1/2 lg:w-1/3"
        v-for="article in filteredPosts"
        :key="article._id"
      >
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
                {{ article . title }}
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
                  >🕒 {{ article . date }}</a
                ><span
                  class="text-black mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1"
                  >{{ article . time }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>   -->

    <div v-if="loading" class="text-center py-5 my-5 h-screen">
      <h2 class="text-4xl">Data Is Fetching, Please Wait ....</h2>
    </div>

    <div v-if="noDataFound" class="text-center py-5 my-5 h-screen">
      <h2 class="text-4xl">Article Not Found...</h2>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Nuxt Content Medical Blog",
});

const search = ref("");
const articles = ref([]);
const filteredPosts = ref([]);
const selectedFilter = ref("");
const loading = ref(true);

const selectedCategory = ref("");
const categories = ref([]);
const noDataFound = ref();

const selectedSubCategory = ref("");
console.log(selectedSubCategory.value.toLowerCase());

const subCategories = ref({
  health: ["Nutrition", "Exercise", "Mental Health"],
  wellness: ["Yoga", "Meditation", "Lifestyle"],
  medicine: [categories.value],
});
console.log("outside filteredPosts", filteredPosts.value);

const fetchArticles = async () => {
  try {
    const { data: posts } = await useAsyncData("posts", () =>
      queryContent("posts").find()
    );

    console.log("posts", posts.value);
    articles.value = posts.value;
    filteredPosts.value = posts.value;

    loading.value = false;
    console.log("Inside filteredPosts", filteredPosts.value);

    const allTags = articles.value.flatMap((article) => article.tags || []);
    categories.value = [...new Set(allTags)];
  } catch (err) {
    console.error("Error fetching articles:", err);
  }
};

const serchPost = (e) => {
  e.preventDefault();
};

watch(search, (newValue) => {
  selectedCategory.value = ""; // Clear selected category
  applyFilter(); // Apply filters after resetting the category

  const searchTerm = newValue.toLowerCase();

  filteredPosts.value =
    searchTerm.trim() === ""
      ? articles.value
      : articles.value.filter(
          (article) =>
            article.title.toLowerCase().includes(searchTerm) ||
            (article.tags &&
              article.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm)
              ))
        );

  // if (searchTerm.trim() === "") {
  //   filteredPosts.value = articles.value;
  // }
  // else {
  //   filteredPosts.value = articles.value.filter(article =>
  //     article.title.toLowerCase().includes(searchTerm) ||
  //     (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  //   );
  // }

  // Check if filtered posts array is empty
  if (filteredPosts.value.length === 0) {
    // Set a flag to indicate no data was found
    noDataFound.value = true;
  } else {
    // Reset the flag if data is found
    noDataFound.value = false;
  }
});

const applyFilter = () => {
  //     if (selectedFilter.value === 'dateasc') {
  //       filteredPosts.value.sort((a, b) => {
  //         console.log('aDate:',typeof  a.date, a.date);
  //           console.log('bTime:', typeof a.time,a.time);
  //           console.log('bDate:', typeof b.date,b.date);
  //           console.log('bTime:', typeof b.time,b.time);

  //         const aDateTime = new Date(`${a.date} ${a.time}`);
  //         const bDateTime = new Date(`${b.date} ${b.time}`);

  //           console.log('aDateTime:', aDateTime);
  //           console.log('bDateTime:', bDateTime);

  //           if (aDateTime < bDateTime) {
  //               return -1;
  //           } else if (aDateTime > bDateTime) {
  //               return 1;
  //           } else {
  //               return 0;
  //           }
  //       });
  //   }
  //   else if(selectedFilter.value === 'datedesc'){
  //     filteredPosts.value.sort((a, b) => {
  //         const aDateTime = new Date(`${a.date} ${a.time}`);
  //         const bDateTime = new Date(`${b.date} ${b.time}`);

  //           console.log('aDateTime:', aDateTime);
  //           console.log('bDateTime:', bDateTime);

  //           if (aDateTime < bDateTime) {
  //               return 1;
  //           } else if (aDateTime > bDateTime) {
  //               return -1;
  //           } else {
  //               return 0;
  //           }
  //       });

  //   }
  //    else if (selectedFilter.value === 'alphabetasc') {
  //       filteredPosts.value.sort((a, b) => a.title.localeCompare(b.title));
  //     }
  //     else if (selectedFilter.value === 'alphabetdesc') {
  //       filteredPosts.value.sort((a, b) => b.title.localeCompare(a.title));
  //     }
  let tempPosts = [...articles.value];
  // console.log("select",selectedCategory.value)
  // console.log("selectedCategory.value",selectedCategory.value)

  if (selectedCategory.value) {
    tempPosts = tempPosts.filter((article) => {
      return (
        article.tags &&
        article.tags.some((tag) => tag.includes(selectedCategory.value))
      );
    });
    console.log("Filtered tempPosts:", tempPosts);
  }

  if (selectedSubCategory.value) {
    console.log(
      "Selected Subcategory",
      selectedSubCategory.value.toLowerCase()
    );
    tempPosts = tempPosts.filter((article) => {
      return (
        article.tags &&
        article.tags.some((tag) =>
          tag.includes(selectedSubCategory.value.toLowerCase())
        )
      );
    });
  }

  // if (selectedFilter.value === 'dateasc') {
  //   tempPosts.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
  // } else if (selectedFilter.value === 'datedesc') {
  //   tempPosts.sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));
  // } else if (selectedFilter.value === 'alphabetasc') {
  //   tempPosts.sort((a, b) => a.title.localeCompare(b.title));
  // } else if (selectedFilter.value === 'alphabetdesc') {
  //   tempPosts.sort((a, b) => b.title.localeCompare(a.title));
  // }
  // console.log("before",filteredPosts.value )

  switch (selectedFilter.value) {
    case "dateasc":
      tempPosts = tempPosts.sort(
        (a, b) =>
          new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
      );
      break;
    case "datedesc":
      tempPosts = tempPosts.sort(
        (a, b) =>
          new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
      );
      break;
    case "alphabetasc":
      tempPosts = tempPosts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "alphabetdesc":
      tempPosts = tempPosts.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  filteredPosts.value = tempPosts;
  // console.log("after",filteredPosts.value )
};

const isCategoryDisabled = computed(() => {
  return search.value.trim().length > 0;
});

const getCategoryCount = (category) => {
  return articles.value.filter(
    (article) => article.tags && article.tags.includes(category)
  ).length;
};

const clearFilter = () => {
  filteredPosts.value = articles.value;
  selectedCategory.value = "";
  selectedSubCategory.value = "";
  selectedFilter.value = "";
  search.value = "";
};

onMounted(fetchArticles);
</script>

<style>
a {
  text-decoration: none;
  color: #000;
}

::placeholder {
  color: #ddd !important;
}

hr {
  border: 1.5px solid dark;
  /* Change the color to dark */
}

input#inputPassword2,
select.form-select,
select option[disabled],
.post-tag {
  background: #003a70;
  color: #fff;
}

select.form-select option:hover {
  background-color: #ddd !important;
}

.card {
  /* box-shadow: 0 0 10px #ddd; */
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  border-radius: 40px;
  background-color: #f9f9f9;
}

.card:hover {
  /* box-shadow: 0 0 10px #000;*/
  /* box-shadow: 0 0 0 2px #003A70;  */
  transition: all 0.4s ease-in-out;
  transform: scale(1.05);
}

img {
  border-radius: 20px;
}

body {
  background: #f8f9fa;
}

.post-input {
  /* width: 220px !important; */
}

.card-body {
  padding: 0px 15px;
}

.btn-clear {
  background-color: #003a70;
  /* padding: 6px 20px; */
  color: #fff;
  font-weight: 600;
}

.btn-clear:hover {
  background-color: #ddd;
}

@media screen and (max-width: 480px) {
  .post-input {
    width: 320px !important;
  }
}
</style>
