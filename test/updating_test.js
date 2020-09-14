const assert = require("assert");
const MarioChar = require("../models/mariochar");

// Describe our tests
describe("Updating records", function () {
  var char;
  // Add a character to the db before each tests
  beforeEach(function (done) {
    char = new MarioChar({
      name: "Mario",
      weight: 60,
    });
    char.save().then(function () {
      done();
    });
  });

  // Create tests
  it("Updates one record in the database", function (done) {
    MarioChar.findOneAndUpdate({ name: "Mario" }, { name: "Luigi" }).then(
      function () {
        MarioChar.findOne({ _id: char._id }).then(function (result) {
          assert(result.name === "Luigi");
          done();
        });
      }
    );
  });

  it("Increments the weight by 1", function (done) {
    MarioChar.update({}, { $inc: { weight: 1 } }).then(function () {
      MarioChar.findOne({ name: "Mario" }).then(function (record) {
        assert(record.weight === 61);
        done();
      });
    });
  });
});
