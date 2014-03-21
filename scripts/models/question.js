App.Models.Question = Backbone.Model.extend({
	
	defaults: {
		votes: []
	},

	vote: function(username, voteType){
		var voteValue = (voteType == 'up' ? 1 : -1);
		this.get('votes').push({value: voteValue, voter: username});
		this.save();
	},
	
	voteTally: function(){
		return this.get('votes').reduce(function(tally, vote){
			return tally + vote.value;
		}, 0);
	}
	
});
