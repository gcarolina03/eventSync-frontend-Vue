<template>
	<span v-if="type == 'button'" :class="['cursor-pointer', classButton, 'rounded-xl flex items-center justify-center']" @click="handleClick" >
		<div :class="props.className" v-html="iconComponent"></div>
	</span>

	<div v-else :class="props.className" v-html="iconComponent"></div>
</template>

<script setup>
import { computed } from 'vue'
import ArrowDownSvg from '@/assets/icons/arrow-down.svg?raw'
import ArrowLeftSvg from '@/assets/icons/arrow-left.svg?raw'
import ArrowRightFromBracketSvg from '@/assets/icons/arrow-right-from-bracket.svg?raw'
import ArrowRightSvg from '@/assets/icons/arrow-right.svg?raw'
import ArrowUpAndDownSvg from '@/assets/icons/arrow-up-and-down.svg?raw'
import BarsSvg from '@/assets/icons/bars.svg?raw'
import CalendarPlusSvg from '@/assets/icons/calendar-plus.svg?raw'
import CalendarDaysSvg from '@/assets/icons/calendar-days.svg?raw'
import CameraSvg from '@/assets/icons/camera.svg?raw'
import CardSvg from '@/assets/icons/card.svg?raw'
import CheckSvg from '@/assets/icons/check.svg?raw'
import CirclePlusSvg from '@/assets/icons/circle-plus.svg?raw'
import CircleUserSvg from '@/assets/icons/circle-user.svg?raw'
import ClockSvg from '@/assets/icons/clock.svg?raw'
import CouchSvg from '@/assets/icons/couch.svg?raw'
import ExclamationRoundSvg from '@/assets/icons/exclamation-round.svg?raw'
import EyeSlashSvg from '@/assets/icons/eye-slash.svg?raw'
import EyeSvg from '@/assets/icons/eye.svg?raw'
import FaceSmileSvg from '@/assets/icons/face-smile.svg?raw'
import FoodSvg from '@/assets/icons/food.svg?raw'
import GitSvg from '@/assets/icons/git.svg?raw'
import GroupPeopleSvg from '@/assets/icons/group-people.svg?raw'
import LinkedinSvg from '@/assets/icons/linkedin.svg?raw'
import MapSvg from '@/assets/icons/map.svg?raw'
import NoFilterSvg from '@/assets/icons/no-filter.svg?raw'
import PencilSvg from '@/assets/icons/pencil.svg?raw'
import ProductionSvg from '@/assets/icons/production.svg?raw'
import QuoteSvg from '@/assets/icons/quote.svg?raw'
import SearchSvg from '@/assets/icons/search.svg?raw'
import ThumbsDownFillSvg from '@/assets/icons/thumbs-down-fill.svg?raw'
import ThumbsDownSvg from '@/assets/icons/thumbs-down.svg?raw'
import ThumbsUpFillSvg from '@/assets/icons/thumbs-up-fill.svg?raw'
import ThumbsUpSvg from '@/assets/icons/thumbs-up.svg?raw'
import UserSvg from '@/assets/icons/user.svg?raw'
import TrashCanSvg from '@/assets/icons/trash-can.svg?raw'
import XMarkSvg from '@/assets/icons/x-mark.svg?raw'


const props = defineProps({
	className: String,
	icon: String,
	type: {
		type: String,
		default: 'icon'
	},
	classButton: String
})

const allowedIcons = {
	"arrow-down": ArrowDownSvg,
	"arrow-left": ArrowLeftSvg,
	"arrow-right-from-bracket": ArrowRightFromBracketSvg,
	"arrow-right": ArrowRightSvg,
	"arrow-up-and-down": ArrowUpAndDownSvg,
	"bars": BarsSvg,
	"calendar-plus": CalendarPlusSvg,
	"calendar-days": CalendarDaysSvg,
	"camera": CameraSvg,
	"card": CardSvg,
	"check": CheckSvg,
	"circle-plus": CirclePlusSvg,
	"circle-user": CircleUserSvg,
	"clock": ClockSvg,
	"couch": CouchSvg,
	"exclamation-round": ExclamationRoundSvg,
	"eye-slash": EyeSlashSvg,
	"eye": EyeSvg,
	"face-smile": FaceSmileSvg,
	"food": FoodSvg,
	"git": GitSvg,
	"group-people": GroupPeopleSvg,
	"linkedin": LinkedinSvg,
	"map": MapSvg,
	"no-filter": NoFilterSvg,
	"pencil": PencilSvg,
	"production": ProductionSvg,
	"quote": QuoteSvg,
	"search": SearchSvg,
	"thumbs-down-fill": ThumbsDownFillSvg,
	"thumbs-down": ThumbsDownSvg,
	"thumbs-up-fill": ThumbsUpFillSvg,
	"thumbs-up": ThumbsUpSvg,
	"user": UserSvg,
	"trash-can": TrashCanSvg,
	"x-mark": XMarkSvg,
}

const iconComponent = computed(() => {
	return allowedIcons[props.icon] || null
})

const emit = defineEmits(['handleClick'])
const handleClick = () => {
	emit('handleClick')
}

</script>