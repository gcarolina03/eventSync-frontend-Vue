<template>
  <div class="w-full h-full relative px-8 pt-10">
    <p class="font-bold text-[30px]">{{ $t("dashboardTitle") }}</p>
    <CategoriesList :categories="store.categories" :activeCategory="store.activeCategory" @set-category="store.setActiveCategory" />
  </div>
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