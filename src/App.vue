<script setup>
import { RouterView } from 'vue-router'
import { useStore } from '@/store'
import { onMounted } from 'vue'
/* COMPONENT */
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'

const { fetchProfile } = useStore()

onMounted(() => {
	fetchProfile()
})
</script>

<template>
	<div class="flex flex-col min-h-screen">
		<Navbar />
		<RouterView />
		<Footer />
	</div>
</template>
