import Bb from 'backbone';

const cities = Bb.Collection.extend({
	model: require('./../models/city'),
});

module.exports = cities;
