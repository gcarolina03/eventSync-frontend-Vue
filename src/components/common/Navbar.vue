<template>
  <nav class="bg-primary w-full z-10">
    <div class="flex flex-wrap justify-between items-center mx-auto width-full py-4 px-4">
      <!-- Logo -->
      <img src="@/assets/logo.png" class="h-8" alt="EventSync Logo" />

      <!-- Botón cerrar menú hamburguesa -->
      <button v-show="showMenu" @click="toggleMenu" class="lg:hidden text-white cursor-pointer focus:outline-none">
        <Icon icon="x-mark" className="h-6 w-6" />
      </button>

      <!-- Enlaces de navegación -->
      <div :class="['lg:flex lg:items-center', showMenu ? 'block' : 'hidden']" class="w-full lg:w-auto mt-4 lg:mt-0">
        <ul class="flex flex-col lg:flex-row lg:gap-6 items-center">
          <li>
            <router-link to="/"
              :class="navClass('/')">
              {{ $t('home') }}
            </router-link>
          </li>
          <div class="hidden lg:inline-block h-[20px] w-0.5 bg-neutral-100 opacity-40"></div>
          <li>
            <router-link to="/services"
              :class="navClass('/services')">
              {{ $t('services') }}
            </router-link>
          </li>
          <template v-if="user">
            <div class="hidden lg:inline-block h-[20px] w-0.5 bg-neutral-100 opacity-40"></div>
            <li>
              <router-link to="/events"
                :class="navClass('/events')">
                {{ $t('events') }}
              </router-link>
            </li>
          </template>
        </ul>
      </div>

      <!-- Botones de autenticación o UserMenu -->
      <div class="flex items-center lg:w-auto flex-row gap-4" :class="[showMenu ? 'w-full justify-center' : '']">
        <template v-if="!user">
          <router-link to="/signup">
            <div class="text-white border cursor-pointer font-bold border-white rounded-lg text-sm px-5 py-2.5 hover:bg-dark hover:border-dark">
              {{ $t('signup') }}
            </div>
          </router-link>
          <router-link to="/login">
            <div class="text-primary hidden sm:block border cursor-pointer border-white bg-white font-bold rounded-lg text-sm px-5 py-2.5 hover:bg-dark hover:border-dark hover:text-white">
              {{ $t('login') }}
            </div>
          </router-link>
        </template>
        <template v-else>
          <!-- <UserMenu :user="user" :handleShow="changeShowMenu" :menu="showMenu" /> -->
        </template>
      </div>

      <!-- Botón de menú hamburguesa -->
      <button v-show="!showMenu" @click="toggleMenu" class="lg:hidden text-white cursor-pointer focus:outline-none">
        <Icon icon="bars" className="h-6 w-6" />
      </button>

    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import Icon from '@/components/common/Icon.vue'

const currentPath = useRoute().path;
const { user } = useStore();
const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const navClass = (path) => `block py-2 ${currentPath === path ? 'text-white cursor-default' : 'text-gray-400 hover:text-light'} font-bold`;
</script>
