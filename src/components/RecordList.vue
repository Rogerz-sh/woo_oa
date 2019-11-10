<template>
    <div class="panel" id="recordList" v-show="isShow">
        <div class="panel-heading">沟通记录 -- [{{resume ? resume.realname : ''}}]</div>
        <div class="panel-block" v-for="r in recordList" :key="r.id">
            <span class="has-text-primary">{{r.user.username}}：</span>
            <span>{{r.content}}</span>
            <small class="datetime">({{r.createdAt}})</small>
        </div>
        <div class="panel-block columns is-gapless">
            <div class="field column">
                <div class="control">
                    <textarea class="textarea" rows="4" v-model="content"></textarea>
                </div>
                <div class="control" style="margin-top:10px;">
                    <button class="button is-success" @click="addRecord">
                        <i class="fa fa-plus"></i> &nbsp;添加记录
                    </button>&nbsp;&nbsp;
                    <button class="button" @click="close">关闭窗口</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "RecordList",
    props: {
        resume: {
            type: Object
        }
    },
    data: function() {
        return {
            content: "",
            recordList: []
        };
    },
    computed: {
        isShow: function() {
            return this.$store.state.showRecordList;
        },
        resumeId: function () {
            return this.resume ? this.resume.id : 0;
        }
    },
    methods: {
        close: function() {
            this.$store.commit("toggleRecordList", false);
        },
        getUserRecordList: function() {
            if (this.resumeId == 0) return;
            let self = this;
            self.$http
                .get("/api/resume/json-resume-record-list", {
                    params: { resumeId: this.resumeId }
                })
                .then(res => {
                    self.recordList = res.results;
                });
        },
        addRecord: function() {
            let self = this;
            self.$http
                .post("/api/resume/save-resume-record", {
                    record: {
                        content: self.content,
                        resumeId: self.resumeId,
                        createdBy: +sessionStorage.getItem("uid")
                    }
                })
                .then(res => {
                    self.content = "";
                    self.getUserRecordList();
                })
                .catch(err => {});
        }
    },
    watch: {
        resume: function() {
            this.getUserRecordList();
        }
    }
};
</script>

<style scoped>
#recordList {
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
.datetime {
    font-size: 0.8em;
    margin-left: 10px;
    color: #999;
}
</style>