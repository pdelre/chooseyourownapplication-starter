App.Views.NewQuestion = Backbone.View.extend({

	initialize: function(options){
		App.currentUser.on('change', this.render, this);
		this.render();
	},

	events: {
		'click #addItem': 'addItem'
	},

	addItem: function(){
		var question = {
			text: this.$('#newQuestion').val(),
			username: App.currentUser.get('username')
		};

		//this.model.add(new App.Models.Question(question));
		this.model.create(question);
		this.$('#newQuestion').val('');
	},

	render: function(){
		this.$('#asker').text(App.currentUser.get('username'));
		this.$el.toggleClass('hidden', !App.currentUser.isLoggedIn());
		return this;
	}

});
