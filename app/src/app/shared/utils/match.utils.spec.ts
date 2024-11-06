import { getTeamScore } from "./match.utils";

describe("#getTeamScore", () => {
  it('should return the score of the first team when the score is "1-3"', () => {
    expect(getTeamScore("1-3")).toBe(1);
  });

  it('should return the score of the first team when the score is "0-0"', () => {
    expect(getTeamScore("0-0")).toBe(0);
  });

  it("should return NaN when the score is an empty string", () => {
    expect(getTeamScore("")).toThrowError("Invalid score format.");
  });

  it("should return NaN when the score is not a valid format", () => {
    expect(getTeamScore("")).toThrowError("Invalid score format.");
  });

  it('should return NaN when the score is "3-"', () => {
    expect(getTeamScore("")).toThrowError("Invalid score format.");
  });

  it('should return NaN when the score is "-3"', () => {
    expect(getTeamScore("")).toThrowError("Invalid score format.");
  });
});
