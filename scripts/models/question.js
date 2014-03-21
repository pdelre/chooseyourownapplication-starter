App.Models.Question = Backbone.Model.extend({
	
	defaults: {
		votes: []
	},
	
	didUserVote: function(username, voteValue){
		var vote = this.getExistingVote(username);
		return !!(vote && vote.value == voteValue);
	},
	
	didUserVoteUp: function(username) { return this.didUserVote(username, 1); },
	didUserVoteDown: function(username) { return this.didUserVote(username, -1); },
	
	constrain: function(value, min, max){
		if(value < min) return min;
		if(value > max) return max;
		return value;
	},
	
	getExistingVote: function(username){
		return _(this.get('votes')).find(function(vote){
			return vote.voter == username;
		});
	},

	vote: function(username, voteType){
		var voteValue = (voteType == 'up' ? 1 : -1);
		var existingVote = this.getExistingVote(username);
		
		if(existingVote){
			existingVote.value = this.constrain(existingVote.value, -1, 1);
		}
		else{		
			this.get('votes').push({value: voteValue, voter: username});
		}
		
		this.save();
	},
	
	voteTally: function(){
		return this.get('votes').reduce(function(tally, vote){
			return tally + vote.value;
		}, 0);
	}
	
});
