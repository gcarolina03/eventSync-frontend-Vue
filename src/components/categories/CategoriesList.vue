<template>
  <ul class="inline-flex bg-white shadow mt-6 rounded-lg overflow-x-auto">
    <li @click="$emit('set-category', 'all')" :class="['py-4 font-semibold border-r-2 hover:bg-gray-100 flex gap-6 items-center px-6', activeCategory == 'all' ? 'bg-gray-100' : 'cursor-pointer']">
      {{ $t("categoriesList.all") }}
    </li>
    <li v-for="category in categories" :key="category._id" @click="$emit('set-category', category._id)" :class="['py-4 font-semibold border-r-2 hover:bg-gray-100 flex flex-col gap-2 xl:gap-6 xl:flex-row items-center px-6', activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer']">
      <Icon :icon="category.icon" />
      <span class="hidden lg:inline">{{ $t("categoriesList." + category.title )}}</span>
    </li>
  </ul>
</template>


<script setup>
import Icon from '@/components/common/Icon.vue'
import { defineProps } from 'vue'

defineProps({
  categories: Array,
  activeCategory: String
})
</script>