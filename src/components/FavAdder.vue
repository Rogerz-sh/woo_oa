<template>
    <div id="favAdderCtn" v-show="!isHidden">
        <div id="favAdderSelector">
            <div id="menu" class="menu">
                <ul class="menu-list">
                    <li>
                        <label class="fav-label">
                            <input type="radio" name="favId" @click="selectFavItem(0)" checked />
                            <span>我的收藏</span>
                        </label>
                        <menu-list-selector :items="menus"></menu-list-selector>
                    </li>
                </ul>
            </div>
            <div class="columns margin-top-10">
                <div class="column">
                    <button class="button is-small is-success" @click="saveFavResume">确定</button>
                    <button class="button is-small is-default margin-left-10" @click="$store.commit('toggleFavAdder', false)">取消</button>
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
        },
        selected: {
            type: Array
        },
        updatedAt: {
            type: Number
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
        },
        saveFavResume: function() {
            var self = this;
            this.$http
                .post("/api/resume/save-favorite-resume", {
                    favId: self.$store.state.selectedFavId,
                    resumeIds: self.selected
                })
                .then(res => {
                    if (res.code == 200) {
                        self.$emit("update:updatedAt", Date.now());
                        self.$store.commit("toggleFavAdder", false);
                    }
                });
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
#menu {
    max-height: 300px;
    overflow-y: scroll;
}
#menu label.fav-label {
    font-size: 12px;
}
</style>

