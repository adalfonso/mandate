import { expect } from "chai";
import Example from "../../../src/ts/Example";

describe("Example", function() {
  it("says hello", function() {
    const sut = new Example();

    expect(sut.sayHello()).equal("hello world");
  });
});
