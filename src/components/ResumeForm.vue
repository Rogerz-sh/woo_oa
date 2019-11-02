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
        </div>
        <p class="heading">工作信息</p>
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
        <p class="heading">最高学历</p>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">毕业院校</label>
                    <div class="control">
                        <input type="text" class="input" v-model="resume.school" />
                    </div>
                </div>
            </div>
            <div class="column is-3">
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
                <div class="control" v-if="resume.filename">
                    <input type="text" class="input is-static" :value="resume.filename" />
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
            file: null
        };
    },
    methods: {
        selectFile: function($event) {
            this.file = $event.target.files[0];
        },
        close: function() {
            this.$store.commit("toggleResumeForm", false);
        },
        save: function() {
            if (!this.file && this.resume.id == 0) return;
            let self = this, param = new FormData();
            param.append("file", this.file);
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            };
            self.$http
                .post("/api/common/upload-file", param, config)
                .then(function(res) {
                    let filepath = res.results.filepath, resumeData = Object.assign({}, self.resume);
                    resumeData.filepath = filepath;
                    resumeData.filename = self.file.name;
                    self.$http.post('/api/resume/save-resume', {resume: resumeData}).then(res => {
                        self.$emit('update:updatedAt', Date.now());
                        self.close();
                    })
                })
                .catch(function() {
                    // item.uploadStatus = -1;
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
        resume: function() {
            return this.$store.state.resumeFormData;
        }
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
.select,
.select select {
    width: 100%;
}
</style>