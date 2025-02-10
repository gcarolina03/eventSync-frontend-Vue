<template>
  <div class="flex" :class="[direction == 'vertical' ? 'flex-col' : 'flex-col md:flex-row']">
    <!-- Menú desplegable para móviles -->
    <div class="md:hidden" :class="[direction == 'horizontal' ? 'mt-6' : '']">
      <button @click="isOpen = !isOpen"
        class="flex gap-6 bg-white shadow rounded-lg px-6 py-4 w-full text-left font-semibold text-sm lg:text-base">
        <Icon :icon="extendedCategories.find(cat => cat._id == activeCategory)?.icon" className="w-4 h-[1em]" />
        {{
          activeCategory == -1
            ? $t("categoriesList.all")
            : $t("categoriesList." + extendedCategories.find(cat => cat._id == activeCategory)?.title)
        }}
      </button>
      <div v-if="isOpen" class="mt-2 bg-white shadow rounded-lg">
        <ul class="">
          <li v-for="category in extendedCategories" :key="category._id" @click="handleSetCategory(category._id)"
            :class="[
              'py-4 font-semibold hover:bg-gray-100 flex gap-6 items-center px-6 text-sm lg:text-base',
              activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer'
            ]">
            <Icon :icon="category.icon" className="w-4 h-[1em]" />
            {{ $t("categoriesList." + category.title) }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Menú horizontal para pantallas grandes -->
    <div class="hidden md:flex text-sm md:text-base"
      :class="[direction == 'vertical' ? 'flex-col' : 'flex-row bg-white shadow mt-6 rounded-lg ']">
      <div v-for="(category, index) in extendedCategories" :key="category._id" @click="handleSetCategory(category._id)"
        class="flex items-center justify-center md:justify-normal font-semibold hover:bg-gray-100 px-4 lg:px-6 text-sm md:text-base lg:text-xl"
        :class="[
          direction == 'horizontal' ? 'flex-col gap-1 xl:flex-row xl:gap-4 py-4 h-full border-r-2' : 'py-5 md:gap-4 border-b-2 border-t-1',
          activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer',
          direction == 'vertical' && index == extendedCategories.length - 1 ? 'rounded-b-lg' : '',
          direction == 'horizontal' && index == extendedCategories.length - 1 ? 'rounded-br-lg rounded-tr-lg' : '',
          direction == 'vertical' && index == 0 ? 'rounded-t-lg' : '',
          direction == 'horizontal' && index == 0 ? 'rounded-tl-lg rounded-bl-lg' : '',
        ]">
        <Icon :icon="category.icon" className="flex items-center h-6 xl:h-full" />
        <span :class="[direction == 'horizontal' ? 'hidden sm:inline' : 'hidden xl:inline']">
          {{ $t("categoriesList." + category.title) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { useStore } from '@/store';
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
  categories: Array,
  direction: {
    type: String,
    default: 'horizontal'
  }
})

const store = useStore()
const isOpen = ref(false) // Flag for Dropdown on mobile

const extendedCategories = computed(() => {
  return [
    { _id: -1, title: 'all', icon: 'no-filter' },
    ...props.categories
  ]
})

const activeCategory = computed(() => store.activeCategory)

const handleSetCategory = (categoryId) => {
  store.setActiveCategory(categoryId)
  isOpen.value = false // Close dropdown on mobile
}
</script>
