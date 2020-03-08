import { expect } from "chai";
import Sut from "../../../src/ts/Mandate";

describe("Mandate", function() {
  describe("Create class instance", function() {
    it("creates a new instance", function() {
      const sut = Sut(new Date());

      expect(true).equal(true);
    });

    it("new-ups a 'now' instance with no arguments", function() {
      const sut = Sut();
      const now = new Date();

      expect(sut.format("YYYY")).equal(now.getFullYear().toString());
      expect(sut.format("M")).equal((now.getMonth() + 1).toString());
      expect(sut.format("D")).equal(now.getDate().toString());
    });

    it("new-ups a 'now' instance with an empty date", function() {
      const sut = Sut(new Date());
      const now = new Date();

      expect(sut.format("YYYY")).equal(now.getFullYear().toString());
      expect(sut.format("M")).equal((now.getMonth() + 1).toString());
      expect(sut.format("D")).equal(now.getDate().toString());
    });

    it("new-ups an instance from a western date string", function() {
      const sut = Sut("July 4, 2005");
      expect(sut.format("YYYY-MM-DD")).equal("2005-07-04");
    });
  });

  describe("basic format", function() {
    it("formats full year", function() {
      const sut = Sut(new Date(2020, 1, 1));

      expect(sut.format("YYYY")).equal("2020");
    });

    it("formats short year", function() {
      const sut = Sut(new Date(2020, 1, 1));

      expect(sut.format("YY")).equal("20");
    });

    it("formats alpha month", function() {
      const sut = Sut(new Date(2020, 9, 1));

      expect(sut.format("MMMM")).equal("October");
      expect(sut.format("MMM")).equal("Oct");
    });

    it("formats numeric month", function() {
      const sut = Sut(new Date(2020, 4, 1));

      expect(sut.format("MM")).equal("05");
      expect(sut.format("M")).equal("5");
    });

    it("formats day", function() {
      const sut = Sut(new Date(2020, 4, 8));

      expect(sut.format("DD")).equal("08");
      expect(sut.format("D")).equal("8");
    });

    it("doesn't format incorrect input", function() {
      const sut = Sut(new Date(2020, 1, 1));

      expect(sut.format("G")).equal("G");
    });
  });

  describe("complex format", function() {
    it("formats long year and short year", function() {
      const sut = Sut(new Date(2020, 1, 1));

      expect(sut.format("YYYYYY")).equal("202020");
    });

    it("formats two long years", function() {
      const sut = Sut(new Date(2020, 1, 1));

      expect(sut.format("YYYYYYYY")).equal("20202020");
    });

    it("formats full date", function() {
      const sut = Sut(new Date(1989, 2, 22));

      expect(sut.format("MMMM DD, YYYY")).equal("March 22, 1989");
    });
  });

  describe("common date format", function() {
    it("formats short western date (month/day/year)", function() {
      const sut = Sut(new Date(1989, 2, 8));

      expect(sut.format("MM/DD/YYYY")).equal("03/08/1989");
      expect(sut.format("M/D/YY")).equal("3/8/89");
    });

    it("formats long form western date month day, year", function() {
      const sut = Sut(new Date(1989, 2, 8));

      expect(sut.format("MMMM DD, YYYY")).equal("March 08, 1989");
      expect(sut.format("MMM D, YYYY")).equal("Mar 8, 1989");
    });

    it("formats ISO dates YYYY-MM-DD", function() {
      const sut = Sut(new Date(1994, 6, 4));

      expect(sut.format("YYYY-MM-DD")).equal("1994-07-04");
    });

    it("formats common nordic date (day month year)", function() {
      const sut = Sut(new Date(1989, 2, 8));

      expect(sut.format("DD MMMM YYYY")).equal("08 March 1989");
      expect(sut.format("D MMM YYYY")).equal("8 Mar 1989");
    });
  });

  describe("edge cases", function() {
    it("formats date with injected words", function() {
      const sut = Sut(new Date(1989, 2, 22));

      expect(sut.format("MMMM yeah DD, YYYYhello")).equal(
        "March yeah 22, 1989hello"
      );
    });

    it("formats date with forbidden month names", function() {
      const sut = Sut(new Date(1989, 2, 22));

      expect(sut.format("MMMM MarchMay DecemberDD, YYYY")).equal(
        "March MarchMay December22, 1989"
      );
    });
  });
});
