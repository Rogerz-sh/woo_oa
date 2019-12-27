<template>
    <div>
        <side-bar>
            <fav-list></fav-list>
        </side-bar>
        <div id="container">
            <section class="section">
                <div class="columns">
                    <div class="column is-2">
                        <div class="field">
                            <label class="label">姓名</label>
                            <div class="control">
                                <input type="text" class="input" v-model="search.realname" />
                            </div>
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="field">
                            <label class="label">性别</label>
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" name="sex" value v-model="search.sex" />不限
                                </label>
                                <label class="radio">
                                    <input type="radio" name="sex" value="男" v-model="search.sex" />男
                                </label>
                                <label class="radio">
                                    <input type="radio" name="sex" value="女" v-model="search.sex" />女
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="column is-1">
                        <label class="label">学历</label>
                        <div class="select">
                            <select v-model="search.degree">
                                <option value>不限</option>
                                <option v-for="(d, index) in degrees" :key="index" :value="d" v-text="d"></option>
                            </select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">公司</label>
                            <div class="control">
                                <input type="text" class="input" v-model="search.company" />
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">职位</label>
                            <div class="control">
                                <input type="text" class="input" v-model="search.job" />
                            </div>
                        </div>
                    </div>
                    <!-- <div class="column is-1">
                        <div class="field">
                            <label class="label">工作经验</label>
                            <div class="field has-addons">
                                <div class="control is-expanded">
                                    <input type="text" class="input" v-model="search.experience" />
                                </div>
                                <div class="control">
                                    <a class="button is-static">年</a>
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <div class="column is-1">
                        <div class="field">
                            <label class="label">&nbsp;</label>
                            <button class="button is-primary" @click="searchResume">查询</button>
                        </div>
                    </div>
                </div>

                <div class="columns">
                    <div class="column">
                        <button class="button is-small is-success" @click="addResume">添加简历</button>
                        <button class="button is-small is-primary margin-left-10" @click="addFav" :disabled="selectedIds.length==0">添加收藏</button>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <table class="table is-fullwidth is-striped is-hoverable">
                            <thead>
                                <tr>
                                    <th>
                                        <label class="checkbox">
                                            <input type="checkbox" @change="selAll($event)" />
                                            ID
                                        </label>
                                    </th>
                                    <th>姓名</th>
                                    <th>手机</th>
                                    <th>年龄</th>
                                    <th>性别</th>
                                    <th>学历</th>
                                    <th>公司</th>
                                    <th>职位</th>
                                    <th>附件</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(r, idx) in resumes" :key="r.id">
                                    <td>
                                        <label class="checkbox">
                                            <input type="checkbox" name="resumeId" :disabled="r.favcount > 0" :value="r.id" v-model="selectedIds" />
                                            {{r.id}}
                                        </label>
                                    </td>
                                    <td>{{r.realname}}</td>
                                    <td>{{r.mobile}}</td>
                                    <td>{{formatBirthYear(r)}}</td>
                                    <td>{{r.sex}}</td>
                                    <td>{{r.degree}}</td>
                                    <td>{{r.company}}</td>
                                    <td>{{r.job}}</td>
                                    <td>
                                        <a v-show="r.filepath" :href="'/api/resume/download?path='+r.filepath+'&name='+r.filename+''" class="button is-small is-light">
                                            <i class="fa fa-download"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <i class="fa fa-edit pointer" @click="editResume(r)"></i>&nbsp;
                                        <i class="fa fa-list pointer" @click="listRecord(r)"></i>&nbsp;
                                        <i class="fa fa-trash-o pointer" @click="delResume(r, idx)"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-narrow">
                        <pageNav :size="size" :total="total" :page.sync="page"></pageNav>
                    </div>
                </div>
            </section>
        </div>
        <resume-form :updatedAt.sync="timestamp"></resume-form>
        <record-list :resume="recordListResume"></record-list>
        <fav-adder :is-hidden="!$store.state.showFavAdder" :selected="selectedIds" :updatedAt.sync="timestamp"></fav-adder>
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
            timestamp: Date.now(),
            search: {
                realname: "",
                sex: "",
                degree: "",
                company: "",
                job: "",
                experience: ""
            },
            recordListResume: null,
            selectedIds: [],
            showAdder: true
        };
    },
    methods: {
        selAll: function(e) {
            var self = this;
            if (!e.target.checked) {
                self.$set(self, "selectedIds", []);
            } else {
                var ids = [];
                self.resumes.forEach(v => {
                    if (v.favcount == 0) ids.push(v.id);
                });
                self.$set(self, "selectedIds", ids);
            }
        },
        getResumeData: function() {
            this.$http
                .get("/api/resume/json-resume-list", {
                    params: {
                        offset: (this.page - 1) * this.size,
                        limit: this.size,
                        query: Object.assign({ favId: this.favId }, this.search)
                    }
                })
                .then(res => {
                    this.resumes = res.results.rows;
                    this.total = res.results.count;
                    this.$set(this, "selectedIds", []);
                });
        },
        searchResume: function() {
            this.getResumeData();
        },
        addResume: function() {
            this.$store.commit("addNewResume");
            this.$store.commit("toggleResumeForm", true);
        },
        editResume: function(data) {
            this.$store.commit("editResume", data);
            this.$store.commit("toggleResumeForm", true);
        },
        delResume: function(data, idx) {
            this.$http
                .post("/api/resume/remove-resume", {
                    resumeId: data.id
                })
                .then(res => {
                    if (res.code == 200) {
                        this.getResumeData();
                    } else {
                        alert(res.msg);
                    }
                });
        },
        formatBirthYear: function(item) {
            if (item.birthyear) {
                return new Date().getFullYear() - item.birthyear;
            } else {
                return "--";
            }
        },
        listRecord: function(item) {
            this.$store.commit("toggleRecordList", true);
            this.recordListResume = item;
            // item.age = 5;
        },
        addFav: function() {
            this.$store.commit("toggleFavAdder", true);
        }
    },
    watch: {
        timestamp: function() {
            this.getResumeData();
        },
        page: function() {
            this.getResumeData();
        },
        favId: function() {
            this.getResumeData();
        }
    },
    computed: {
        degrees: function() {
            return this.$store.state.formData.degree;
        },
        favId: function() {
            return this.$store.state.activeFavId;
        }
    },
    mounted: function() {
        var self = this;
        self.getResumeData();
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