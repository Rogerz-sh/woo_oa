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
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="r in resumes" :key="r.id">
                                    <td>
                                        <label class="checkbox">
                                            <input type="checkbox" name id />
                                        </label>
                                        {{r.id}}
                                    </td>
                                    <td>{{r.realname}}</td>
                                    <td>{{formatBirthYear(r)}}</td>
                                    <td>{{r.sex}}</td>
                                    <td>{{r.degree}}</td>
                                    <td>
                                        <i class="fa fa-edit pointer" @click="editResume(r)"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
        <resume-form :updatedAt.sync="timestamp"></resume-form>
    </div>
</template>

<script>
export default {
    name: "ResumeList",
    data: function() {
        return {
            page: 1,
            size: 10,
            total: 0,
            resumes: [],
            timestamp: Date.now()
        };
    },
    methods: {
        addResume: function() {
            this.$store.commit("addNewResume");
            this.$store.commit("toggleResumeForm", true);
        },
        editResume: function(data) {
            this.$store.commit("editResume", data);
            this.$store.commit("toggleResumeForm", true);
        },
        formatBirthYear: function(item) {
            return new Date().getFullYear() - item.birthyear;
        }
    },
    watch: {
        timestamp: function() {
            this.$http.get("/api/resume/json-resume-list").then(res => {
                this.resumes = res.results.rows;
                this.total = res.results.count;
            });
        }
    },
    mounted: function() {
        this.$http.get("/api/resume/json-resume-list").then(res => {
            this.resumes = res.results.rows;
            this.total = res.results.count;
        });
    }
};
</script>

<style scoped>
#container {
    padding-left: 200px;
}
.fa.pointer {
    cursor: pointer;
}
</style>