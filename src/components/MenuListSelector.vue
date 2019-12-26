<template>
    <ul class="menu-list">
        <li v-for="item in items" :key="item.id">
            <a>
                <label><input type="radio" name="favId" @click="selectFavItem(item.id)"><span v-text="item.name"></span></label>
            </a>
            <menu-list-selector :items="item.items" v-if="item.items.length > 0"></menu-list-selector>
        </li>
    </ul>
</template>

<script>
export default {
    name: "MenuListSelector",
    props: {
        editable: {
            type: Boolean
        },
        items: {
            type: Array
        },
        selected: {
            type: Number,
            default: 0
        }
    },
    methods: {
        selectFavItem: function (id) {
            this.$store.commit("selectFavItem", id);
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
    color: #333;
}
a {
    color: #333;
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
