<template>
	<div class="food">
		<div class="head-img">
			<div class="content">22</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			food: {
				type: Object
			},
			showFlag: {
				type: Boolean
			}
		}
	}
</script>

<style lang="scss">
	@import '~common/scss/mixin';
.food {
	width: 100%;
	position: fixed;
	background-color: #fff;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	/*transition: all 0.5s;*/ 
	.head-img {
		@include fixed-ratio;
	}
}
</style>