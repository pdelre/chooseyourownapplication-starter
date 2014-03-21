App.Models.User = Backbone.Model.extend({
	logIn: function(username){
		if(!username) return;
		this.set("username", username);
	},

	isLoggedIn: function(){
		return this.has('username');
	}
});
