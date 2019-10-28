const expect = chai.expect;

describe("DinnerModel", () => {
  let model = new DinnerModel();

  beforeEach(() => {
    model = new DinnerModel();
  });

  // TODO Lab 1: write a test to verify that the number of guests cannot be less than 1.
  // If setNumberOfGuests(num) is called with num <= 0, then then number of guests should be set to 1.

  describe("all the functions are present", () => {
    it("contains all the default functions", () => {
      let functions = [
        model.setNumberOfGuests,
        model.getNumberOfGuests,
        model.getSelectedDishes,
        model.getFullMenu,
        model.getAllIngredients,
        model.getTotalMenuPrice,
        model.addDishToMenu,
        model.removeDishFromMenu,
        model.getAllDishes,
        model.getDish
      ];
      functions.forEach(func => expect(typeof func).to.equal('function'));
    })
  });

  describe("number of guests", () => {
    it("can set and get number of guests", () => {
      model.setNumberOfGuests(500);
      expect(model.getNumberOfGuests()).to.equal(500);

      model.setNumberOfGuests(1);
      expect(model.getNumberOfGuests()).to.equal(1);
    });
  });

  describe("getting individual dishes", () => {
    it("returns a Promise", () => {
      let getDishReturnsPromise = model.getDish(1) instanceof Promise;
      expect(getDishReturnsPromise).to.equal(true);
    });

    it('dishesConst is removed', () => {
      expect(typeof dishesConst).to.equal('undefined');
    });

    it('the apiConfig is correctly configured', () => {
      expect(typeof ENDPOINT).to.equal('string');
      expect(ENDPOINT).to.not.equal('');
      expect(typeof API_KEY).to.equal('string');
      expect(API_KEY).to.not.equal('');
    });

    it("gets the correct dish", (done) => {
      model.getDish(559251)
          .then((data) => {
            expect(data.title).to.equal("Breakfast Pizza");
            done();
          });
    }).timeout(10000);

    it("returns undefined if dish is not found", (done) => {
      model.getDish(-1)
          .then((data) => {
            expect(data.code).to.equal(404);
            done();
          });
    }).timeout(10000);
  });

  describe("filtering for dishes", () => {
    it("returns a Promise", () => {
      let getAllDishesReturnsPromise = model.getAllDishes() instanceof Promise;
      expect(getAllDishesReturnsPromise).to.equal(true);
    });

    it("returns all dishes if no args are specified", (done) => {
      model.getAllDishes()
          .then((data) => {
            expect(data.length).to.equal(10);
            done();
          });
    }).timeout(10000);

    it("returns the correct dish type of main course and pizza", (done) => {
      model.getAllDishes("main course", "pizza")
          .then((data) => {
            const onlyHasPizzas = data.every(dish => dish.title.toLowerCase().indexOf("pizza") > -1);
            expect(onlyHasPizzas).to.equal(true);
            done();
          });
    }).timeout(10000);
  });

  describe("menu", () => {
      it("can add dishes", (done) => {
        model.getDish(559251)
            .then((data) => {
              model.addDishToMenu(data);
              expect(model.getFullMenu().length).to.equal(1);
              expect(model.getFullMenu()[0].id).to.equal(559251);
              done();
            });
      }).timeout(10000);

      it("can remove dishes", (done) => {
        model.getDish(559251)
            .then((data) => {
              model.addDishToMenu(data);
              expect(model.getFullMenu().length).to.equal(1);
              expect(model.getFullMenu()[0].id).to.equal(559251);

              model.removeDishFromMenu(559251);
              expect(model.getFullMenu().length).to.equal(0);
              expect(model.getFullMenu()).to.not.include(data);
              done();
            });
      }).timeout(10000);

      it("can find the dishes of a specific type on the menu", (done) => {
        model.getDish(559251)
            .then((data) => {
              model.addDishToMenu(data);
              expect(model.getFullMenu().length).to.equal(1);
              expect(model.getFullMenu()[0].id).to.equal(559251);

              model.removeDishFromMenu(559251);
              expect(model.getFullMenu().length).to.equal(0);
              expect(model.getFullMenu()).to.not.include(data);
              done();
            });
      }).timeout(10000);
  });

  describe("loading indicator", () => {
    it("checks if the loading indicator is still visible on the page", () => {
      expect(document.querySelector("#loader").style.display).to.equal("none");
    });
  });
});
