Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://<your-email-id>:<your-passowrd>@smtp.gmail.com:25';
});
