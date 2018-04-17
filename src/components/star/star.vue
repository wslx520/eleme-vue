<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass, index) in itemClasses " class="star-item" :class="itemClass" :key="index" track-by="$index"></span>
    </div>
</template>
<script>
    const LENGTH = 5;
    const CLASS_ON = 'on';
    const CLASS_HALF = 'half';
    const CLASS_OFF = 'off';
    export default {
        props: ['size', 'score'],
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            itemClasses() {
                const result = [];
                const score = Math.floor(this.score * 2) / 2;
                const hasDecimal = score % 1 !== 0;
                const integer = Math.floor(score);
                for (var i = 0; i < integer; i++) {
                    result.push(CLASS_ON);
                }
                if (hasDecimal) {
                    result.push(CLASS_HALF)
                }
                while (result.length < LENGTH) {
                    result.push(CLASS_OFF)
                }
                return result;
            }
        }
    }
</script>

<style lang="scss">
    @import '~common/scss/mixin';
    .star {
        font-size: 0;
        .star-item {
            display: inline-block;
            background-repeat: no-repeat;
            &:last-child {
                margin-right: 0;
            }
        }
        &.star-48 {
            .star-item {
                width: 20px;
                height: 20px;
                margin-right: 22px;
                background-size: 20px 20px;
                &.on {
                    @include bg-image('star48_on');
                }
                &.half {
                    @include bg-image('star48_half');
                }
                &.off {
                    @include bg-image('star48_off');
                }
            }
        }
        &.star-36 {
            .star-item {
                width: 15px;
                height: 15px;
                margin-right: 6px;
                background-size: 15px 15px;
                &.on {
                    @include bg-image('star36_on');
                }
                &.half {
                    @include bg-image('star36_half');
                }
                &.off {
                    @include bg-image('star36_off');
                }
            }
        }
        &.star-24 {
            .star-item {
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 10px 10px;
                &.on {
                    @include bg-image('star24_on');
                }
                &.half {
                    @include bg-image('star24_half');
                }
                &.off {
                    @include bg-image('star24_off');
                }
            }
        }
    }
</style>