<template>
    <div id="resumeForm" :class="{'hidden': isHidden}">
        <p class="heading">基本信息</p>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">姓名</label>
                    <div class="control">
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">性别</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">出生年份</label>
                    <div class="control">
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">所在城市</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option value="北京">北京</option>
                                <option value="上海">上海</option>
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
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">邮箱</label>
                    <div class="control">
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">行业</label>
                    <div class="control">
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">职能</label>
                    <div class="control">
                        <input type="text" class="input" />
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
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">担任职位</label>
                    <div class="control">
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label class="label">工作年限</label>
                    <div class="control">
                        <input type="text" class="input" />
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
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="field">
                    <label class="label">学历</label>
                    <div class="control">
                        <input type="text" class="input" />
                    </div>
                </div>
            </div>
        </div>
        <p class="heading">简历附件</p>
        <div class="columns">
            <div class="column">
                <div class="file has-name is-fullwidth">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fa fa-upload"></i>
                            </span>
                            <span class="file-label">请选择文件…</span>
                        </span>
                        <span class="file-name">尚未选择任何文件</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="buttons">
                    <button class="button is-primary">保存</button>
                    <button class="button is-default">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//行业、职能、最近工作单位、职位、姓名、手机、邮箱、性别、城市、年龄、工作年限、学历、毕业院校
export default {
    name: "ResumeForm",
    computed: {
        isHidden: function() {
            return !this.$store.state.showResumeForm;
        }
    }
};
</script>

<style scoped>
#resumeForm {
    position: absolute;
    top: 55px;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
    width: 750px;
    background: #efefef;
    border-radius: 5px;
    padding: 15px;
}
#resumeForm.hidden {
    display: none;
}
.select,
.select select {
    width: 100%;
}
</style>