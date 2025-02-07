<template>
  <nav class="bg-primary w-full flex flex-wrap justify-between items-center mx-auto p-4">
    <!-- Logo -->
    <img src="@/assets/logo.png" class="h-8" alt="EventSync Logo" />

    <!-- Botón cerrar menú hamburguesa -->
    <div v-show="showMenu" @click="toggleMenu" class="lg:hidden text-white cursor-pointer focus:outline-none">
      <Icon icon="x-mark" className="h-6 w-6" />
    </div>

    <!-- Enlaces de navegación -->
    <div :class="['lg:flex lg:items-center lg:justify-center', showMenu ? 'block' : 'hidden']" class="w-full lg:w-auto mt-4 lg:mt-0">
      <div class="flex flex-col lg:flex-row lg:gap-6 items-center">
        <ButtonComp to="/" :type="navClass('/')">
          {{ $t('home') }}
        </ButtonComp>
        <div class="hidden lg:inline-block h-[20px] w-0.5 bg-neutral-100 opacity-40"></div> <!-- separador -->
        <ButtonComp to="/services" :type="navClass('/services')">
          {{ $t('services') }}
        </ButtonComp>
        <template v-if="user">
          <div class="hidden lg:inline-block h-[20px] w-0.5 bg-neutral-100 opacity-40"></div> <!-- separador -->
          <ButtonComp to="/events" :type="navClass('/events')">
            {{ $t('events') }}
          </ButtonComp>
        </template>
      </div>
    </div>

    <!-- Botones de autenticación o UserMenu -->
    <div class="flex items-center lg:w-auto flex-row sm:gap-4" :class="[showMenu ? 'w-full justify-center' : '']">
      <template v-if="!router.user">
        <!-- <ButtonComp to="/signup" type="transparent" class="sm:text-base">
          {{ $t('signup') }}
        </ButtonComp> -->
        <ButtonComp to="/login" type="white" additionalClass="sm:text-base">
          {{ $t('login') }}
        </ButtonComp>
      </template>
      <template v-else>
        <!-- <UserMenu :user="user" :handleShow="changeShowMenu" :menu="showMenu" /> -->
      </template>
    </div>

    <!-- Botón de menú hamburguesa -->
    <button v-show="!showMenu" @click="toggleMenu" class="lg:hidden text-white cursor-pointer focus:outline-none">
      <Icon icon="bars" className="h-6 w-6" />
    </button>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import Icon from '@/components/common/Icon.vue'
import ButtonComp from '@/components/common/Button.vue'

let currentPath = useRoute().path;
const router = useStore();
const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};


const navClass = (path) => {
  return currentPath == path ? 'menuActive' : 'menu'; // Asignar la clase activa o normal
};
</script>
