import { expect } from "chai";
import Sut from "../../../src/ts/Mandate";

describe("Mandate", () => {
  describe("Create class instance", () => {
    it("creates a new instance", () => {
      const sut = Sut(new Date());

      expect(true).equal(true);
    });

    it("new-ups a 'now' instance with no arguments", () => {
      const sut = Sut();
      const now = new Date();

      expect(sut.format("YYYY")).equal(now.getFullYear().toString());
      expect(sut.format("M")).equal((now.getMonth() + 1).toString());
      expect(sut.format("D")).equal(now.getDate().toString());
    });

    it("new-ups a 'now' instance with an empty date", () => {
      const sut = Sut(new Date());
      const now = new Date();

      expect(sut.format("YYYY")).equal(now.getFullYear().toString());
      expect(sut.format("M")).equal((now.getMonth() + 1).toString());
      expect(sut.format("D")).equal(now.getDate().toString());
    });

    it("new-ups an instance from a western date string", () => {
      const sut = Sut("July 4, 2005 7:22 pm");
      expect(sut.format("YYYY-MM-DD HH:mm")).equal("2005-07-04 19:22");
    });

    it("new-ups an instance from a Mandate instance", () => {
      const sut = Sut(new Date(2020, 1, 1, 1, 1, 1, 1));
      const copied = Sut(sut);

      expect(sut.eq(copied, false)).equal(true);
    });
  });

  describe("compare", () => {
    it("compares lt", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.lt(second)).equal(true);
      expect(first.lt(first)).equal(false);
      expect(second.lt(first)).equal(false);
    });

    it("compares lte", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.lte(second)).equal(true);
      expect(first.lte(first)).equal(true);
      expect(second.lte(first)).equal(false);
    });

    it("compares eq loosly", () => {
      const first = Sut(new Date(2020, 1, 1, 0));
      const second = Sut(new Date(2020, 1, 1, 1));
      const third = Sut(new Date(2020, 1, 2, 0));

      expect(first.eq(second, false)).equal(true);
      expect(first.eq(first, false)).equal(true);
      expect(first.eq(third, false)).equal(false);
    });

    it("compares eq precisely", () => {
      const first = Sut(new Date(2020, 1, 1, 0));
      const second = Sut(new Date(2020, 1, 1, 1));
      const third = Sut(new Date(2020, 1, 2, 0));

      expect(first.eq(second)).equal(false);
      expect(first.eq(first)).equal(true);
      expect(first.eq(third)).equal(false);
    });

    it("compares gt", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.gt(second)).equal(false);
      expect(first.gt(first)).equal(false);
      expect(second.gt(first)).equal(true);
    });

    it("compares gte", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.gte(second)).equal(false);
      expect(first.gte(first)).equal(true);
      expect(second.gte(first)).equal(true);
    });
  });

  describe("diff", () => {
    it("gets diff in milliseconds", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 1, 1, 0));
      const after = Sut(new Date(2020, 1, 1, 1, 1, 1, 1));

      expect(before.diffInMilliseconds(after)).equal(1);
      expect(before.diffInMilliseconds(after, false)).equal(-1);
      expect(after.diffInMilliseconds(before)).equal(1);
    });

    it("gets diff in seconds", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 1, 1, 500));
      const after = Sut(new Date(2020, 1, 1, 1, 1, 2));

      expect(before.diffInSeconds(after)).equal(0.5);
      expect(before.diffInSeconds(after, false)).equal(-0.5);
      expect(after.diffInSeconds(before)).equal(0.5);
    });

    it("gets diff in minutes", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 1, 30));
      const after = Sut(new Date(2020, 1, 1, 1, 2, 0));

      expect(before.diffInMinutes(after)).equal(0.5);
      expect(before.diffInMinutes(after, false)).equal(-0.5);
      expect(after.diffInMinutes(before)).equal(0.5);
    });

    it("gets diff in hours", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 30));
      const after = Sut(new Date(2020, 1, 1, 2, 0));

      expect(before.diffInHours(after)).equal(0.5);
      expect(before.diffInHours(after, false)).equal(-0.5);
      expect(after.diffInHours(before)).equal(0.5);
    });

    it("gets diff in days", () => {
      const before = Sut(new Date(2020, 1, 1, 12));
      const after = Sut(new Date(2020, 1, 2, 0));

      expect(before.diffInDays(after)).equal(0.5);
      expect(before.diffInDays(after, false)).equal(-0.5);
      expect(after.diffInDays(before)).equal(0.5);
    });

    it("gets diff in weeks", () => {
      const before = Sut(new Date(2020, 1, 1, 0));
      const after = Sut(new Date(2020, 1, 4, 12));

      expect(before.diffInWeeks(after)).equal(0.5);
      expect(before.diffInWeeks(after, false)).equal(-0.5);
      expect(after.diffInWeeks(before)).equal(0.5);
    });

    it("gets diff in years", () => {
      const before = Sut(new Date(2021, 0, 0, 0));
      const after = Sut(new Date(2022, 0, 0, 0));

      expect(before.diffInYears(after)).equal(1);
      expect(before.diffInYears(after, false)).equal(-1);
      expect(after.diffInYears(before)).equal(1);
    });
  });

  describe("format", () => {
    describe("basic", () => {
      it("year (full)", () => {
        const sut = Sut(new Date(2020, 1, 1));

        expect(sut.format("YYYY")).equal("2020");
      });

      it("year (short)", () => {
        const sut = Sut(new Date(2020, 1, 1));

        expect(sut.format("YY")).equal("20");
      });

      it("month (alpha)", () => {
        [
          ["January", "Jan"],
          ["February", "Feb"],
          ["March", "Mar"],
          ["April", "Apr"],
          ["May", "May"],
          ["June", "Jun"],
          ["July", "Jul"],
          ["August", "Aug"],
          ["September", "Sep"],
          ["October", "Oct"],
          ["November", "Nov"],
          ["December", "Dec"]
        ].forEach((output, input) => {
          const sut = Sut(new Date(2020, input, 1));

          expect(sut.format("MMMM")).equal(output[0]);
          expect(sut.format("MMM")).equal(output[1]);
        });
      });

      it("month (numeric)", () => {
        [
          [new Date(2020, 0, 1), "01", "1"],
          [new Date(2020, 9, 1), "10", "10"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("MM")).equal(data[1]);
          expect(sut.format("M")).equal(data[2]);
        });
      });

      it("date", () => {
        [
          [new Date(2020, 4, 1), "01", "1"],
          [new Date(2020, 4, 10), "10", "10"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("DD")).equal(data[1]);
          expect(sut.format("D")).equal(data[2]);
        });
      });

      it("ordinal date", () => {
        [
          [1, "1st"],
          [2, "2nd"],
          [3, "3rd"],
          [4, "4th"],
          [5, "5th"],
          [6, "6th"],
          [7, "7th"],
          [8, "8th"],
          [9, "9th"],
          [10, "10th"]
        ].forEach((data: [number, string]) => {
          const sut = Sut(new Date(2020, 0, data[0]));

          expect(sut.format("Do")).equal(data[1]);
        });
      });

      it("24-hour", () => {
        [
          [new Date(2020, 4, 8, 4, 5, 3), "04", "4"],
          [new Date(2020, 4, 8, 0, 5, 3), "00", "0"],
          [new Date(2020, 4, 8, 13, 5, 3), "13", "13"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("HH")).equal(data[1]);
          expect(sut.format("H")).equal(data[2]);
        });
      });

      it("12-hour", () => {
        [
          [new Date(2020, 4, 8, 4, 5, 3), "04", "4"],
          [new Date(2020, 4, 8, 0, 5, 3), "12", "12"],
          [new Date(2020, 4, 8, 13, 5, 3), "01", "1"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("hh")).equal(data[1]);
          expect(sut.format("h")).equal(data[2]);
        });
      });

      it("am/pm", () => {
        [
          [new Date(2020, 4, 8, 4, 5, 3), "am", "AM"],
          [new Date(2020, 4, 8, 0, 5, 3), "am", "AM"],
          [new Date(2020, 4, 8, 13, 5, 3), "pm", "PM"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("a")).equal(data[1]);
          expect(sut.format("A")).equal(data[2]);
        });
      });

      it("minute", () => {
        [
          [new Date(2020, 4, 8, 4, 5, 3), "05", "5"],
          [new Date(2020, 4, 8, 4, 55, 3), "55", "55"],
          [new Date(2020, 4, 8, 13, 60, 3), "00", "0"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("mm")).equal(data[1]);
          expect(sut.format("m")).equal(data[2]);
        });
      });

      it("second", () => {
        [
          [new Date(2020, 4, 8, 4, 5, 3), "03", "3"],
          [new Date(2020, 4, 8, 4, 5, 10), "10", "10"],
          [new Date(2020, 4, 8, 4, 5, 60), "00", "0"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("ss")).equal(data[1]);
          expect(sut.format("s")).equal(data[2]);
        });
      });

      it("doesn't format incorrect input", () => {
        const sut = Sut(new Date(2020, 1, 1));

        expect(sut.format("G")).equal("G");
      });
    });

    describe("complex", () => {
      it("long year and short year", () => {
        const sut = Sut(new Date(2020, 1, 1));

        expect(sut.format("YYYYYY")).equal("202020");
      });

      it("two long years", () => {
        const sut = Sut(new Date(2020, 1, 1));

        expect(sut.format("YYYYYYYY")).equal("20202020");
      });

      it("full date", () => {
        const sut = Sut(new Date(1989, 2, 22));

        expect(sut.format("MMMM DD, YYYY")).equal("March 22, 1989");
      });
    });

    describe("common date", () => {
      it("date string", () => {
        let sut = Sut(new Date(2020, 1, 1));
        expect(sut.toDateString()).equal("2020-02-01");
      });

      it("datetime string", () => {
        let sut = Sut(new Date(2020, 1, 1, 12, 34, 56));
        expect(sut.toDateTimeString()).equal("2020-02-01 12:34:56");
      });

      it("western date string", () => {
        let sut = Sut(new Date(2020, 1, 1));
        expect(sut.toWestern()).equal("February 1st, 2020");
      });

      it("european date string", () => {
        let sut = Sut(new Date(2020, 1, 1));
        expect(sut.toEuro()).equal("1 February 2020");
      });

      it("unix", () => {
        let sut = Sut(new Date(2020, 1, 1));
        expect(sut.toUnix()).equal(1580533200);
      });

      it("unix ms", () => {
        let sut = Sut(new Date(2020, 1, 1));
        expect(sut.toUnixMs()).equal(1580533200000);
      });

      it("formats short western date (month/day/year)", () => {
        const sut = Sut(new Date(1989, 2, 8));

        expect(sut.format("MM/DD/YYYY")).equal("03/08/1989");
        expect(sut.format("M/D/YY")).equal("3/8/89");
      });

      it("long form western date (month day, year)", () => {
        const sut = Sut(new Date(1989, 2, 8));

        expect(sut.format("MMMM DD, YYYY")).equal("March 08, 1989");
        expect(sut.format("MMM D, YYYY")).equal("Mar 8, 1989");
      });

      it("ISO date (YYYY-MM-DD HH:mm:ss)", () => {
        const sut = Sut(new Date(1994, 6, 4, 14, 5, 8));

        expect(sut.format("YYYY-MM-DD HH:mm:ss")).equal("1994-07-04 14:05:08");
      });

      it("common euro date (day month year)", () => {
        const sut = Sut(new Date(1989, 2, 8));

        expect(sut.format("DD MMMM YYYY")).equal("08 March 1989");
        expect(sut.format("D MMM YYYY")).equal("8 Mar 1989");
      });

      it("12 hour time (h:m:s a)", () => {
        const sut = Sut(new Date(1989, 2, 8, 15, 45, 22));

        expect(sut.format("h:m:ss a")).equal("3:45:22 pm");
      });
    });
  });
});
