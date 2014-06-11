Router.configure({
    layoutTemplate:'layout',
    loadingTemplate:'preloader',
});

Router.map(function() {
    this.route('index', {path : '/'});
    this.route('signUp', {path : 'sign-up'});
    this.route('logIn', {path : 'log-in'});
    this.route('upload', {path : 'uploader'});
    this.route('notVerified', {path : 'not-verified'});
    this.route('filemanager', {path : 'filemanager'});
});

Router.onBeforeAction('loading');
