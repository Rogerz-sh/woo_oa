<template>
    <nav id="navBar" class="navbar is-info">
        <div class="navbar-brand">
            <img src="/images/logo.png" height="30" id="logo" />
            <b>即沃OA管理系统</b>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/page/dashboard" class="navbar-item is-spaced">首页</router-link>
                <div class="navbar-item has-dropdown is-hoverable is-spaced">
                    <a class="navbar-link">招聘管理</a>
                    <div class="navbar-dropdown">
                        <router-link to="/page/resume-list" class="navbar-item">人才库</router-link>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="columns is-vcentered">
                    <img src="/images/head.png" id="avatar" />
                    <div class="navbar-item has-dropdown is-hoverable is-spaced">
                        <a class="navbar-link" v-text="$store.state.nickname"></a>
                        <div class="navbar-dropdown">
                            <router-link to="/page/user-profile" class="navbar-item">个人设置</router-link>
                            <router-link to="/page/user-logout" class="navbar-item">退出系统</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <slot></slot>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navBar {
    /* background: #1b5f9a; */
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    /* background-clip: content-box; */
    color: #fff;
    padding-right: 50px;
}
/* #navBar a {
    color: #fff;
    text-decoration: none;
} */
#logo {
    height: 50px;
    margin: 0 10px;
    vertical-align: middle;
}
#logo + b {
    line-height: 50px;
    margin-right: 50px;
}
#avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #fff;
    box-sizing: border-box;
    margin-right: 10px;
}
</style>
