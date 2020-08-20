const express = require('express');
const debug = require('debug')('app:authRoutes');
const { MongoClient } = require('mongodb');
const MONGODB = require('../../public/Persitance/mongoConst');
const passport = require('passport');

const authRoutes = express.Router();

function router(nav) {
	authRoutes
		.route('/signin')
		.post(
			passport.authenticate('local', {
				successRedirect: '/auth/profile',
				failureRedirect: '/auth/signin'
			})
		)
		.get((req, res) => {
			res.render('auth/signin', { nav, title: 'Sign In' });
		});

	authRoutes
		.route('/signup')
		.get((req, res) => {
			res.render('auth/signUp', {
				title: 'Sign Up',
				nav
			});
		})
		.post((req, res) => {
			const { userName, userPassword } = req.body;
			debug(`Data: ${userName} : ${userPassword}`);

			(async function mongo() {
				try {
					const client = await MongoClient.connect(MONGODB.url);
					const db = client.db(MONGODB.dbName);
					const collection = db.collection(MONGODB.usersCollection);

					const checkUser = await collection.findOne({
						userName
					});

					if (!checkUser) {
						const response = await collection.insertOne({
							userName,
							password: userPassword
						});
						req.login(response.ops[0], () => {
							res.redirect('/auth/profile');
						});
					} else {
						debug('User already exists');
						res.redirect('/auth/signin');
					}

					client.close();
				} catch (error) {
					debug(error.stack);
				}
			})();
		});

	authRoutes
		.route('/profile')
		.all((req, res, next) => {
			if (req.user) {
				next();
			} else {
				res.redirect('/auth/signin');
			}
		})
		.get((req, res) => {
			debug(req.user);
			res.render('auth/profile', {
				nav,
				user: req.user
			});
		});

	authRoutes
		.route('/logout')
		.all((req, res, next) => {
			if (req.user) {
				next();
			} else {
				res.redirect('/auth/signin');
			}
		})
		.get((req, res) => {
			res.render('auth/profile', { nav, user: req.user });
		});
	return authRoutes;
}

module.exports = router;
