import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import heroList from '../hero.mock';
import heroStore from '../stores/heroStore';
import { loadHeroes } from '../actions/heroActions';

function HeroList() {
	const [heroes, setHeroes] = useState([]);
	useEffect(() => {
		heroStore.addChangeListener(onChange);
		if (heroes.length === 0) loadHeroes();
		return () => heroStore.removeChangeListener(onChange);
	}, [heroes.length]);

	function onChange() {
		setHeroes(heroStore.getHeroes());
	}

	return (
		<>
			<ul>
				{heroes.map((hero) => (
					<li key={hero.id}>
						<Link to={`/hero/${hero.id}`}>
							{hero.id}: {hero.name}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export default HeroList;

//<span className="id btn btn-secondary">{hero.id}</span>
//<span className="name btn btn-light">{hero.name}</span>
