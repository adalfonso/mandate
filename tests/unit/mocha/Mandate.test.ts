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

            const sut2 = Sut(new Date(2020, 10, 1));

            expect(sut2.format("MM")).equal("11");
            expect(sut2.format("M")).equal("11");
        });

        it("formats day", function() {
            const sut = Sut(new Date(2020, 4, 8));

            expect(sut.format("DD")).equal("08");
            expect(sut.format("D")).equal("8");

            const sut2 = Sut(new Date(2020, 4, 15));

            expect(sut2.format("DD")).equal("15");
            expect(sut2.format("D")).equal("15");
        });

        it("formats 24 hours", function() {
            const sut = Sut(new Date(2020, 4, 8, 4, 5, 3));

            expect(sut.format("HH")).equal("04");
            expect(sut.format("H")).equal("4");

            const sut2 = Sut(new Date(2020, 4, 8, 0, 5, 3));

            expect(sut2.format("HH")).equal("00");
            expect(sut2.format("H")).equal("0");

            const sut3 = Sut(new Date(2020, 4, 8, 13, 5, 3));

            expect(sut3.format("HH")).equal("13");
            expect(sut3.format("H")).equal("13");
        });

        it("formats 12 hours", function() {
            const sut = Sut(new Date(2020, 4, 8, 4, 5, 3));

            expect(sut.format("hh")).equal("04");
            expect(sut.format("h")).equal("4");

            const sut2 = Sut(new Date(2020, 4, 8, 0, 5, 3));

            expect(sut2.format("hh")).equal("12");
            expect(sut2.format("h")).equal("12");

            const sut3 = Sut(new Date(2020, 4, 8, 13, 5, 3));

            expect(sut3.format("hh")).equal("01");
            expect(sut3.format("h")).equal("1");
        });

        it("formats ante and post meridiem", function() {
            const sut = Sut(new Date(2020, 4, 8, 4, 5, 3));

            expect(sut.format("a")).equal("am");
            expect(sut.format("A")).equal("AM");

            const sut2 = Sut(new Date(2020, 4, 8, 0, 5, 3));

            expect(sut2.format("a")).equal("am");
            expect(sut2.format("A")).equal("AM");

            const sut3 = Sut(new Date(2020, 4, 8, 13, 5, 3));

            expect(sut3.format("a")).equal("pm");
            expect(sut3.format("A")).equal("PM");
        });

        it("formats minutes", function() {
            const sut = Sut(new Date(2020, 4, 8, 4, 5, 3));

            expect(sut.format("mm")).equal("05");
            expect(sut.format("m")).equal("5");

            const sut2 = Sut(new Date(2020, 4, 8, 4, 55, 3));

            expect(sut2.format("mm")).equal("55");
            expect(sut2.format("m")).equal("55");
        });

        it("formats seconds", function() {
            const sut = Sut(new Date(2020, 4, 8, 4, 5, 3));

            expect(sut.format("ss")).equal("03");
            expect(sut.format("s")).equal("3");

            const sut2 = Sut(new Date(2020, 4, 8, 4, 5, 10));

            expect(sut2.format("ss")).equal("10");
            expect(sut2.format("s")).equal("10");
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

        it("formats ISO dates YYYY-MM-DD HH:mm:ss", function() {
            const sut = Sut(new Date(1994, 6, 4, 14, 5, 8));

            expect(sut.format("YYYY-MM-DD HH:mm:ss")).equal(
                "1994-07-04 14:05:08"
            );
        });

        it("formats common nordic date (day month year)", function() {
            const sut = Sut(new Date(1989, 2, 8));

            expect(sut.format("DD MMMM YYYY")).equal("08 March 1989");
            expect(sut.format("D MMM YYYY")).equal("8 Mar 1989");
        });

        it("formats 12 hour time h:m:s a", function() {
            const sut = Sut(new Date(1989, 2, 8, 15, 45, 22));

            expect(sut.format("h:m:ss a")).equal("3:45:22 pm");
        });
    });
});
