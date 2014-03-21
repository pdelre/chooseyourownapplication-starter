App.Views.Question = Backbone.View.extend({

	tagName: 'li',
	className: 'question',
	template: _.template($('#question-template').html()),
	
	events: {
		'click .voteup': 'upVote',
		'click .votedown': 'downVote'
	},
	
	upVote: function(){ this.setVote('up'); },
	downVote: function(){ this.setVote('down'); },
	
	setVote: function(voteType){
		this.model.vote(App.currentUser.get('username'), voteType);
		this.render();
	},

	render: function(){
		var data = this.model.toJSON();
		data.tally = this.model.voteTally();
		
		this.$el.html(this.template(data));
		
		var username = App.currentUser.get('username');
		this.$('.voteup').toggleClass('selected', this.model.didUserVoteUp(username));
		this.$('.votedown').toggleClass('selected', this.model.didUserVoteDown(username));
		
		return this;
	}

});
