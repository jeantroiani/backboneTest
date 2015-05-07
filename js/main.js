var Vehicle = Backbone.Model.extend({
  urlRoot: "/api/vehicles",
  validate: function (attrs) {
    if (!attrs.registrationNumber) {
      return "registrationNumber is required";
    }
  },
  start: function () {
    return "Vehicle started";
  }
});

var myVehicle = new Vehicle({registrationNumber: "VEH123"});

var Car = Vehicle.extend({
  start: function () {
    return "Car with registration number " + this.get('registrationNumber') + " started.";
  }
});

var myCar = new Car({registrationNumber: "XLI887", colour: "Black"});

var Dealers = Backbone.Collection.extend({ model: Car });

var fordDealer = new Dealers([
  new Car({ registrationNumber: "XLI887", colour: "Blue" }),
  new Car({ registrationNumber: "ZNP123", colour: "Blue" })
]);

fordDealer.add(new Car({registrationNumber: "XUV456", colour: "Grey"}));
console.log(fordDealer.get('c3'));  // gets that specific model

fordDealer.add(new Car({registrationNumber: "678ELE", colour: "Grey"}));

fordDealer.push(new Car({registrationNumber: "910AND", colour: "Pink"}));  //adds a new model in the top of the collections

console.log("all where:", fordDealer.where({colour: "Blue"}));

fordDealer.findWhere({colour: "Blue"}); //finds just the first match

console.log(fordDealer.where({registrationNumber: "XLI887"}));
fordDealer.remove(fordDealer.where({registrationNumber: "XLI887"}));

console.log(fordDealer.toJSON());   //returns the models listed as object NO JASON

fordDealer.each(function (car) {   //iterates over a list
  console.log(car);
});


var CarPosts = Backbone.View.extend({
  render: function () {
    this.$el.html("Ford Ka");
    return this;
  }
});

var carPostA = new CarPosts({
  el: "#container"
});

carPostA.render();

// VIEW TEST

var Song = Backbone.Model.extend();

var rainyMonday  = new Song({
  title: "Rainy Monday"
});

var weatherGirl  = new Song({
  title: "Weather girl"
});

var Album = Backbone.Collection.extend({
  model: Song
});

var shinyToyGunsAlbum = new Album([
  rainyMonday,
  weatherGirl
]);

var SongView = Backbone.View.extend({
  render: function () {
    this.$el.html(this.model.get("title"));
    return this;
  }
});

var AlbumView = Backbone.View.extend({
  render: function () {
    var self = this;
    this.model.each(function (song) {
      console.log("song name", song);
      var songView = new SongView({model: song});
      console.log(self);
      self.$el.append(songView.render().$el);
    });
  }
});

var shinyToyGunsAlbumView = new AlbumView({
  el: "#collection",
  model: shinyToyGunsAlbum
});

var rainyMondayView = new SongView({
  el: "#container2",
  model: rainyMonday
});

rainyMondayView.render();
shinyToyGunsAlbumView.render();

//RESPONDING TO EVENTS

var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({
  events: {
    "click": "playSong",
    "click .my-button": "bookMark"
  },

  playSong: function (e) {
    e.stopPropagation();
    console.log("Song Playing");
  },
  bookMark: function () {
    console.log("Song Bookmarked");
  },
  render: function () {
    this.$el.html(this.model.get("title") + "<button>Listen</button>" + "<button class='my-button'>Bookmark</button>");
    return this;
  }
});

var mySong = new Song({
  title: "You say yes"
});

var mySongView = new SongView({
  model: mySong,
  el: "#responding-events"
});

mySongView.render();

//HANDLING MODEL CHANGES

var Song = Backbone.Model.extend({
  defaults: {
    listeners: 0
  }
});

var SongView = Backbone.View.extend({
  initialize: function () {
    this.model.on("change", this.onModelChange, this);
  },
  render: function () {
    this.$el.html(this.model.get("title") + " | Listeners " + this.model.get("listeners"));
    return this;
  },
  onModelChange : function () {
    console.log("you got a new listener");
    this.$el.addClass("alert");
    this.render();
  }
});

var happy = new Song({
  title: "Happy"
});

var happyView = new SongView({
  el: "#model-changes",
  model: happy
});

happyView.render();

//HANDLING COLLECTION EVENTS

var Post = Backbone.Model.extend();

var PostView = Backbone.View.extend({
  render: function () {
    this.$el.html(this.model.get("message"));
    return this;
  }
});

var userMessage = new Post({
  message: "Hello."
});

var messageView = new PostView({
  el: "#message",
  model: userMessage
});

messageView.render();

var PostCollection = Backbone.Collection.extend({
  model: Post
});

var userMessage2 = new Post({
  message: "Hi, how are you?."
});


var posts = [];
posts.push(userMessage);
posts.push(userMessage2);


var messageCollection = new PostCollection(posts);

var MessageCollectionView = Backbone.View.extend({
  initialize: function () {
    this.model.on("add", this.addMessage, this);
  },
  addMessage: function () {
    console.log("new message appeared");
  },
  render: function () {
    var self = this;
    this.model.each(function (messg) {
      $(self.el).append('<li>' + messg.get("message") + '</li>');
    });
  }
});

var chat = new MessageCollectionView({
  el: "#chat",
  model: messageCollection
});

chat.render();

