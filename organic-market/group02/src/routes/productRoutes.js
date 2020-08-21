const express = require('express');
const debug = require('debug')('app:heroRoutes');
const { MongoClient, ObjectID } = require('mongodb');
const path = require('path');
const DATABASE_CONFIG = require("../database/DATABASE_CONFIG");
const ROUTES = require('./ROUTES');

const productRoutes = express.Router();

function router(nav) {
	productRoutes
		.route('/')
		.post((req, res) => {
			(async function deleteProductFromList() {
				let client;
				try {
					const { deleteProduct } = req.body;
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const collection = db.collection(DATABASE_CONFIG.productCollection);

					await collection.deleteOne({ _id: new ObjectID(deleteProduct) });
					res.redirect(ROUTES.products.path);
				} catch (error) {
					debug(error.stack);
				}
			})();
		})
		.get((req, res) => {
			(async function getAllProducts() {
				let client;
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
<<<<<<< HEAD
<<<<<<< HEAD
					const colection = db.collection(DATABASE_CONFIG.productCollection);
					const heroes = await colection.find().sort({ name: 1 }).toArray();
||||||| cdceebcd
					const colection = db.collection(DATABASE_CONFIG.heroCollection);
					const heroes = await colection.find().sort({ name: 1 }).toArray();
=======
||||||| merged common ancestors
<<<<<<<<< Temporary merge branch 1
					const colection = db.collection(DATABASE_CONFIG.productCollection);
					const heroes = await colection.find().sort({ name: 1 }).toArray();
||||||||| cdceebcd
					const colection = db.collection(DATABASE_CONFIG.heroCollection);
					const heroes = await colection.find().sort({ name: 1 }).toArray();
=========
=======
>>>>>>> db92ba6cd0fba41b83d7576d2a33cb0fd2de2272
					const colection = db.collection(DATABASE_CONFIG.productCollection);

					const products = await colection.find().sort({ name: 1 }).toArray();
<<<<<<< HEAD
>>>>>>> ee83037b844d7cd7dd9a08fa3549d19afbde368e
||||||| merged common ancestors
>>>>>>>>> Temporary merge branch 2
=======
>>>>>>> db92ba6cd0fba41b83d7576d2a33cb0fd2de2272

					res.render('index', {
						nav,
						body: ROUTES.products.page,
						title: ROUTES.products.title,
						products,
						ROUTES
					});
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		});

	productRoutes
		.route('/create')
		.all((req, res, next) => {
			if (req.user) {
				next();
			} else {
				res.redirect(ROUTES.signin.path);
			}
		})
		.post((req, res) => {
			let client;
			(async function createHero() {
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const collection = db.collection(DATABASE_CONFIG.productCollection);
					const objectWithGreatestId = await collection.find().sort({ id: -1 }).limit(1).toArray();
					const newId = objectWithGreatestId[0].id + 1;
					const { createHeroWithName } = req.body;
					const sluggedName = createHeroWithName.replace(/\s/g, '-');
					const newSlug = `${newId}-${sluggedName}`;
					await collection.insertOne({ id: newId, name: createHeroWithName, slug: newSlug }, (error, response) => {
						if (error) { throw error }
						res.redirect(`/heroes/${newSlug}`);
					});
					debug(req.body);
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		})
		.get((req, res) => {
			res.render('index', {
				nav,
				body: ROUTES.hero.page,
				title: ROUTES.hero.title,
				hero: res.hero,
				ROUTES
			});
		});

	productRoutes
		.route('/:productId')
		.all((req, res, next) => {
			if (req.user) {
				const { productId } = req.params;
				(async function getProduct() {
					let client;
					try {
						client = await MongoClient.connect(DATABASE_CONFIG.url);
						debug('Connection to db established...');
						const db = client.db(DATABASE_CONFIG.dbName);
						const collection = db.collection(DATABASE_CONFIG.productCollection);
						res.hero = await collection.findOne({ _id: productId });
						debug(res.hero);
						next();
					} catch (error) {
						debug(error.stack);
					}
					debug('Connection to db closed.');
					client.close();
				})();
				next();
			} else {
				res.redirect(ROUTES.signin.path);
			}
		})
		.post((req, res) => {
			const updateQuery = { $set: req.body };
			const { productId } = req.params;
			const filter = { _id: productId };
			let client;
			(async function editHero() {
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const collection = db.collection(DATABASE_CONFIG.productCollection);
					collection.updateOne(filter, updateQuery, (error, response) => {
						if (error) { throw error }
						debug(response);
						res.redirect(ROUTES.heroes.path);
					});
					debug(req.body);
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		})
		.get((req, res) => {
			res.render('index', {
				nav,
				body: ROUTES.hero.page,
				title: ROUTES.hero.title,
				hero: res.hero,
				ROUTES
			});
		});

	return productRoutes;
}

module.exports = router;
