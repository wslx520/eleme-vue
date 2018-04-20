<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{highlight: totalCount > 0}">
						<i class="icon icon-shopping_cart"></i>
					</div>
					<span class="number" v-show="totalCount > 0">{{totalCount}}</span>
				</div>
				<div class="price" :class="{highlight: totalPrice > 0}">{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="paidClass">
					{{paidDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<transition-group
				@before-enter="beforeEnter"
				@enter="enter"
				@after-enter="afterEnter">
				<div class="ball" v-for="(ball, index) in balls" v-show="ball.show" :key="index">
					<div class="inner"></div>
				</div>
			</transition-group>
		</div>
	</div>
</template>

<script>
	import Bus from '@/EventBus';
	export default {
		data() {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropedBalls: []
			}
		},
		props: {
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			selectedFoods: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectedFoods.forEach((food) => {
					total += food.price * food.count
				});
				return total;
			},
			totalCount() {
				let total = 0;
				this.selectedFoods.forEach((food) => {
					total += food.count
				});
				return total;
			},
			paidDesc() {
				if (this.totalPrice == 0) {
					return `${this.minPrice}元起送`
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice -  this.totalPrice;
					return `还差${diff}起送`;
				} else {
					return '去结算'
				}
			},
			paidClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough'
				} else {
					return 'enough'
				}
			},
		},
		methods:{
			drop(el) {
				let balls = this.balls;
				let ball = balls.find( b => b.show === false);
				if (ball) {
					ball.show = true;
					ball.el = el;
					this.dropedBalls.push(ball);
				}
			},
			beforeEnter(el) {
				let count = this.balls.length;
				while(count--) {
					let ball = this.balls[count];
					if (ball.show) {
						const bound = ball.el.getBoundingClientRect();
						let x = bound.left - 32;
						console.log(x);
						console.log(window.innerHeight, bound.top, -(window.innerHeight - bound.top - 22))
						let y = -(window.innerHeight - bound.top - 22);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
						
					}
				}
			},
			enter(el, done) {
				let off = el.offsetHeight;
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					done();
				})
			},
			afterEnter(el) {
				let ball = this.dropedBalls.shift();
				if (ball) {
					ball.show = false;
					el.display = 'none';
				}
			}
		},
		created () {
			let self = this;
			Bus.$on('ball-drop', function (el) {
				console.log(el);
				self.drop(el);
			})
		}
	}
</script>

<style lang="scss">
	$fcolor: rgba(255,255,255,0.4);
.shopcart {
	height: 48px;
	position: fixed;
	width: 100%;
	left: 0;
	bottom: 0;
	z-index: 9999;
	.content {
		display: flex;
		background-color: #141d27;
	}
	.content-left {
		flex-grow: 1;
		.logo-wrapper {
			display: inline-block;
			position: relative;
			top: -10px;
			padding: 6px;
			margin: 0 12px;
			width: 56px;
			height: 56px;
			box-sizing: border-box;
			vertical-align: top;
			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;
			background-color: #141d27;
			.logo {
				background-color: #2b343c;
				width: 100%;
				height: 100%;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				text-align: center;
				&.highlight {
					background-color: rgb(0,160,220);
					.icon {
						color: #fff;
					}
				}
				.icon {
					font-size: 24px;
					color: #80858a;
					line-height: 44px;
				}
			}
			.number {
				position: absolute;
				top: 0;
				right: 0;
				width: 24px;
				height: 16px;
				line-height: 16px;
				text-align: center;
				color: #fff;
				font-size: 9px;
				font-weight: 700;
				-webkit-border-radius: 16px;
				-moz-border-radius: 16px;
				border-radius: 16px;
				box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
				background-color: rgb(240,20,20);
			}
		}
		.price {
			display: inline-block;
			vertical-align: top;
			box-sizing: border-box;
			line-height: 24px;
			margin-top: 12px;
			padding-right: 12px;
			border-right: 1px solid rgba(255,255,255,0.1);
			font-size: 16px;
			font-weight: 700;
			color: $fcolor;
			&.highlight {
				color: #fff;
			}
		}
		.desc {
			display: inline-block;
			vertical-align: top;
			line-height: 24px;
			margin: 12px 0 0 12px;
			color: $fcolor;
			font-size: 10px;
		}
	}
	.content-right {
		flex-basis: 105px;
		flex-shrink: 0;
		.pay {
			height: 48px;
			line-height: 48px;
			text-align: center;
			font-size: 12px;
			font-weight: 700;
			color: $fcolor;
			&.not-enough {
				background-color: #2b333b;
			}
			&.enough {
				background-color: #00b43c;
				color: #fff;
			}
		}
	}
	
	.ball-container {
		.ball {
			position: fixed;
			left: 32px;
			bottom: 22px;
			z-index: 1000;
			transition: all 0.4s cubic-bezier(.29,-0.46,.83,.67);
			.inner {
				width: 16px;
				height: 16px;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				background-color: rgb(0,160,220);
				transition: all 0.4s linear;
			}
			&.drop-enter-active, &.drop-leave-active {
				
			}
		}
	}
}
</style>