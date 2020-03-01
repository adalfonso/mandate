import { expect } from "chai";
import Sut from "../../../src/ts/Mandate";

describe("Mandate", function() {
  it("creates a new instance", function() {
    const sut = new Sut(new Date());

    expect(true).equal(true);
  });
});
