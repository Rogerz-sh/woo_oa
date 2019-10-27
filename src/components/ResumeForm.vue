<template>
    <div id="resumeForm" :class="{'hidden': isHidden}">

    </div>
</template>

<script>
export default {
    name: 'ResumeForm',
    computed: {
        isHidden: function () {
            return !this.$store.state.showResumeForm;
        }
    }
}
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
    border-radius: 10px;
}
#resumeForm.hidden {
    display: none;
}
</style>