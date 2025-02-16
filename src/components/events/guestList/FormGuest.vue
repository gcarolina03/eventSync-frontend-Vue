<template>
	<Form :validation-schema="schema" v-slot="{ handleSubmit, resetForm }" class="flex gap-4">
		<InputComp name="name" type="text" :placeholder="t('guestList.guestName')" />
		<InputComp name="phone" type="text" :placeholder="t('guestList.guestPhone')" />
		<InputComp name="number" type="number" min="1" :placeholder="t('guestList.guestNumber')" />

		<ButtonComp buttonStyle="purple" type="submit" additionalClass="text-sm lg:text-base"
			@click.prevent="handleSubmit(submit)">
			{{ t('guestList.addGuest') }}
		</ButtonComp>

	</Form>
</template>

<script setup>
import { defineProps } from 'vue'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'
/* COMPONENTS */
import InputComp from '@/components/forms/Input.vue'
import ButtonComp from '@/components/common/Button.vue'


const props = defineProps({
	eventId: {
		type: String,
		required: true
	},
})

const { t } = useI18n()
const store = useStore()
const emit = defineEmits(['reload'])

const submit = async (values, { resetForm }) => {
	try{
		const res = await store.addGuest(props.eventId, values.name, values.phone, values.number)
		if (res.success) {
			resetForm() 
			emit('reload')
		}
	} catch (error) {
		console.error(error)
	}
}

</script>
