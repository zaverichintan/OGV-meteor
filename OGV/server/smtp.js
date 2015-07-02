Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://USERNAME:PASSWORD@smtp.gmail.com:25';
});
