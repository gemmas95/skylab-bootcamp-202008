function DashboardComponent() {
	const anchorContainer = document.getElementById('dashboard__hero-list');
	this.onInit = function () {
		heroService
			.getHeroList()
			.then((response) => {
				return response.splice(0, 4);
			})
			.then((list) => {
				const promotedHeroArray = list.map(mapItemToAnchor);
				promotedHeroArray.forEach(addAnchorToHtml);
			});
		getHeroFromUrl();
	};

	function mapItemToAnchor(hero) {
		let transformedElement = document.createElement('a');
		transformedElement.className = 'hero-card';
		transformedElement.href =
			'../hero-detail/hero-detail.component.html?heroid=' + hero.id;
		transformedElement.innerText = hero.name;
		return transformedElement;
	}

	function addAnchorToHtml(heroAnchor) {
		if (anchorContainer) anchorContainer.appendChild(heroAnchor);
	}

	function getHeroFromUrl() {
		return heroList.find(compareHeroId);
	}

	function compareHeroId(hero) {
		const params = new URLSearchParams(location.search);
		return hero.id === +params.get('heroId');
	}
}

let dashboardComponent = new DashboardComponent();
dashboardComponent.onInit();
