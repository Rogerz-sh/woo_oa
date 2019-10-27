<template>
    <div id="menu" class="menu">
        <div v-for="(menu, index) in storeMenus" :key="index">
            <p class="menu-label" v-text="menu.name">常规分类</p>
            <ul class="menu-list">
                <li v-for="item in menu.items" :key="item.id">
                    <a :class="{'is-active': $store.state.activeMenuId == item.id}" v-text="item.text" @click="goPage(item)"></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "MenuList",
    methods: {
        goPage: function (item) {
            this.$store.commit('activeMenu', item)
        }
    },
    computed: {
        storeMenus: function() {
            return this.$store.state.menus;
        },
        actived: function() {
            return this.$store.state.activeMenuId;
        }
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
a {
    color: #fff;
}
</style>
