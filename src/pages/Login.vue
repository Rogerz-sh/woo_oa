<template>
    <div class="bg">
        <div id="login">
            <h1 class="is-size-2 has-text-white has-text-centered">即沃OA管理系统</h1>
            <ValidationObserver v-slot="{ invalid }">
                <div class="form">
                    <div class="field">
                        <ValidationProvider rules="username" v-slot="props" :skip-if-empty="false">
                            <label class="label">用户名</label>
                            <div class="control has-icons-left">
                                <input class="input" :class="{'is-danger': props.invalid}" type="text" placeholder="Text input" v-model="msg.name" />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-user"></i>
                                </span>
                            </div>
                            <p class="help" :class="{'is-danger': props.invalid}" v-text="props.errors[0]" v-show="props.dirty"></p>
                        </ValidationProvider>
                    </div>
                    <div class="field">
                        <label class="label">密码</label>
                        <div class="control has-icons-left">
                            <input class="input" type="password" placeholder="Text input" value="bulma" />
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </div>
                        <p class="help" v-text="msg.password" v-show="msg.password"></p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" /> 记住用户名
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <a class="button is-success is-fullwidth" :disabled="invalid" @click="doLogin(invalid)">登录</a>
                    </div>
                </div>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data: function() {
        return {
            msg: {
                name: "",
                password: ""
            }
        };
    },
    methods: {
        doLogin: function (invalid) {
            if (!invalid) alert('aaa');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
    width: 100%;
    height: 100%;
    background: #00a0ef;
}
h1 {
    margin-bottom: 20px;
}
#login {
    width: 350px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
}
.form {
    background: rgba(255, 255, 255, 0.7);
    padding: 30px;
    border-radius: 5px;
}
</style>
