<template>
	<GMapMap :center="{ lat: latitude, lng: longitude }" :zoom="15" map-type-id="roadmap"
		style="width: 100%; height: 150px">
		<GMapMarker :position="{ lat: latitude, lng: longitude }" />
	</GMapMap>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
	latitude: {
		type: Number,
		required: true,
	},
	longitude: {
		type: Number,
		required: true,
	},
})
</script>