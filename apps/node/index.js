import {SMS} from 'yunpian-sdk';

const sms = new SMS({
  apikey: 'xxxx'
});

(async() => {
  console.log(await sms.singleSend({
    mobile: 'xxxx',
    text: '【xxxx】您的验证码是：123456 （验证码10分钟内有效），请勿将验证码泄露给其他人。如非本人操作，请忽略本短信。'
  }));
})();
