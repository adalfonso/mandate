import { expect } from "chai";
import Sut, { Mandate as SutClass } from "../../../src/ts/Mandate";

describe("Mandate", () => {
  const FORMAT_MS = "YYYY-MM-DD HH:mm:ss:SS";

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
    it("<", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.lt(second)).equal(true);
      expect(first.lt(first)).equal(false);
      expect(second.lt(first)).equal(false);
    });

    it("<=", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.lte(second)).equal(true);
      expect(first.lte(first)).equal(true);
      expect(second.lte(first)).equal(false);
    });

    it("==", () => {
      const first = Sut(new Date(2020, 1, 1, 0));
      const second = Sut(new Date(2020, 1, 1, 1));
      const third = Sut(new Date(2020, 1, 2, 0));

      expect(first.eq(second, false)).equal(true);
      expect(first.eq(first, false)).equal(true);
      expect(first.eq(third, false)).equal(false);
    });

    it("===", () => {
      const first = Sut(new Date(2020, 1, 1, 0));
      const second = Sut(new Date(2020, 1, 1, 1));
      const third = Sut(new Date(2020, 1, 2, 0));

      expect(first.eq(second)).equal(false);
      expect(first.eq(first)).equal(true);
      expect(first.eq(third)).equal(false);
    });

    it(">", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.gt(second)).equal(false);
      expect(first.gt(first)).equal(false);
      expect(second.gt(first)).equal(true);
    });

    it(">=", () => {
      const first = Sut(new Date(2020, 1, 1));
      const second = Sut(new Date(2020, 1, 2));

      expect(first.gte(second)).equal(false);
      expect(first.gte(first)).equal(true);
      expect(second.gte(first)).equal(true);
    });
  });

  describe("diff", () => {
    it("diffInMilliseconds", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 1, 1, 0));
      const after = Sut(new Date(2020, 1, 1, 1, 1, 1, 1));

      expect(before.diffInMilliseconds(after)).equal(1);
      expect(before.diffInMilliseconds(after, false)).equal(-1);
      expect(after.diffInMilliseconds(before)).equal(1);
    });

    it("diffInSeconds", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 1, 1, 500));
      const after = Sut(new Date(2020, 1, 1, 1, 1, 2));

      expect(before.diffInSeconds(after)).equal(0.5);
      expect(before.diffInSeconds(after, false)).equal(-0.5);
      expect(after.diffInSeconds(before)).equal(0.5);
    });

    it("diffInMinutes", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 1, 30));
      const after = Sut(new Date(2020, 1, 1, 1, 2, 0));

      expect(before.diffInMinutes(after)).equal(0.5);
      expect(before.diffInMinutes(after, false)).equal(-0.5);
      expect(after.diffInMinutes(before)).equal(0.5);
    });

    it("diffInHours", () => {
      const before = Sut(new Date(2020, 1, 1, 1, 30));
      const after = Sut(new Date(2020, 1, 1, 2, 0));

      expect(before.diffInHours(after)).equal(0.5);
      expect(before.diffInHours(after, false)).equal(-0.5);
      expect(after.diffInHours(before)).equal(0.5);
    });

    it("diffInDays", () => {
      const before = Sut(new Date(2020, 1, 1, 12));
      const after = Sut(new Date(2020, 1, 2, 0));

      expect(before.diffInDays(after)).equal(0.5);
      expect(before.diffInDays(after, false)).equal(-0.5);
      expect(after.diffInDays(before)).equal(0.5);
    });

    it("diffInWeeks", () => {
      const before = Sut(new Date(2020, 1, 1, 0));
      const after = Sut(new Date(2020, 1, 4, 12));

      expect(before.diffInWeeks(after)).equal(0.5);
      expect(before.diffInWeeks(after, false)).equal(-0.5);
      expect(after.diffInWeeks(before)).equal(0.5);
    });

    it("diffInYears", () => {
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

      it("millisecond", () => {
        [
          [new Date(2020, 4, 8, 4, 5, 1, 5), "005", "5"],
          [new Date(2020, 4, 8, 4, 5, 1, 40), "040", "40"],
          [new Date(2020, 4, 8, 4, 5, 1, 666), "666", "666"]
        ].forEach(data => {
          const sut = Sut(data[0]);

          expect(sut.format("SS")).equal(data[1]);
          expect(sut.format("S")).equal(data[2]);
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

  describe("add", () => {
    it("addMilliseconds", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2020-01-01 00:00:00:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2020-01-01 00:00:00:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 1001, "2020-01-01 00:00:01:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 60001, "2020-01-01 00:01:00:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 3600001, "2020-01-01 01:00:00:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 86400001, "2020-01-02 00:00:00:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 2678400001, "2020-02-01 00:00:00:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 31622400001, "2021-01-01 00:00:00:001"],
        [new Date(2020, 0, 1, 0, 0, 0), 63244800001, "2022-01-02 00:00:00:001"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addMilliseconds(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("addSeconds", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2020-01-01 00:00:01:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2020-01-01 00:00:01:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 61, "2020-01-01 00:01:01:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 3601, "2020-01-01 01:00:01:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 86401, "2020-01-02 00:00:01:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 2678401, "2020-02-01 00:00:01:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 31622401, "2021-01-01 00:00:01:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 63244801, "2022-01-02 00:00:01:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addSeconds(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("addMinutes", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2020-01-01 00:01:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2020-01-01 00:01:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 61, "2020-01-01 01:01:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1441, "2020-01-02 00:01:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 44641, "2020-02-01 00:01:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 527041, "2021-01-01 00:01:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1054081, "2022-01-02 00:01:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addMinutes(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("addHours", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2020-01-01 01:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2020-01-01 01:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 25, "2020-01-02 01:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 745, "2020-02-01 01:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 8785, "2021-01-01 01:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 17569, "2022-01-02 01:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addHours(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("addDays", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2020-01-02 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2020-01-02 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 31, "2020-02-01 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 366, "2021-01-01 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 732, "2022-01-02 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addDays(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("addWeeks", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2020-01-08 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2020-01-08 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 5, "2020-02-05 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 52, "2020-12-30 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 53, "2021-01-06 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 105, "2022-01-05 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addWeeks(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("addMonths", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2020-02-01 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2020-02-01 00:00:00:000"],
        [new Date(2020, 0, 31, 0, 0, 0), 1, "2020-03-02 00:00:00:000"],
        [new Date(2021, 0, 31, 0, 0, 0), 1, "2021-03-03 00:00:00:000"],
        [new Date(2021, 0, 1, 0, 0, 0), 12, "2022-01-01 00:00:00:000"],
        [new Date(2020, 0, 31, 0, 0, 0), 13, "2021-03-03 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 24, "2022-01-01 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addMonths(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("addYears", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 0), undefined, "2021-01-01 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 0), 1, "2021-01-01 00:00:00:000"],
        [new Date(2020, 0, 31, 0, 0, 0), 1, "2021-01-31 00:00:00:000"],
        [new Date(2020, 1, 29, 0, 0, 0), 1, "2021-03-01 00:00:00:000"],
        [new Date(2020, 1, 29, 0, 0, 0), 2, "2022-03-01 00:00:00:000"],
        [new Date(2020, 1, 29, 0, 0, 0), 4, "2024-02-29 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.addYears(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });
  });

  describe("sub", () => {
    it("subMilliseconds", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 1), undefined, "2020-01-01 00:00:00:999"],
        [new Date(2020, 0, 1, 0, 0, 2), 1, "2020-01-01 00:00:01:999"],
        [new Date(2020, 0, 1, 0, 0, 4), 1001, "2020-01-01 00:00:02:999"],
        [new Date(2020, 0, 1, 0, 1, 4), 60001, "2020-01-01 00:00:03:999"],
        [new Date(2020, 0, 1, 1, 0, 5), 3600001, "2020-01-01 00:00:04:999"],
        [new Date(2020, 0, 2, 0, 0, 6), 86400001, "2020-01-01 00:00:05:999"],
        [new Date(2020, 1, 1, 0, 0, 7), 2678400001, "2020-01-01 00:00:06:999"],
        [new Date(2021, 0, 1, 0, 0, 8), 31622400001, "2020-01-01 00:00:07:999"],
        [new Date(2022, 0, 1, 0, 0, 9), 63244800001, "2019-12-31 00:00:08:999"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subMilliseconds(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("subSeconds", () => {
      [
        [new Date(2020, 0, 1, 0, 0, 1), undefined, "2020-01-01 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 0, 2), 1, "2020-01-01 00:00:01:000"],
        [new Date(2020, 0, 1, 0, 1, 3), 61, "2020-01-01 00:00:02:000"],
        [new Date(2020, 0, 1, 1, 0, 4), 3601, "2020-01-01 00:00:03:000"],
        [new Date(2020, 0, 2, 0, 0, 5), 86401, "2020-01-01 00:00:04:000"],
        [new Date(2020, 1, 1, 0, 0, 6), 2678401, "2020-01-01 00:00:05:000"],
        [new Date(2021, 0, 1, 0, 0, 7), 31622401, "2020-01-01 00:00:06:000"],
        [new Date(2022, 0, 1, 0, 0, 8), 63244801, "2019-12-31 00:00:07:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subSeconds(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("subMinutes", () => {
      [
        [new Date(2020, 0, 1, 0, 1, 0), undefined, "2020-01-01 00:00:00:000"],
        [new Date(2020, 0, 1, 0, 2, 0), 1, "2020-01-01 00:01:00:000"],
        [new Date(2020, 0, 1, 1, 3, 0), 61, "2020-01-01 00:02:00:000"],
        [new Date(2020, 0, 2, 0, 4, 0), 1441, "2020-01-01 00:03:00:000"],
        [new Date(2020, 1, 1, 0, 5, 0), 44641, "2020-01-01 00:04:00:000"],
        [new Date(2021, 0, 1, 0, 6, 0), 527041, "2020-01-01 00:05:00:000"],
        [new Date(2022, 0, 1, 0, 7, 0), 1054081, "2019-12-31 00:06:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subMinutes(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("subHours", () => {
      [
        [new Date(2020, 0, 1, 1, 0, 0), undefined, "2020-01-01 00:00:00:000"],
        [new Date(2020, 0, 1, 2, 0, 0), 1, "2020-01-01 01:00:00:000"],
        [new Date(2020, 0, 2, 3, 0, 0), 25, "2020-01-01 02:00:00:000"],
        [new Date(2020, 1, 1, 4, 0, 0), 745, "2020-01-01 03:00:00:000"],
        [new Date(2021, 0, 1, 5, 0, 0), 8785, "2020-01-01 04:00:00:000"],
        [new Date(2022, 0, 1, 6, 0, 0), 17569, "2019-12-31 05:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subHours(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("subDays", () => {
      [
        [new Date(2020, 0, 2, 0, 0, 0), undefined, "2020-01-01 00:00:00:000"],
        [new Date(2020, 0, 3, 0, 0, 0), 1, "2020-01-02 00:00:00:000"],
        [new Date(2020, 1, 4, 0, 0, 0), 31, "2020-01-04 00:00:00:000"],
        [new Date(2021, 0, 5, 0, 0, 0), 366, "2020-01-05 00:00:00:000"],
        [new Date(2024, 0, 6, 0, 0, 0), 732, "2022-01-04 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subDays(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("subWeeks", () => {
      [
        [new Date(2021, 0, 8, 0, 0, 0), undefined, "2021-01-01 00:00:00:000"],
        [new Date(2022, 0, 8, 0, 0, 0), 1, "2022-01-01 00:00:00:000"],
        [new Date(2023, 0, 8, 0, 0, 0), 5, "2022-12-04 00:00:00:000"],
        [new Date(2025, 0, 1, 0, 0, 0), 52, "2024-01-03 00:00:00:000"],
        [new Date(2027, 0, 8, 0, 0, 0), 53, "2026-01-02 00:00:00:000"],
        [new Date(2029, 0, 8, 0, 0, 0), 105, "2027-01-04 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subWeeks(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("subMonths", () => {
      [
        [new Date(2020, 1, 1, 0, 0, 0), undefined, "2020-01-01 00:00:00:000"],
        [new Date(2020, 1, 1, 0, 0, 0), 1, "2020-01-01 00:00:00:000"],
        [new Date(2020, 2, 31, 0, 0, 0), 1, "2020-03-02 00:00:00:000"],
        [new Date(2021, 2, 31, 0, 0, 0), 1, "2021-03-03 00:00:00:000"],
        [new Date(2021, 0, 1, 0, 0, 0), 12, "2020-01-01 00:00:00:000"],
        [new Date(2021, 2, 31, 0, 0, 0), 13, "2020-03-02 00:00:00:000"],
        [new Date(2022, 0, 1, 0, 0, 0), 24, "2020-01-01 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subMonths(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });

    it("subYears", () => {
      [
        [new Date(2021, 0, 1, 0, 0, 0), undefined, "2020-01-01 00:00:00:000"],
        [new Date(2021, 0, 1, 0, 0, 0), 1, "2020-01-01 00:00:00:000"],
        [new Date(2021, 0, 31, 0, 0, 0), 1, "2020-01-31 00:00:00:000"],
        [new Date(2020, 1, 29, 0, 0, 0), 1, "2019-03-01 00:00:00:000"],
        [new Date(2022, 1, 29, 0, 0, 0), 2, "2020-03-01 00:00:00:000"],
        [new Date(2020, 1, 29, 0, 0, 0), 4, "2016-02-29 00:00:00:000"]
      ].forEach((data: [Date, number, string]) => {
        let sut = Sut(data[0]);

        expect(sut.subYears(data[1]).format(FORMAT_MS)).equal(data[2]);
      });
    });
  });

  describe("static methods", () => {
    it("prefixZero", () => {
      [
        [2, undefined, "02"],
        [20, undefined, "20"],
        [2, 3, "002"],
        [20, 3, "020"]
      ].forEach((data: [number, number, string]) => {
        expect(SutClass.prefixZero(data[0], data[1])).equal(data[2]);
      });
    });
  });
});
