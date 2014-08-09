Template.modelFeed.helpers({
    models: function() 
    {
	model = ModelFiles.find({}, {sort:{timeUploaded:-1}});
	if(model.count()){
	    return model;
	} else{
	    return false;
	} 
    }
});

Template.modelPost.helpers({
    userImg: function()
    {
	modelOwner = Meteor.users.findOne(this.owner);
	picId = modelOwner.profile.pic;
	pic = ProfilePictures.findOne(picId);
	picUrl = pic.url();
	if (pic) {
	    return picUrl;
        } else {
	    return '/public/profile-pic.jpg';
	}
    },
    owner: function()
    {
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
