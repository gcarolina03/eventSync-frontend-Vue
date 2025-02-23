<template>
  <div class="flex flex-col text-center items-center h-full justify-center text-xl w-full gap-2">
    <p class="font-bold">{{ $t("requestsForm.noEventsTitle") }}</p>
    <p>{{ $t("requestsForm.noEventsSubtitle") }}</p>
    <ButtonComp buttonStyle="darkPurple" type="button" additionalClass="text-sm md:text-base !w-auto px-3 py-2 gap-2" :to="{ name: 'events' }">
      {{ $t("requestsForm.noEventsButton") }}
      <Icon icon="arrow-right" />
    </ButtonComp>
  </div>
</template>

<script setup>
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue';
import ButtonComp from '@/components/common/Button.vue'

</script>
