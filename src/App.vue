<script setup>
import { RouterView } from 'vue-router'
import { useStore } from '@/store'
import { onMounted } from 'vue'
/* COMPONENT */
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'

const store = useStore()

onMounted( async () => {
	await store.fetchProfile()
	if(store.user) {
		await store.fetchLatestNotifications()
	}
})
</script>

<template>
	<div class="flex flex-col min-h-screen">
		<Navbar />
		<RouterView />
		<Footer />
	</div>
</template>
