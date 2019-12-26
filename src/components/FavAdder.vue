<template>
    <div id="favAdderCtn" v-show="!isHidden">
        <div id="favAdderSelector">
            <div id="menu" class="menu">
                <ul class="menu-list">
                    <li>
                        <label>
                            <input type="radio" name="favId" @click="selectFavItem(0)" />
                            <span>我的收藏</span>
                        </label>
                        <menu-list-selector :items="menus"></menu-list-selector>
                    </li>
                </ul>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="button is-success">确定</div>
                    <div class="button is-default margin-left-10" @click="$store.commit('toggleFavAdder', false)">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FavAdder",
    data: function() {
        return {};
    },
    props: {
        ids: {
            type: Array
        },
        isHidden: {
            type: Boolean
        }
    },
    computed: {
        menus: function() {
            return this.$store.state.menus;
        },
        selectedId: function() {
            return this.$store.state.selectedFavId;
        }
    },
    methods: {
        selectFavItem: function(id) {
            this.$store.commit("selectFavItem", id);
        }
    }
};
</script>

<style scoped>
#favAdderCtn {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
}
#favAdderSelector {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
}
</style>

