function HeroListComponent() {
    let mainContainerList = document.querySelector("#mainContainer--list");
    let createButtonsList = function () {
        for (let i = 0; i < heroList.length; i++) {
            let itemsList = document.createElement("button");
            itemsList.innerHTML = "<span class=id>" + heroList[i].id + "</span>" + "<span class=name>" + heroList[i].name + "</span>";
            itemsList.addEventListener("click", () => {
                window.location.assign(`../hero-detail/hero-detail.component.html?heroId=${heroList[i].id}`);
            })
            mainContainerList.appendChild(itemsList);
        };
    }


    /*     let sercherList = function (anchorContainer) {
            for (let i = 0; i < anchorContainer.length; i++) {
                let anchorListContainer = document.createElement("a");
                anchorListContainer.href = gethref(heroList[i].id);
                anchorContainer[i].appendChild(anchorListContainer);
    
            }
        } */
    /* 
        function gethref(id) {
            return `../hero-detail/hero-detail.component.html?heroId=${id}`
        }*/
    createButtonsList()
/*     sercherList(anchorContainer)
 */}
let listComponent = new HeroListComponent();
