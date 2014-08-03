Template.modelFeed.helpers({
    models: function() 
    {
	model = ModelFiles.find();
	if(model.count()){
	    console.log(model);
	    return model;
	} else{
	    return false;
	} 
    }
});

Template.modelView.helpers({
    thumbImg:function()
    {
	thumbImage = ThumbFiles.findOne({gFile:this._id});
	return thumbImage;  
    }
});
