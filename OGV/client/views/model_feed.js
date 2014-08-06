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
	picId = this.owner.profile.pic;
	picUrl = ProfilePictures.findOne(picId).url();
	console.log(picUrl)
	return picUrl;
    }
});
    

Template.modelView.helpers({
    thumbImg:function()
    {
	thumbImage = ThumbFiles.findOne({gFile:this._id});
	return thumbImage;  
    }
});
