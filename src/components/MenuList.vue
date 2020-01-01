<template>
    <ul class="menu-list">
        <li v-for="(item, idx) in items" :key="item.id">
            <a v-show="!item.editable" :class="{'is-active': $store.state.activeFavId == item.id}">
                <router-link :to="'/resume-favorites/'+item.id"><span v-text="item.name" @click="selFavItem(item)"></span></router-link>
                <span class="is-pulled-right" v-show="editable">
                    <i class="fa fa-minus has-text-danger margin-left-5" @click="delFavItem(idx, item)" v-if="item.items.length == 0"></i>
                    <i class="fa fa-plus has-text-success margin-left-5" @click="addFavItem(item)" v-if="item.depth < 3"></i>
                </span>
            </a>
            <a v-show="item.editable" class="columns is-vcentered fav-item">
                <input class="input is-small" v-model="item.name" />
                <i class="fa fa-check has-text-success margin-left-5" @click="saveFavItem(item)"></i>
                <i class="fa fa-times has-text-danger margin-left-5" @click="delFavItem(idx, item)"></i>
            </a>
            <menu-list :editable="editable" :items="item.items" v-if="item.items.length > 0"></menu-list>
        </li>
    </ul>
</template>

<script>
export default {
    name: "MenuList",
    props: {
        editable: {
            type: Boolean
        },
        items: {
            type: Array
        }
    },
    methods: {
        selFavItem: function(item) {
            this.$store.commit('activeFav', item.id)
        },
        addFavItem: function(item) {
            item.items.push({
                parentId: item.id,
                name:
                    "新建收藏-" +
                    Math.random()
                        .toString()
                        .substr(-3),
                items: [],
                depth: item.depth + 1,
                path: item.path + item.id + "-",
                count: 0,
                editable: true
            });
        },
        delFavItem: function(idx, item) {
            var self = this;
            if (item.id) {
                if (!window.confirm("确定要删除吗？")) return;
                this.$http
                    .post("/api/user/remove-favorite-item", {
                        id: item.id
                    })
                    .then(res => {
                        if (res.code == 200) {
                            self.items.splice(idx, 1);
                        }
                    });
            } else {
                self.items.splice(idx, 1);
            }
        },
        saveFavItem: function(item) {
            this.$http
                .post("/api/user/save-favorite-item", {
                    fav: item
                })
                .then(res => {
                    if (!item.id) item.id = res.results;
                    item.editable = false;
                });
        }
    },
    computed: {}
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
.menu-list li ul {
    margin-right: 0;
}
</style>
