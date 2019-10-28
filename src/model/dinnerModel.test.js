const assert = chai.assert;
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
        it("returns either a Promise", () => {
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
        let getDishReturnsPromise = model.getDish(1) instanceof Promise;
        let getDishReturnsObject = model.getDish(1) instanceof Object;

        if (getDishReturnsPromise) { // if it uses the spoonacular api
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

        } else if (getDishReturnsObject) { // if it uses dishesConst
            it("can add dishes", () => {
                model.addDishToMenu(model.getDish(1));
                expect(model.getFullMenu()).to.include(model.getDish(1));

                model.addDishToMenu(model.getDish(100));
                expect(model.getFullMenu()).to.include(model.getDish(1));
                expect(model.getFullMenu()).to.include(model.getDish(100));
            });

            it("can remove dishes", () => {
                model.addDishToMenu(model.getDish(1));
                // dish 1 should be in the menu
                expect(model.getFullMenu()).to.include(model.getDish(1));

                model.removeDishFromMenu(1);
                // should now be removed
                expect(model.getFullMenu()).to.not.include(model.getDish(1));
            });

            it("can find the dishes of a specific type on the menu", () => {
                model.addDishToMenu(model.getDish(1)); // starter
                model.addDishToMenu(model.getDish(2)); // starter
                model.addDishToMenu(model.getDish(100)); // main dish

                let starters = model.getSelectedDishes('starter');
                expect(starters).to.include(model.getDish(1));
                expect(starters).to.include(model.getDish(2));
                expect(starters).to.not.include(model.getDish(100));
            })
        }

    });

  describe("loading indicator", () => {
    it("checks if the loading indicator is still visible on the page", () => {
      expect(document.getElementById("loader").style.display).to.equal("none");
    });
  });
});
