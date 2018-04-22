<template>
<transition name="expand" 
        	@before-enter="expandBefore"
        	@enter="expandEnter"
        	@after-enter="expandAfter"
        	@leave="expandLeave">
	<div class="food" v-show="show">
		<div class="food-content">
			<!--<div class="head-img">
				<div class="content">
					<img :src="food.image" alt="" />
				</div>
			</div>-->
			<div class="image-header">
				<img :src="food.image" alt="" />
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
			</div>
			<div class="back" @click="hide">
				<i class="icon icon-arrow_lift"></i>
			</div>
		</div>
		
	</div>

</transition>
</template>

<script>
	import Velocity from 'velocity-animate'
	export default {
		props: {
			food: {
				type: Object
			},
			showFlag: {
				type: Boolean
			},
			startPoint: {
				type: Object
			}
		},
//		data() {
//			console.log(this.showFlag)
//			return {
//				show: this.showFlag
//			}
//		},
		computed: {
			show() {
				return !!this.showFlag;
			}
		},
		methods:{
			hide() {
				this.showFlag = false;
			},
        	expandBefore(el) {
        		el.style.opacity = 0;
        		el.style.width = this.startPoint.width + 'px';
        		el.style.height = this.startPoint.height + 'px';
        		el.style.left = this.startPoint.left + 'px';
        		el.style.top = this.startPoint.top + 'px';
        		console.log(this.startPoint)
        	},
        	expandEnter(el, done) {
        		Velocity.animate(el, {
        			width: '100%',
        			height: '100%',
        			left: 0, top: 0,
        			opacity: 1
        		}, {
        			complete: done,
        			duration: 500
        		})
        	},
        	expandAfter(el) {
        		el.style.opacity = 1;
        		console.log(this.startPoint);
//      		el.style.width = this.startPoint.width + 'px';
//      		el.style.height = this.startPoint.width + 'px';
//      		el.style.left = this.startPoint.left + 'px';
//      		el.style.top = this.startPoint.top + 'px';
//      		console.log(el);
        	},
        	expandLeave(el, done) {
        		const point = this.startPoint;
        		Velocity.animate(el, {
        			width: point.width + 'px',
        			height: point.height + 'px',
        			left: point.left + 'px', 
        			top: point.top + 'px',
        			opacity: 0
        		}, {
        			complete: done,
        			duration: 500
        		})
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
		img {
			max-width: 100%;
			height: 100%;
		}
	}
	/* 视频里的布局方式 */
	.image-header {
		width: 100%;
		height: 0;
		padding-top: 100%;
		position: relative;
		img {
			position: absolute;
			left: 0;
			bottom: 0;
			max-width: 100%;
			height: 100%;
		}
	}
	.back {
		position: absolute;
		top: 10px;
		left: 0;
		.icon {
			display: block;
			padding: 10px;
			font-size: 20px;
			color: #fff;
		}
	}
	.content {
		padding: 18px;
		.title {
			line-height: 14px;
			margin-bottom: 8px;
			font-size: 14px;
			font-weight: 700;
			color: $fontColor;
		}
		.detail {
			margin-bottom: 18px;	
			line-height: 10px;
			height: 10px;
			font-size: 0;
			.sell-count,.rating {
				font-size: 10px;
				color: rgb(147,153,159);
			}
			.sell-count {
				margin-right: 12px;
			}
		}
	}
}
.expand-enter-active, .expand-leave-active {
	opacity: 1;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
}
/*.expand-leave {
	transform: translateX(0);
}
.expand-enter, .expand-leave-to {
	transform: translateX(-100%);
}*/
</style>