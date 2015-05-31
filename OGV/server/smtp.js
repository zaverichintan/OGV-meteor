Meteor.startup(function () {
    process.env.MAIL_URL='smtp://postmaster%40sandbox5cb71a0119964fde80f91c415ef345a2.mailgun.org:b38c82be7ed0b4046bdc856547c655d3@smtp.mailgun.org:587'

	Accounts.emailTemplates.from='no-reply@yourdomain.com';
	Accounts.emailTemplates.sitename='Online Geometry Viewer';
	
	Accounts.emailTemplates.verifyEmail.subject = function(user) {
		return '[OGV BRL-CAD] Confirm your Email Address - do-not-reply';
	}

	Accounts.emailTemplates.verifyEmail.text = function(user, url) {
		return 'BRL-CAD welcomes you to the community\nTo start using Online Geometry Viewer\nClick on the give link to activate your account:\n' + url + '\n\nPS: We Love You';
	}

	Accounts.emailTemplates.resetPassword.subject = function(user) {
		return '[OGV BRL-CAD] Reset Password - do-not-reply';
	}

	Accounts.emailTemplates.resetPassword.text = function(user, url) {
		return 'How could you do this\nWell everything\'s gonaa be fine, trust us\nJust click on the link below to change your password:\n'+url+'\n\nPS: Try remembering it this time ;)';
	}
});
