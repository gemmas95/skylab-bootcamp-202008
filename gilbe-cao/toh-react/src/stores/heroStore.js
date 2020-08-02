import { EventEmitter } from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _heroes = [];

class HeroStore extends EventEmitter {
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	getHeroes() {
		return _heroes;
	}

	getHeroById(id) {
		return _heroes.find((hero) => hero.id === id);
	}

	generateId() {
		return (
			_heroes.reduce((newId, hero) => (newId > hero.id ? newId : hero.id)) + 1
		);
	}
}

const heroStore = new HeroStore();
dispatcher.register((action) => {
	switch (action.type) {
		case actionTypes.LOAD_HEROES:
			_heroes = action.data;
			heroStore.emitChange(_heroes);
			break;
		case actionTypes.UPDATE_HERO:
			_heroes = [..._heroes, action.data];
			heroStore.emitChange();
			break;
		case actionTypes.CREATE_HERO:
			_heroes = [
				..._heroes,
				{ ...action.data, id: heroStore.generateId(action.data) }
			];
			heroStore.emitChange();
			break;
		case actionTypes.DELETE_HERO:
			_heroes = _heroes.filter((hero) => hero.id !== action.data.id);
			console.log(_heroes);
			heroStore.emitChange();
			break;
		default:
			break;
	}
});

export default heroStore;
