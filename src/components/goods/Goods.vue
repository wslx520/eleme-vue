<template>
    <div id="goods" class="goods">
        <div class="menu-wrapper">
        	<ul>
        		<li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{active: currentIndex === index}">
        			<a class="text" :href="'#big-li' + index" @click="scrollTo($event, this)" :index="index">
        				<span class="icon" v-show="item.type > 0" :class="iconMap[item.type]"></span>{{item.name}}
        			</a>
        		</li>
        	</ul>
        </div>
        <div class="foods-wrapper" ref="main">
        	<ul>
        		<li v-for="(item, index) in goods" class="food-list" :key="index" :id="'big-li' + index">
        			<h1 class="title">{{item.name}}</h1>
        			<ul>
        				<li v-for="(food, f) in item.foods" class="food-item" :key="f">
        					<div class="icon" @click="showFood(food, $event)"><img :src="food.icon" alt="" /></div>
        					<div class="content">
        						<h2 class="name">{{food.name}}</h2>
        						<p class="desc">{{food.description}}</p>
        						<div class="extra">
        							<span class="extra">月售{{food.sellCount}}份</span>
        							<span>好评率{{food.rating}}%</span>
        						</div>
        						<div class="price">
        							<span class="now">￥{{food.price}}</span>
        							<del class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</del>
        						</div>
        						<div class="control">
        							<cart-control :food="food"></cart-control>
        						</div>
        					</div>
        				</li>
        			</ul>
        		</li>
        	</ul>
        </div>
        
        <food :showFlag="foodShown" :food="chosenFood" :startPoint="foodBox"></food>
        
        <cart :selectedFoods="selectedFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></cart>
    </div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Cart from '../cart/cart';
	import CartControl from '../cartcontrol/cartcontrol';
	import Food from '../food/food';
	const CODE_OK = 0;
    const iconMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    // 获取 currentIndex 的纯函数, 也可选择将 currentIndex 写为计算属性,
	function getCurrentIndex(scrollY, listHeight) {
		let h1, h2;
//		console.log(listHeight)
		for (let i = 0; i < listHeight.length; i++) {
			h1 = listHeight[i];
			h2 = listHeight[i + 1];
			if (!h2 || (scrollY >= h1 && scrollY < h2 +1)) {
				console.log(i, h1, h2, scrollY)
				return i;
			}
		}
		return 0;
	}
    export default {
        props: {
        	seller: Object
        },
        components:{
        	cart: Cart,
        	'cart-control': CartControl,
        	food: Food
        },
        data() {
        	return {
        		goods:[],
        		iconMap,
        		currentIndex: 0,
        		listHeight: [],
        		foodBox: {},
        		foodShown: false,
        		chosenFood: {}
        	}
        },
        computed: {
        	selectedFoods() {
        		let foods = [];
        		this.goods.forEach( good => {
        			good.foods.forEach( food => {
        				if (food.count) {
        					foods.push(food);
        				}
        			} )
        		});
        		return foods;
        	}
        },
        created() {
        	this.$http.get('/api/goods')
        		.then((res) => {
        			let data = res.data;
        			if (data.errno === CODE_OK) {
        				this.goods = data.data;
        				console.log(this, this.goods)
        				this.$nextTick(() => {
        					this._initScroller();
        					this._calculateHeight();
        				})
        			}
        		})
        },
        methods:{
        	scrollTo(e, t) {
        		if (!e._constructed) {
        			return;
        		}
        		console.log(e, t, this);
        		e.preventDefault();
        		this.currentIndex = e.target.getAttribute('index') - 0;
        		this.navByClick = true;
        		const el = document.getElementById(e.target.getAttribute('href').substr(1));
        		console.log(el);
        		this.mainScroller.scrollToElement(el, 300);
        	},
        	_initScroller() {
//      		console.log(this.$refs.main);
        		let scrollY;
        		this.mainScroller = new BScroll(this.$refs.main, {
        			probeType: 3,
        			click: true
        		});
        		function toGetIndex() {
//      			console.log(this.scrollY)
        			this.currentIndex = getCurrentIndex(scrollY, this.listHeight);
        		}
        		this.mainScroller.on('scroll', pos => {
        			scrollY = Math.abs(Math.floor(pos.y));
//      			console.log('scrollY', scrollY);
        			this.$nextTick(toGetIndex);
//					this.currentIndex = getCurrentIndex(scrollY, this.listHeight);
        		})
        	},
        	_calculateHeight() {
        		const foodList = this.$refs.main.getElementsByClassName('food-list');
        		let height = 0;
        		this.listHeight.push(height);
        		let i = 0, item;
        		for (; i < foodList.length; i++) {
        			item = foodList[i];
        			height += item.clientHeight;
        			this.listHeight.push(height);
        		}
        	},
        	showFood(food, e) {
        		console.log(food, e);
        		if (!e._constructed) {
        			return;
        		}
        		this.chosenFood = food;
        		const el = e.target;
        		const box = el.getBoundingClientRect();
//      		this.foodBox = box;
				for (let b in box) {
//					if (box.hasOwnProperty(b)) {
//						console.log(b, box[b]);
//					}
				}
//				this.foodBox = Object.assign({}, box);
				this.foodBox = box.toJSON();
				console.log(this.foodBox, box, Object.assign({}, box));
        		this.foodShown = true;
        		console.log(food, e);
        	}
        }
    }
</script>

<style lang="scss">
    @import '~common/scss/mixin';
.goods {
	position: absolute;
	top: 174px;
	width: 100%;
	bottom: 46px;
	left: 0;
	display: flex;
	overflow: hidden;
	.menu-wrapper {
		flex-basis: 80px;
		flex-shrink: 0;
		/*flex: 0 0 80px;*/
		width: 80px;
		background-color: #f3f5f7;
		overflow: auto;
		.menu-item {
			display: table;
			height: 54px;
			width: 56px;
			padding: 0 12px;
			line-height: 14px;
			text-align: center;
			&.active {
				background-color: #fff;
				font-weight: 700;
				border: none;
				margin-top: -1px;
				.text {
					font-weight: 700;
				}
			}
			.icon {
				display: inline-block;
	            vertical-align: top;
	            width: 12px;
	            height: 12px;
	            margin-right: 2px;
	            background-size: 12px 12px;
	            background-repeat: no-repeat;
	            &.decrease{
	                @include bg-image('decrease_3')}
	            &.discount{
	                @include bg-image('discount_3')}
	            &.guarantee{
	                @include bg-image('guarantee_3')}
	            &.invoice{
	                @include bg-image('invoice_3')}
	            &.special{
	                @include bg-image('special_3')}
			}
			.text {
				font-size: 12px;
				display: table-cell;
				width: 56px;
				vertical-align: middle;
				text-align: left;
				margin: auto;
			}
		}
	}
	.foods-wrapper {
		flex-grow: 1;
		/*overflow: auto;*/
		.title {
			padding-left: 14px;
			background-color: #f3f5f7;
			height: 26px;
			line-height: 26px;
			border-left: 2px solid #d9dde1;
			font-size: 12px;
			color: rgb(147,153,159);
		}
		.food-item {
			display: flex;
			margin: 18px;
			border-bottom:1px solid  rgba(7,17,27,0.1);
			padding-bottom: 18px;
			/*固定一个高度, 否则在图片为加载完成时, calculateHeight 计算出来的高度不对*/
			min-height: 130px;
			box-sizing: border-box;
			&:last-child {
				border-bottom: none;
				margin-bottom: 0;
			}
			.icon {
				flex-basis: 57px;
				flex-shrink: 0;
				margin-right: 10px;
			}
			.content {
				flex-grow: 1;
				.name {
					margin: 2px 0 8px 0;
					/*height: 14px;*/
					line-height: 14px;
					font-size: 14px;
					color: $fontColor;
				}
				.desc,.extra {
					line-height: 10px;
					font-size: 10px;
					color: rgb(147,153,159);
				}
				.desc {
					margin-bottom: 8px;
					line-height: 12px;
				}
				.extra {
					.count {
						margin-right: 12px;
					}
				}
				.control {
					float: right;
				}
			}
		}
	}
}
/*公用的*/
.price {
	font-weight: 700;
	line-height: 24px;
	.now {
		color: rgb(240,20,20);
	}
	.old {
		font-size: 10px;
		color: rgb(147,153,159);
	}
}
</style>