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
    "click": "onClick"
  },

  onCLick: function () {
    console.log("hello this");
  },

  render: function () {
    this.$el.html(this.model.get("title") + "<button>Listen</button>");
    return this;
  }
});

var mySong = new Song({
  title: "Hello Hello"
});

var mySongView = new SongView({
  model: mySong,
  el: "#responding-events"
});

mySongView.render();

