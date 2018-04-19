<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="decrease" v-show="food.count > 0" @click="decreaseCart">
				<i class="i icon-remove_circle_outline"></i>
			</div>	
		</transition>
		
		<div class="count" v-show="food.count > 0">{{food.count}}</div>
		<div class="add" @click="addCart">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			food: {
				type: Object,
				default() {
					return {
					}
				}
			}
		},
		methods:{
			addCart(event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
//					this.food.count = 1;
					this.$set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				console.log(this.food.count)
			},
			decreaseCart(event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	}
</script>

<style lang="scss">
.cartcontrol {
	font-size: 0;
	.decrease,.count,.add {
		display: inline-block;
	}
	.add, .decrease {
		padding: 6px;
		color: rgb(0,160,220);
		line-height: 24px;
		font-size: 24px;
		i {
			
			transition: all 0.4s linear;
			display: inline-block;
		}
	}
	.count {
		font-size: 14px;
		vertical-align: top;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.decrease {
		font-size: 24px;
		transition: all 0.4s linear;
		
	}
	.move-enter-active, .move-leave-active {
		opacity: 1;
		transform: translate3D(0,0,0);
		i {
			transform: rotate(0);
		}
	}
	.move-enter, .move-leave-to {
		opacity: 0;
		transform: translate3D(24px, 0, 0);
		i {
			transform: rotate(180deg);
		}
	}
}
</style>