/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/**
 * Created by zhe.zhang on 2016/7/13.
 */
$(function () {
    var personData = {
        realname: "",
        sex: "",
        birthyear: "",
        province: "",
        city: "",
        mobile: "",
        email: "",
        industry: "",
        jobclass: "",
        company: "",
        job: "",
        experience: "",
        school: "",
        degree: "",
        filepath: "",
        filename: "",
        educations: [],
        works: []
    };

    String.prototype.trim = function (flag) {
        if (flag) {
            return this.replace(/\s+/g, '');
        } else {
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        }
    };

    chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
        if (req.method === 'read') {

            personData.realname = document.querySelector('#tdseekname').childNodes[0].textContent.trim();
            personData.mobile = document.querySelector('#tdseekname').parentElement.nextSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.childNodes[3].textContent;
            personData.email = document.querySelector('#tdseekname').parentElement.nextSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.childNodes[5].textContent;

            personData.sex = document.querySelector('#tdseekname').parentElement.nextSibling.nextSibling.firstElementChild.childNodes[2].textContent;
            personData.birthyear = document.querySelector('#tdseekname').parentElement.nextSibling.nextSibling.firstElementChild.childNodes[4].textContent.match(/(\d+)年/)[1];
            personData.degree = document.querySelectorAll('td.txt2')[5].textContent;
            personData.experience = document.querySelector('#tdseekname').parentElement.nextSibling.nextSibling.firstElementChild.childNodes[8].textContent.match(/\d+/)[0];

            personData.company = document.querySelectorAll('td.txt2')[1].textContent;
            personData.job = document.querySelectorAll('td.txt2')[0].textContent;

            try {
                var contentCom = $('td.plate1:contains("工作经验")').closest('tr').next().find('table').find('table'), rowsCom = contentCom.length;
                for (var i = 0; i < rowsCom; i += 2) {
                    var table = contentCom.eq(i);
                    var work = {
                        "starttime": "",
                        "endtime": "",
                        "company": "",
                        "job": "",
                        "department": "",
                        "description": ""
                    };
                    work.company = table.find('tr:eq(0)').find('td:eq(1) span:eq(0)').text();
                    work.job = table.find('tr:eq(2)').find('td:eq(1)').text();
                    work.department = table.find('tr:eq(2)').find('td:eq(0)').text();

                    var times = table.find('tr:eq(0)').find('td.time').text().match(/(\d+\/\d+|至今)/g);
                    work.starttime = times[0].split('/').join('-');
                    work.endtime = times[1] == '至今' ? '' : times[1].split('/').join('-');

                    work.description = table.find('tr:eq(3)').text();
                    personData.works.push(work);
                }

                var contentEdu = $('td.plate1:contains("教育经历")').closest('tr').next().find('table').find('table'), rowsCom = contentEdu.length;

                for (var i = 0; i < rowsCom; i += 2) {
                    var table = contentEdu.eq(i);
                    var education = {
                        "school": "",
                        "starttime": "",
                        "endtime": "",
                        "degree": "",
                        "major": "",
                        "isunified": "是"
                    };
                    education.school = table.find('tr:eq(0)').find('td:eq(1)').text();

                    var times = table.find('tr:eq(0)').find('td.time').text().match(/(\d+\/\d+|至今)/g);
                    education.starttime = times[0].split('/').join('-');
                    education.endtime = times[1] == '至今' ? '' : times[1].split('/').join('-');

                    var text = table.find('tr:eq(1)').find('td').text().split('|');
                    education.major = text[1];
                    education.degree = text[0];
                    personData.educations.push(education);
                    console.log(personData);
                }
            } catch (e) {
                alert('详细信息读取失败!');
            }


            chrome.runtime.sendMessage({ method: 'post', data: JSON.stringify(personData) }, function (res) {
                //res is the status of save action
                if (res) {
                    alert('数据读取成功!');
                } else {
                    alert('数据读取失败!');
                }
            });
        }
    });
});