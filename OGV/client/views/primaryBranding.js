Template.primaryBranding.helpers({
    primaryBranding: function()
    {
	settings = OgvSettings.findOne();
	return settings.siteName;
    }
});
