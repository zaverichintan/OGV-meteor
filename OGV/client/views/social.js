Template.comment.helpers({
    submittedText: function() {
	return new Date(this.submitted).toString();
    }
});


Template.commentSubmit.events({
    'submit form': function(e, template) {
	e.preventDefault();
	    var $body = $(e.target).find('[name=body]');
	    var comment = {
		body: $body.val(),
		postId: this._id
	    };
    
	    Meteor.call('comment', comment, function(error, commentId) {
		if (error){
		    console.log(error.reason);
		} else {
		    $body.val('');
		}
	   });
    }
});


Template.comments.helpers({
    comments: function() 
    {
	return Comments.find({postId:this._id});
    }
});


Template.comments.events({
    'click .comments-header':function(e,t)
    {
	console.log(e);
	$header = $(e.currentTarget);
	console.log($header);
	$content = $header.next();
	$content.slideToggle(500, function () {
	    $header.text(function () {
		return $content.is(":visible") ? "Hide Comments" : "Show Comments";
	    });
	});
    }
});

        
Template.lovemeter.events({
    'click .lovemeter-wrapper':function(){
        var love = {
            postId: this._id
        };
     Meteor.call('love', love, function(error, loveId) {
		if (error){
		    console.log(error.reason);
		} else {
		    
		}
	   });
    }
});

Template.lovemeter.helpers({
    lovers: function(){
        loversObj = Lovers.findOne({postId: this._id});
        if(loversObj){
        loversArray = loversObj.lovers;
        return loversArray.length;
        } else{
            return 0;
        }
    }
});
