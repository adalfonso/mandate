import { expect } from "chai";
import Sut from "../../../src/ts/Mandate";

describe("Mandate", function() {
    it("creates a new instance", function() {
        const sut = new Sut(new Date());

        expect(true).equal(true);
    });

    describe("basic format", function() {
        it("formats full year", function() {
            const sut = new Sut(new Date(2020, 1, 1));

            expect(sut.format("YYYY")).equal("2020");
        });

        it("formats short year", function() {
            const sut = new Sut(new Date(2020, 1, 1));

            expect(sut.format("YYY")).equal("20");
            expect(sut.format("YY")).equal("20");
        });

        it("formats alpha month", function() {
            const sut = new Sut(new Date(2020, 9, 1));

            expect(sut.format("MMMM")).equal("October");
            expect(sut.format("MMM")).equal("Oct");
        });

        it("formats numeric month", function() {
            const sut = new Sut(new Date(2020, 4, 1));

            expect(sut.format("MM")).equal("5");
            expect(sut.format("M")).equal("5");
        });

        it("formats day", function() {
            const sut = new Sut(new Date(2020, 4, 8));

            expect(sut.format("DD")).equal("08");
            expect(sut.format("D")).equal("8");
        });

        it("doesn't format incorrect input", function() {
            const sut = new Sut(new Date(2020, 1, 1));

            expect(sut.format("G")).equal("G");
        });
    });

    describe("complex format", function() {
        it("formats long year and short year", function() {
            const sut = new Sut(new Date(2020, 1, 1));

            expect(sut.format("YYYYYY")).equal("202020");
        });

        it("formats two long years", function() {
            const sut = new Sut(new Date(2020, 1, 1));

            expect(sut.format("YYYYYYYY")).equal("20202020");
        });

        it("formats full date", function() {
            const sut = new Sut(new Date(1989, 2, 22));

            expect(sut.format("MMMM DD, YYYY")).equal("March 22, 1989");
        });
    });

    describe("edge cases", function() {
        it("formats full date with words", function() {
            const sut = new Sut(new Date(1989, 2, 22));

            expect(sut.format("MMMM DD, YYYYhello")).equal(
                "March 22, 1989hello"
            );
        });
    });
});
