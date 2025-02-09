<template>
	<footer
		class="mt-10 py-4 px-1 sm:px-4 w-full bg-[#E9EFFF] text-sm flex flex-col gap-2 sm:flex-row text-center items-center sm:justify-between">
		<div class="flex gap-4">
			<p class=" text-text sm:text-center">© 2025 <a href="#">EventSync</a></p>
			<div class="flex flex-row gap-2 items-center">
				<a href="#" class="cursor-pointer" :class="{ 'font-bold': store.language == 'es' }" @click.prevent="changeLanguage('es')">ES</a>
				<div class="h-[10px] w-[0.25px] bg-black opacity-50"></div> <!-- separador -->
				<a href="#" class="cursor-pointer" :class="{ 'font-bold': store.language == 'en' }"
					@click.prevent="changeLanguage('en')">EN</a>
			</div>
		</div>
		<div class="flex gap-4 sm:ml-[-95px]">
			<a class="font-semibold opacity-75 text-text" href="#">{{ $t("termsAndConditions") }}</a>
			<span class="font-semibold opacity-75 text-text">•</span>
			<a class="font-semibold opacity-75 text-text" href="#">{{ $t("privacyPolicy") }}</a>
			<span class="font-semibold opacity-75 text-text">•</span>
			<a class="font-semibold opacity-75 text-text" href="#">{{ $t("support") }}</a>
		</div>
		<div class="flex space-x-5 sm:justify-center md:mt-0">
			<a href="https://github.com/gcarolina03" class="opacity-75 text-text hover:text-primary hover:opacity-100">
				<Icon icon="git" className="w-5 h-5" />
				<span class="sr-only">{{ $t("github") }}</span>
			</a>
			<a href="https://www.linkedin.com/in/gcarolina03"
				class="opacity-75 text-text hover:text-primary hover:opacity-100">
				<Icon icon="linkedin" className="w-5 h-5" />
				<span class="sr-only">{{ $t("linkedin") }}</span>
			</a>
		</div>
	</footer>
</template>

<script setup>
import { useStore } from '@/store'
/* COMPONENTS	*/
import Icon from '@/components/common/Icon.vue'

const store = useStore()

const changeLanguage = (lang) => {
	store.updateLanguage(lang)
}
</script>
