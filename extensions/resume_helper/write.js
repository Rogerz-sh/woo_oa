/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Created by zhe.zhang on 2016/7/13.
 */
$(function () {
    chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
        if (req.method === 'write') {
            chrome.runtime.sendMessage({method: 'get'}, function (res) {
                //res is the person data
                window.localStorage.setItem('data', res);
                console.log(typeof res);
                $.ajax({
                    url: 'http://sys.giewoo.com:8000/api/resume/save-resume-by-chrome',
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'oa-auth-uid': sessionStorage.getItem('uid'),
                        'oa-auth-token': sessionStorage.getItem('token')
                    },
                    data: {resume: res},
                    success: function (res) {
                        if (res.code == 200) {
                            alert('保存成功')
                            location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            });
        }
    });

    function injectScript() {
        var script = document.createElement('script');
        script.src = './extension/data.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
});