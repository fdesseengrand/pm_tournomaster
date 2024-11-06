/**
 * Extracts the score of the first team from a match.
 * @param score The score of the match (e.g.: "1-3").
 */
export const getTeamScore = (score: string): number => {
  if (!/^\d+-\d+$/.test(score)) {
    throw new Error("Invalid score format.");
  }

  return parseInt(score.split("-")[0]);
};
