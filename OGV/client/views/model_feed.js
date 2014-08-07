Template.modelFeed.helpers({
    models: function() 
    {
	model = ModelFiles.find({}, {sort:{timeUploaded:-1}});
	if(model.count()){
	    console.log(model);
	    return model;
	} else{
	    return false;
	} 
    }
});

Template.modelPost.helpers({
    userImg: function()
    {
	console.log(this.owner);
	modelOwner = Meteor.users.findOne(this.owner);
	picId = modelOwner.profile.pic;
	console.log(picId);
	pic = ProfilePictures.findOne(picId);
	picUrl = pic.url();
	console.log(pic);
	if (pic) {
	    return picUrl;
        } else {
	    return '/public/profile-pic.jpg';
	}
    },
    owner: function()
    {
	console.log("owner is" + this.owner);
	return Meteor.users.findOne(this.owner);
    }
});
    

Template.modelView.helpers({
    thumbImg:function()
    {
	thumbImage = ThumbFiles.findOne({gFile:this._id});
	return thumbImage;  
    }
});
