import { format } from "date-fns";
import { DateStatusPipe } from "./date-status.pipe";

describe("DateStatusPipe", () => {
  let pipe: DateStatusPipe;

  beforeEach(() => {
    pipe = new DateStatusPipe();
  });

  it('should return "" for an empty date', () => {
    expect(pipe.transform("")).toBe("");
  });

  it('should return "COMPLETED" for a past date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    expect(pipe.transform(pastDate.toISOString())).toBe("COMPLETED");
  });

  it('should return "HHhmm" for today\'s date', () => {
    const today = new Date();
    const expectedTime = format(today, "HH'h'mm");

    expect(pipe.transform(today.toISOString())).toBe(expectedTime);
  });

  it('should return "dd/MM" for a future date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const expectedFormat = format(futureDate, "dd/MM");

    expect(pipe.transform(futureDate.toISOString())).toBe(expectedFormat);
  });
});
