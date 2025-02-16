<template>
	<GoogleMap 
		style="width: 100%; height: 400px;" class="mt-4"
		:center="{ lat: latitude, lng: longitude }" :zoom="15">
		<Marker :options="{ position: { lat: latitude, lng: longitude } }" />
	</GoogleMap>
</template>

<script setup>
import { defineProps } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

const props = defineProps({
	latitude: {
		type: Number,
		required: true
	},
	longitude: {
		type: Number,
		required: true
	}
})
</script>