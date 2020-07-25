describe("Skylaber List", function () {
    let skylaberList;
    let skylaberListComponent;
    beforeEach(function () {
        skylaberListComponent = new SkylaberListComponent();
    })
    it("should create a skylaber list", function () {
        const id = 14;
        let name = "Celeritas";
        skylaberList = { id, name };
        expect(skylaberList.id).toBe(skylaberList.name);
    });
    it("should called onInit and behave properly", function () {
        const spy = spyOn(skylaberListComponent, "onInit");
        skylaberListComponent.onInit();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });
    /*     it("should called createButtonsList and behave properly", function () {
            const spy = spyOn(skylaberListComponent.onInit, "createButtonsList");
            expect(spy).toHaveBeenCalled();
        }) */
});