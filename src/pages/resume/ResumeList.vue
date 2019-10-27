<template>
    <div>
        <side-bar>
            <menu-list></menu-list>
        </side-bar>
        <div id="container">
            <section class="section">
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <label class="label">姓名</label>
                            <input type="text" class="input" />
                        </div>
                        <div class="field">
                            <label class="label">性别</label>
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" name="sex" />男
                                </label>
                                <label class="radio">
                                    <input type="radio" name="sex" />女
                                </label>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">学历</label>
                            <div class="select">
                                <select>
                                    <option value="专科">专科</option>
                                    <option value="本科">本科</option>
                                    <option value="硕士">硕士</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="button is-success" @click="addResume">添加简历</div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <table class="table is-fullwidth is-striped is-hoverable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>姓名</th>
                                    <th>年龄</th>
                                    <th>性别</th>
                                    <th>学历</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><label class="checkbox"><input type="checkbox" name="" id=""></label>001</td>
                                    <td>吴四桂</td>
                                    <td>39</td>
                                    <td>男</td>
                                    <td>专科</td>
                                </tr>
                                <tr>
                                    <td><label class="checkbox"><input type="checkbox" name="" id=""></label>001</td>
                                    <td>吴四桂</td>
                                    <td>39</td>
                                    <td>男</td>
                                    <td>专科</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
        <resume-form></resume-form>
    </div>
</template>

<script>
export default {
    name: "ResumeList",
    methods: {
        addResume: function () {
            this.$store.commit('toggleResumeForm', !this.$store.state.showResumeForm);
        }
    }
};
</script>

<style scoped>
#container {
    padding-left: 200px;
}
</style>