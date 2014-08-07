if (OgvSettings.find().count() === 0) 
{
	console.log("fixture");
   OgvSettings.insert({
	settingSwitch: true,
	siteName :"Online Geometry Viewer",
	mailUrl : "http://username:password@example.com",
	gobjPath : "/usr/brlcad/dev-7.25.0/bin/g-obj",
	mgedPath : "/usr/brlcad/dev-7.25.0/bin/mged"
    });
    
}
