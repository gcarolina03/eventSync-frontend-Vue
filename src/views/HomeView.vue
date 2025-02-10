<template>
  <main class="w-full flex-grow relative px-8 pt-10">
    <p class="font-bold text-base md:text-xl lg:text-4xl">{{ $t("dashboardTitle") }}</p>
    <CategoriesList :categories="store.categories" direction="horizontal" />
  </main>
</template>

<script setup>
import { onMounted, onBeforeMount } from 'vue'
import { useStore } from '@/store'
import Icon from '@/components/common/Icon.vue'
import CategoriesList from '@/components/categories/CategoriesList.vue'
import ServiceCard from '@/components/services/Card.vue'

const store = useStore();

onBeforeMount(async () => {
  await store.fetchServices()
  await store.fetchCategories()
})

</script>