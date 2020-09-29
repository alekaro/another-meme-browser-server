"use strict";
var assertAbstractType = require("graphql").assertAbstractType;
var assert = require("assert");
var MarioChar = require("../models/mariochar");
//Describe tests
describe("Saving records", function () {
    //Create tests
    it("Saves a record to the database", function (done) {
        var char = new MarioChar({
            name: "Mario",
            weight: 60,
        });
        char.save().then(function () {
            assert(char.isNew === false);
            done();
        });
    });
});
