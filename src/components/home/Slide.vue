<template>
	<!-- Component: Testimonial slider -->
	<div class="relative w-full glide">
		<!-- Slides -->
		<div class="overflow-hidden text-center rounded text-slate-500 shadow-slate-200" data-glide-el="track">
			<ul
				class="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
				<li v-for="(testimonial, index) in testimonials" :key="index">
					<div class="w-full">
						<!-- Start Testimonial -->
						<div class="overflow-hidden relative justify-center h-[400px] flex items-center">
							<div
								class="bg-[#FFFBF5] p-[1rem] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] h-[300px] w-[220px] transform rotate-[10deg]">
								<div class="h-[220px]">
									<img :src="testimonial.image" class="object-cover w-full h-full" />
								</div>
							</div>
							<div class="relative flex-col ml-[100px] w-[600px] h-full flex items-center justify-center">
								<Icon icon="quote" class="absolute top-0 left-0 text-[80px] text-[#DCDBFF]" />
								<div class="ml-[100px] mt-[70px] flex-col text-black flex w-full">
									<p class="text-3xl text-left">
										{{ testimonial.text }}
									</p>
									<div class="flex items-center mt-5 gap-2">
										<Icon icon="circle-user" class="h-10 w-10 self-start text-dark" />
										<span>{{ testimonial.name }}</span>
									</div>
								</div>
							</div>
						</div>
						<!-- End Testimonial -->
					</div>
				</li>
			</ul>
		</div>
		<!-- Indicators -->
		<div class="flex items-center justify-center w-full gap-2 pt-6 glide__bullets" data-glide-el="controls[nav]">
			<button class="p-4 group glide__bullet" data-glide-dir="=0" aria-label="goto slide 1">
				<span
					class="block w-2 h-2 transition-colors duration-600 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
			</button>
			<button class="p-4 group glide__bullet" data-glide-dir="=1" aria-label="goto slide 2">
				<span
					class="block w-2 h-2 transition-colors duration-600 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
			</button>
			<button class="p-4 group glide__bullet" data-glide-dir="=2" aria-label="goto slide 3">
				<span
					class="block w-2 h-2 transition-colors duration-600 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
			</button>
		</div>
	</div>
	<!-- End Testimonial slider -->
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed } from 'vue'
import Glide from '@glidejs/glide'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/common/Icon.vue'

const { t } = useI18n()
let slider = null

onMounted(() => {
	slider = new Glide('.glide', {
		type: 'slider',
		focusAt: 'center',
		perView: 1,
		autoplay: 4000,
		animationDuration: 1000,
		gap: 0,
		hoverpause: true
	}).mount()
})

onBeforeUnmount(() => {
	if (slider) {
		slider.destroy()
	}
})

const testimonials = computed(() => [
	{
		image:
			'https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg?cs=srgb&dl=pexels-salah-alawadhi-382297.jpg&fm=jpg',
		text: t('testimonials.testimonial1.text'),
		name: t('testimonials.testimonial1.name')
	},
	{
		image:
			'https://i.pinimg.com/736x/7c/eb/9a/7ceb9a306608c467aee245bb36dd9db3.jpg',
		text: t('testimonials.testimonial2.text'),
		name: t('testimonials.testimonial2.name')
	},
	{
		image:
			'https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=',
		text: t('testimonials.testimonial3.text'),
		name: t('testimonials.testimonial3.name')
	}
])
</script>
