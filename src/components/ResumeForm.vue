<template>
    <div id="resumeForm" class="animated slideInRight faster" :class="{'hidden': isHidden}">
        <p class="heading">基本信息</p>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">姓名</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.realname" />
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label class="label">性别</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="resume.sex">
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label class="label">出生年份</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.birthyear" />
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label class="label">所在省份</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="resume.province">
                                <option v-for="p in provinces" :key="p.id" :value="p.id" v-text="p.name"></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label class="label">所在城市</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="resume.city">
                                <option v-for="c in citys" :key="c.id" :value="c.id" v-text="c.name"></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">手机</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.mobile" />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">邮箱</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.email" />
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">行业</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="resume.industry">
                                <option v-for="j in job_parent_types" :key="j.id" :value="j.id" v-text="j.name"></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">职能</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="resume.jobclass">
                                <option v-for="j in job_child_types" :key="j.id" :value="j.id" v-text="j.name"></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label class="label">学历</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="resume.degree">
                                <option v-for="(d, index) in degrees" :key="index" :value="d" v-text="d"></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">工作单位</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.company" />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">担任职位</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.job" />
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label class="label">工作年限</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.experience" />
                    </div>
                </div>
            </div>
        </div>
        <p class="heading">
            工作经历
            <i class="fa fa-plus pointer" @click="addWorks"></i>
        </p>
        <div class="box" v-for="(work,idx) in resume.works" :key="'w' + idx">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">任职公司</label>
                        <div class="control">
                            <input type="text" class="input" v-model="work.company" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">任职岗位</label>
                        <div class="control">
                            <input type="text" class="input" v-model="work.job" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">所在部门</label>
                        <div class="control">
                            <input type="text" class="input" v-model="work.department" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">入职时间</label>
                        <div class="control">
                            <input type="text" class="input" v-model="work.starttime" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">离职时间</label>
                        <div class="control">
                            <input type="text" class="input" v-model="work.endtime" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">月薪</label>
                        <div class="control">
                            <input type="text" class="input" v-model="work.salary" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">工作描述</label>
                        <div class="control">
                            <textarea class="textarea" v-model="work.description"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="heading">
            教育经历
            <i class="fa fa-plus pointer" @click="addEducations"></i>
        </p>
        <div class="box" v-for="(edu,idx) in resume.educations" :key="'e' + idx">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">毕业院校</label>
                        <div class="control">
                            <input type="text" class="input" v-model="edu.school" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">专业</label>
                        <div class="control">
                            <input type="text" class="input" v-model="edu.major" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">毕业时间</label>
                        <div class="control">
                            <input type="text" class="input" v-model="edu.endtime" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">学历</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="edu.degree">
                                    <option v-for="(d, index) in degrees" :key="index" :value="d" v-text="d"></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">是否统招</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="edu.isunified">
                                    <option value="是">是</option>
                                    <option value="否">否</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="heading">简历附件</p>
        <div class="columns">
            <div class="column">
                <div class="file has-name is-fullwidth" v-if="!resume.filename">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume" @change="selectFile($event)" />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fa fa-upload"></i>
                            </span>
                            <span class="file-label">请选择文件…</span>
                        </span>
                        <span class="file-name" v-text="file_name">尚未选择任何文件</span>
                    </label>
                </div>
                <div class="field" v-if="resume.filename">
                    <div class="control is-expanded has-addons">
                        <input type="text" class="input is-static" :value="resume.filename" />
                        <span class="icon is-small is-right">
                            <i class="fa fa-trash-o has-text-danger" @click="deleteFile"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="buttons">
                    <button class="button is-primary" @click="save">保存</button>
                    <button class="button is-default" @click="close">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
//行业、职能、最近工作单位、职位、姓名、手机、邮箱、性别、城市、年龄、工作年限、学历、毕业院校
export default {
    name: "ResumeForm",
    data: function() {
        return {
            file: null,
            hasFile: false,
            resume: {}
        };
    },
    methods: {
        selectFile: function($event) {
            this.file = $event.target.files[0];
            this.hasFile = true;
        },
        deleteFile: function() {
            this.file = null;
            this.hasFile = false;
            this.resume.filepath = "";
            this.resume.filename = "";
        },
        addWorks: function() {
            this.resume.works.push({
                id: this.resume.works.length * -1 + "",
                company: "",
                job: "",
                department: "",
                salary: "",
                starttime: "",
                endtime: ""
            });
        },
        addEducations: function() {
            this.resume.educations.push({
                id: this.resume.works.length * -1 + "",
                school: "",
                degree: "",
                major: "",
                isunified: "是",
                endtime: ""
            });
        },
        close: function() {
            this.$store.commit("toggleResumeForm", false);
        },
        save: function() {
            if (!this.hasFile) return;
            let self = this,
                param = new FormData();
            param.append("file", this.file);
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            if (this.file) {
                self.$http
                    .post("/api/common/upload-file", param, config)
                    .then(function(res) {
                        let filepath = res.results.filepath,
                            resumeData = Object.assign({}, self.resume);
                        resumeData.filepath = filepath;
                        resumeData.filename = self.file.name;
                        resumeData.createdBy = +sessionStorage.getItem("uid");
                        self.$http
                            .post("/api/resume/save-resume", {
                                resume: resumeData
                            })
                            .then(res => {
                                self.$emit("update:updatedAt", Date.now());
                                self.close();
                            });
                    })
                    .catch(function() {
                        // item.uploadStatus = -1;
                    });
            } else {
                let resumeData = Object.assign({}, self.resume);
                self.$http
                    .post("/api/resume/save-resume", {
                        resume: resumeData
                    })
                    .then(res => {
                        self.$emit("update:updatedAt", Date.now());
                        self.close();
                    });
            }
        }
    },
    watch: {
        resumeId: function(nid, oid) {
            if (!nid) return;
            var self = this;
            self.$http
                .get("/api/resume/json-resume-works-and-edcations", {
                    params: {
                        resumeId: nid
                    }
                })
                .then(res => {
                    var resume = res.results.resume;
                    resume.works = res.results.works;
                    resume.educations = res.results.educations;
                    self.resume = resume;
                });
        }
    },
    computed: {
        isHidden: function() {
            return !this.$store.state.showResumeForm;
        },
        provinces: function() {
            return this.$store.state.formData.location.provinces;
        },
        citys: function() {
            return this.$store.state.formData.location.citys.filter(c => {
                return c.provinceId === this.resume.province;
            });
        },
        job_parent_types: function() {
            return this.$store.state.formData.job_type.filter(v => {
                return v.parentid === 0;
            });
        },
        job_child_types: function() {
            return this.$store.state.formData.job_type.filter(v => {
                return v.parentid === this.resume.industry;
            });
        },
        degrees: function() {
            return this.$store.state.formData.degree;
        },
        file_name: function() {
            return this.file ? this.file.name : "尚未选择任何文件";
        },
        resumeId: function() {
            var resumeData = this.$store.state.resumeFormData;
            if (resumeData.filename && resumeData.filepath) {
                this.hasFile = true;
            }
            return resumeData.id || 0;
        }
        // resume: {
        //     get: function() {
        //         this.resumeData = this.$store.state.resumeFormData;
        //         if (resumeData.filename && resumeData.filepath) {
        //             this.hasFile = true;
        //         }
        //         return this.resumeData;
        //     },
        //     set: function(resume) {

        //     }
        // }
    }
};
</script>

<style scoped>
#resumeForm {
    background: #fff;
    position: absolute;
    z-index: 9;
    top: 55px;
    right: 15px;
    bottom: 5px;
    width: 750px;
    border: 2px solid #eee;
    border-radius: 5px;
    padding: 15px;
    overflow: auto;
}
#resumeForm.hidden {
    display: none;
}
.box {
    border: 1px solid #ddd;
    padding: 10px 5px;
    border-radius: 5px;
}
.select,
.select select {
    width: 100%;
}
</style>