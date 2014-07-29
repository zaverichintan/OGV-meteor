Template.modelFeed.helpers({
    models: function() 
    {
	model = ModelFiles.find();
	return model;
    }
});

Template.modelPost.helpers({
    thumbImg:function()
    {
	thumbImage = ThumbFiles.findOne({gFile:this._id});
	return thumbImage;  
    }
});
