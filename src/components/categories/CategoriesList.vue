<template>
  <div :class="[direction == 'vertical' ? 'flex flex-col' : 'flex flex-col lg:flex-row']">
    <!-- Menú desplegable para móviles -->
    <div class="md:hidden mt-6">
      <button @click="isOpen = !isOpen" class="bg-white shadow rounded-lg px-6 py-4 w-full text-left font-semibold text-sm lg:text-base">
        {{ activeCategory ? $t("categoriesList." + activeCategory) : $t("categoriesList.all") }}
      </button>
      <div v-if="isOpen" class="mt-2 bg-white shadow rounded-lg">
        <ul class="">
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
    <ul class="hidden md:inline-flex" :class="[direction == 'vertical' ? 'flex-col' : 'md:items-center flex-row bg-white shadow mt-6 rounded-lg overflow-x-auto']">
      <li @click="$emit('set-category', 'all')" class="font-semibold  hover:bg-gray-100 flex gap-6 items-center px-6" :class="[direction == 'horizontal' ?'py-4 border-r-2' : 'py-5 border-b-2 border-t-2', activeCategory == 'all' ? 'bg-gray-100' : 'cursor-pointer', 'text-base lg:text-xl']">
        {{ $t("categoriesList.all") }}
      </li>
      <li v-for="category in categories" :key="category._id" @click="$emit('set-category', category._id)" class="font-semibold  hover:bg-gray-100 flex gap-6 items-center px-6" :class="[direction == 'horizontal' ?'py-4 border-r-2' : 'py-5 border-b-2', activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer', 'text-base lg:text-xl']">
          <Icon :icon="category.icon" :className="['h-6 flex items-center', 'xl:h-full']"/>
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
  activeCategory: String,
  direction: {
    type: String,
    default: 'horizontal'
  }
})

const isOpen = ref(false)

</script>
