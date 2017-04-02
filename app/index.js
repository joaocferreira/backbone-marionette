import Mn from 'backbone.marionette';
import Bb from 'backbone';
import citiesCollection from './collections/cities';
import cityModel from './models/city';
import cities from './cities';

const size = cities.cities.length - 1;
const titleOut = ":( I miss you";
let titleIn = document.title;
let idx = 0;

document.addEventListener('visibilitychange', () => {

  if (document.hidden) {
  	titleIn = document.title;
    document.title = titleOut;
  } else {
    document.title = titleIn;
  }
});

const CityView = Mn.View.extend({
	tagName: 'div',
  template: require('./templates/city.html'),
  onBeforeRender: function() {
  	const city = cities.cities[idx];
  	document.title= city.title;
  	this.model = new cityModel(city)
  }

});

const CitiesView = Mn.View.extend({
	el: '#app',
  template: require('./templates/carousel.html'),
  regions: {
  	city: '#city'
  },
  ui: {
    previous: '#previous',
    next: '#next'
  },
  events: {
  	'click @ui.previous': 'changeCity',
  	'click @ui.next': 'changeCity',
  },
  changeCity: function(event) {
  	event.target.id === 'next' ? idx++ : idx--;
	  const previous = this.getUI('previous');
		const next = this.getUI('next');

  	switch (idx) {
  		case 0:
	    	previous
	    		.addClass('button--disabled')
	    		.attr('disabled', 'disabled');
	    	break;
	    case 1:
	    	previous
	    		.removeClass('button--disabled')
	    		.removeAttr('disabled');
	    	break;
  		case (size - 1):
	    	next
	    		.removeClass('button--disabled')
	    		.removeAttr('disabled');
	    	break;
	    case size:
	    	next
	    		.addClass('button--disabled')
	    		.attr('disabled', 'disabled');
	    	break;
  	}
  	this.getChildView('city').render()
  },
  onRender: function() {
  	this.showChildView('city', new CityView());
  }
});

const app = new CitiesView();

app.render();
