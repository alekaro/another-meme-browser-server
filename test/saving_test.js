const { assertAbstractType } = require("graphql");

const assert = require("assert");

const MarioChar = require("../models/mariochar");
//Describe tests
describe("Saving records", function () {
  //Create tests
  it("Saves a record to the database", function () {
    var char = new MarioChar({
      name: "Mario",
      weight: 60,
    });

    char.save().then(function () {
      assert(char.isNew === false);
    });
  });
});
