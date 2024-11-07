
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

/**
 * Validator that checks if either both controls are defined or both are not defined.
 * 
 * @param controlName1 - The name of the first control to check.
 * @param controlName2 - The name of the second control to check.
 */
export function bothOrNeitherDefinedValidator(controlName1: string, controlName2: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control1 = formGroup.get(controlName1);
    const control2 = formGroup.get(controlName2);

    // Check if either both are defined or both are not defined (null or undefined)
    const bothDefined = !!control1?.value && !!control2?.value;
    const bothUndefined = !control1?.value && !control2?.value;

    if (bothDefined || bothUndefined) {
      return null; // Valid
    }

    // If one is defined and the other is not, return an error
    return { bothOrNeitherDefined: true };
  };
}