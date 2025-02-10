<template>
  <div class="flex" :class="[direction == 'vertical' ? 'flex-col' : 'flex-col lg:flex-row']">
    <!-- Menú desplegable para móviles -->
    <div class="md:hidden md:mt-6">
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
    <ul class="hidden md:inline-flex"
      :class="[direction == 'vertical' ? 'flex-col' : 'md:items-center flex-row bg-white shadow mt-6 rounded-lg overflow-x-auto']">
      <li v-for="(category, index) in extendedCategories" :key="category._id"
        @click="handleSetCategory(category._id)"
        class="flex items-center justify-center md:justify-normal md:gap-4 font-semibold hover:bg-gray-100 px-4 lg:px-6 text-base lg:text-xl"
        :class="[
          direction == 'horizontal' ? 'py-4 border-r-1' : 'py-5 border-b-2 border-t-1',
          activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer',
          index == extendedCategories.length - 1 ? 'rounded-b-lg' : '',
          index == 0 ? 'rounded-t-lg' : ''
        ]">
        <Icon :icon="category.icon" className="flex items-center h-6 xl:h-full" />
        <span :class="[direction == 'horizontal' ? '' : 'hidden xl:inline']">
          {{ $t("categoriesList." + category.title) }}
        </span>
      </li>
    </ul>


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
