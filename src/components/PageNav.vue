<template>
    <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click="goPage('prev')" :disabled="page == 1">上一页</a>
        <a class="pagination-next" @click="goPage('next')" :disabled="page == max">下一页</a>
        <ul class="pagination-list">
            <li>
                <a class="pagination-link" :class="{'is-current': page == 1}" @click="goPage(1)">1</a>
            </li>
            <li v-show="pageNavs.hasLeftElps">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-for="(n, idx) in pageNavs.navs" :key="idx">
                <a
                    class="pagination-link"
                    :class="{'is-current': page == n}"
                    @click="goPage(n)"
                    v-text="n"
                >1</a>
            </li>
            <li v-show="pageNavs.hasRightElps">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-show="max > 1">
                <a
                    class="pagination-link"
                    :class="{'is-current': page == max}"
                    @click="goPage(max)"
                    v-text="max"
                >1</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "PageNav",
    props: {
        size: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 1
        }
    },
    methods: {
        goPage: function(n) {
            if (n == "prev") {
                if (this.page == 1) return;
                this.$emit("update:page", this.page - 1);
            } else if (n == "next") {
                if (this.page == this.max) return;
                this.$emit("update:page", this.page + 1);
            } else {
                if (this.page == n) return;
                this.$emit("update:page", n);
            }
        }
    },
    computed: {
        max: function() {
            return Math.ceil(this.total / this.size) || 1;
        },
        pageNavs: function() {
            let navs = [],
                p = this.page, max = this.max,
                start = p, end = p;
            while (navs.length < 3 && (start > 1 || end < max)) {
                if (navs.indexOf(start) < 0 && start > 1 && start < max) navs.unshift(start);
                if (navs.indexOf(end) < 0 && end > 1 && end < max) navs.push(end);
                start--;
                end++;
            }
            return {
                hasLeftElps: navs.length > 2 && navs[0] > 2,
                hasRightElps:
                    navs.length > 2 && navs[navs.length - 1] < this.max - 1,
                navs: navs
            };
        }
    }
};
</script>