<template>
    <div id="menu" class="menu">
        <p class="menu-label">常规分类</p>
        <ul class="menu-list">
            <li>
                <a :class="{'is-active': $store.state.activeFavId == 0}">人才库</a>
            </li>
        </ul>
        <p class="menu-label">
            我的收藏
            <i class="fa fa-cog" @click="toggleFavEditable"></i>
            <i class="fa fa-plus margin-left-5 has-text-success" v-show="fav_editable" @click="addTopFav"></i>
        </p>
        <menu-list :editable="fav_editable" :items="storeMenus"></menu-list>
    </div>
</template>

<script>
export default {
    name: "FavList",
    data: function() {
        return {
            fav_editable: false
        };
    },
    methods: {
        goPage: function(item) {
            this.$store.commit("activeMenu", item);
        },
        toggleFavEditable: function() {
            this.fav_editable = !this.fav_editable;
        },
        addTopFav: function() {
            this.$store.state.menus.push({
                parentId: 0,
                name:
                    "新建收藏-" +
                    Math.random()
                        .toString()
                        .substr(-3),
                items: [],
                depth: 1,
                path: "0-",
                count: 0,
                editable: true
            });
        }
    },
    computed: {
        storeMenus: function() {
            return this.$store.state.menus;
        },
        actived: function() {
            return this.$store.state.activeMenuId;
        }
    },
    mounted: function() {
        var self = this;
        self.$http.get("/api/user/json-favorite-list").then(res => {
            var fav = [], items = {'0': []};
            res.results.sort((a, b) => {
                return b.depth - a.depth;
            });
            res.results.forEach(v => {
                if (!items[v.parentId]) items[v.parentId] = [];
                v.items = items[v.id] || [];
                items[v.parentId].push(v);
            });
            self.$store.commit("loadMenu", items['0']);
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu {
    padding: 10px 0 50px 0;
}
#menu .menu-label {
    color: #ddd;
}
.menu {
    font-size: 0.8rem;
}
a {
    color: #fff;
}
i {
    cursor: pointer;
}
.fav-item {
    width: 100%;
    margin: 0;
}
</style>
