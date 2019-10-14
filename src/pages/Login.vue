<template>
    <div class="bg">
        <div id="login">
            <h1 class="is-size-2 has-text-white has-text-centered">即沃OA管理系统</h1>
            <ValidationObserver v-slot="{ invalid }">
                <div class="form">
                    <div class="field">
                        <span class="help is-danger has-text-centered" v-text="error"></span>
                    </div>
                    <div class="field">
                        <ValidationProvider rules="username" v-slot="props" :skip-if-empty="false">
                            <label class="label">用户名</label>
                            <div class="control has-icons-left">
                                <input class="input" :class="{'is-danger': props.invalid && props.dirty}" type="text" placeholder="请输入用户名" v-model="account.name" />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-user"></i>
                                </span>
                            </div>
                            <p class="help" :class="{'is-danger': props.invalid}" v-text="props.errors[0]" v-show="props.dirty"></p>
                        </ValidationProvider>
                    </div>
                    <div class="field">
                        <ValidationProvider rules="password" v-slot="props" :skip-if-empty="false">
                            <label class="label">密码</label>
                            <div class="control has-icons-left">
                                <input class="input" :class="{'is-danger': props.invalid && props.dirty}" type="password" placeholder="请输入密码" v-model="account.password" />
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                            <p class="help" :class="{'is-danger': props.invalid}" v-text="props.errors[0]" v-show="props.dirty"></p>
                        </ValidationProvider>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="account.remember" /> 记住用户名
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
            account: {
                name: "",
                password: "",
                remember: true
            },
            error: ''
        };
    },
    methods: {
        doLogin: function(invalid) {
            var self = this;
            if (!invalid) {
                self.$http
                    .post("/api/account/account-login", {
                        username: self.account.name,
                        password: self.account.password
                    })
                    .then(res => {
                        if (res.code == 200) {
                            sessionStorage.setItem("token", res.results);
                            self.$router.push("/resume");
                        } else {
                            self.error = res.msg;
                        }
                    }).catch((err) => {
                        self.error = error;
                    })
            }
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
