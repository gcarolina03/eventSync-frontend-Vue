<template>
  <footer class="bg-white mt-10 md:absolute inset-x-0 bottom-0">
    <div class="px-1 sm:px-4 py-6 w-full bg-[#E9EFFF] flex flex-col sm:flex-row text-center items-center sm:justify-between">
      <p class="text-sm text-text sm:text-center">© 2025 <a href="#">EventSync</a></p>
      <div class="flex gap-4">
        <a class="font-semibold text-sm opacity-75 text-text" href="#">{{ $t("termsAndConditions") }}</a>
        <span class="font-semibold text-sm opacity-75 text-text">•</span>
        <a class="font-semibold text-sm opacity-75 text-text" href="#">{{ $t("privacyPolicy") }}</a>
        <span class="font-semibold text-sm opacity-75 text-text">•</span>
        <a class="font-semibold text-sm opacity-75 text-text" href="#">{{ $t("support") }}</a>
      </div>
      <div class="flex mt-1 space-x-5 sm:justify-center md:mt-0">
        <a href="https://github.com/gcarolina03" class="opacity-75 text-text hover:text-primary hover:opacity-100">
          <Icon icon="git" className="w-5 h-5" />
          <span class="sr-only">{{ $t("github") }}</span>
        </a>
        <a href="https://www.linkedin.com/in/gcarolina03" class="opacity-75 text-text hover:text-primary hover:opacity-100">
          <Icon icon="linkedin" className="w-5 h-5" />
          <span class="sr-only">{{ $t("linkedin") }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Icon from '@/components/common/Icon.vue'
</script>
