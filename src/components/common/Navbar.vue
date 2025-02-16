<template>
  <nav class="bg-primary w-full flex flex-wrap justify-between items-center mx-auto p-4">
    <!-- Logo -->
    <img src="@/assets/logo.png" class="h-8" alt="EventSync Logo" />

    <!-- Botón cerrar menú hamburguesa -->
    <div v-show="showMenu" @click="toggleMenu" class="lg:hidden text-white cursor-pointer focus:outline-none">
      <Icon icon="x-mark" className="h-6 w-6" />
    </div>

    <!-- Enlaces de navegación -->
    <div :class="['lg:flex lg:items-center lg:justify-center', showMenu ? 'block' : 'hidden ml-[-20px]']"
      class="w-full lg:w-auto mt-4 lg:mt-0">
      <div class="flex flex-col lg:flex-row lg:gap-6 items-center">
        <div v-for="(link, index) in links" :key="link.name" :class="[
          !showMenu && index !== links.length - 1 ? 'w-full border-r-2 border-neutral-100 border-opacity-40 pr-5' : ''
        ]">
          <ButtonComp :to="link.path" :buttonStyle="navClass(link)">
            {{ $t(link.name) }}
          </ButtonComp>
        </div>
      </div>
    </div>
    <!-- Botones de autenticación o UserMenu -->
    <div class="flex items-center lg:w-auto flex-row sm:gap-4"
      :class="[showMenu ? 'w-full justify-center' : 'hidden lg:block']">
      <template v-if="!store.user">
        <!-- <ButtonComp to="/signup" type="transparent" class="sm:text-base">
          {{ $t('signup') }}
        </ButtonComp> -->
        <ButtonComp :to="{ name: 'login' }" :buttonStyle="!showMenu ? 'white' : navClass('/auth/login')" additionalClass="sm:text-base">
          {{ $t('login') }}
        </ButtonComp>
      </template>
      <UserMenu v-else :user="store.user" :handleShow="toggleUserMenu" :menu="showUserMenu" />
    </div>

    <!-- Botón de menú hamburguesa -->
    <div v-show="!showMenu" @click="toggleMenu" class="lg:hidden text-white cursor-pointer focus:outline-none">
      <Icon icon="bars" className="h-6 w-6" />
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import ButtonComp from '@/components/common/Button.vue'
import UserMenu from '@/components/common/UserMenu.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();
const showMenu = ref(false);
const showUserMenu = ref(false);
const links = [
  {
		path: { name: 'home' },
    name: 'home',
  },
  {
		path: { name: 'services' },
    name: 'services',
  },
  {
		path: { name: 'events' },
    name: 'events',
  }
]
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const toggleUserMenu = () => {
  const isSmallScreen = window.innerWidth < 1024;

  if (isSmallScreen) {
    router.push('/myprofile');
  } else {
    showUserMenu.value = !showUserMenu.value;
  }
};

const navClass = (link) => {
	return route.name == link.path.name ? 'menuActive' : 'menu';
};

watch(() => route.path, (to) => {
  
});
</script>
