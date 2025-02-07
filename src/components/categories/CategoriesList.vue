<template>
  <div>
    <!-- Menú desplegable para móviles -->
    <div class="md:hidden mt-6">
      <button @click="isOpen = !isOpen" class="bg-white shadow rounded-lg px-6 py-4 w-full text-left font-semibold text-sm lg:text-base">
        {{ activeCategory ? $t("categoriesList." + activeCategory) : $t("categoriesList.all") }}
      </button>
      <div v-if="isOpen" class="mt-2 bg-white shadow rounded-lg">
        <ul>
          <li @click="$emit('set-category', 'all')" :class="['py-4 font-semibold hover:bg-gray-100 flex gap-6 items-center px-6 text-sm lg:text-base', activeCategory == 'all' ? 'bg-gray-100' : 'cursor-pointer']">
            {{ $t("categoriesList.all") }}
          </li>
          <li v-for="category in categories" :key="category._id" @click="$emit('set-category', category._id)" :class="['py-4 font-semibold hover:bg-gray-100 flex gap-6 items-center px-6', activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer', 'text-sm lg:text-base']">
            <Icon :icon="category.icon" />
            <span>{{ $t("categoriesList." + category.title )}}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Menú horizontal para pantallas grandes -->
    <ul class="hidden md:inline-flex bg-white shadow mt-6 rounded-lg overflow-x-auto">
      <li @click="$emit('set-category', 'all')" :class="['py-4 font-semibold border-r-2 hover:bg-gray-100 flex gap-6 items-center px-6', activeCategory == 'all' ? 'bg-gray-100' : 'cursor-pointer', 'text-base lg:text-xl']">
        {{ $t("categoriesList.all") }}
      </li>
      <li v-for="category in categories" :key="category._id" @click="$emit('set-category', category._id)" :class="['py-4 font-semibold border-r-2 hover:bg-gray-100 flex flex-col gap-2 xl:gap-6 xl:flex-row items-center px-6', activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer', 'text-base lg:text-xl']">
        <Icon :icon="category.icon" />
        <span class="hidden xl:inline">{{ $t("categoriesList." + category.title )}}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Icon from '@/components/common/Icon.vue'
import { defineProps, ref } from 'vue'

defineProps({
  categories: Array,
  activeCategory: String
})

const isOpen = ref(false)

</script>
