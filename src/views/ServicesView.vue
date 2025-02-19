<template>
  <div class="md:w-[95%] px-4 md:px-0 flex-grow py-8 mx-auto">
    <div class="flex flex-col md:grid md:grid-cols-12 gap-6">
      <!-- Sidebar de filtros -->
      <div class="md:min-w-15 md:col-span-1 xl:col-span-2">
        <div class="flex flex-col gap-2 mt-3 text-base bg-white shadow rounded-lg">
          <CategoriesList :categories="store.categories" direction="vertical" />
        </div>
      </div>


      <!-- Sección de servicios -->
      <div class="md:col-span-11 xl:col-span-9">
        <p class="font-bold text-[30px]">{{ $t("ourServices") }} ({{ filteredServices.length }})</p>
        <p>
          {{ $t("servicesDescription") }}
        </p>
        <hr class="my-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
        <div class="mt-4 flex flex-wrap gap-8">
          <template v-if="filteredServices.length == 0">
            <NoServices  />
          </template>
          <template v-else>
            <Card
              v-for="service in filteredServices"
              :key="service._id"
              :data="service"
              :update="handleReload"
              :user="userLog"
              :requestTo="handleServiceTo"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- Formulario de solicitud de servicio -->
    <!-- <Blur v-if="showForm">
      <SelectEventForm :handleForm="handleForm" :service="serviceTo" />
    </Blur> -->
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store';
/* COMPONENTS */
import CategoriesList from '@/components/categories/CategoriesList.vue'
import NoServices from '@/components/services/NoServices.vue'
import Card from '@/components/services/Card.vue'
/* import SelectEventForm from '@/components/requests/SelectEventForm.vue'
import Blur from '@/components/common/Blur.vue' */


const router = useRouter()
const store = useStore()
const activeCategory = ref(store.activeCategory)

onBeforeMount(async () => {
  await store.fetchCategories()
  await store.fetchServices()
})

watch(() => store.activeCategory, () => {
	activeCategory.value = store.activeCategory
})

const reload = ref(false)
const userLog = ref(null)
const showForm = ref(false)
const serviceTo = ref(null)

// Alternar formulario de solicitud de servicio
const handleForm = () => {
  showForm.value = !showForm.value
}

// Recargar servicios
const handleReload = () => {
  reload.value = true
}

// Manejo de servicio seleccionado
const handleServiceTo = (data) => {
  if (userLog.value) {
    serviceTo.value = data
    showForm.value = true
  } else {
    router.push('/login')
  }
}


// Filtrar servicios por categoría
const filteredServices = computed(() => {
  if (activeCategory.value == '-1') {
		return store.services
  }
	return store.services.filter((service) => String(service.categoryId._id) === String(activeCategory.value))
})

</script>
