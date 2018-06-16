/**
 * @param {number} number
 * @return {number}
 */
export default function integerPartition(number) {
  // Create partition matrix for solving this task using Dynamic Programming.
  const partitionMatrix = Array(number + 1).fill(null).map(() => {
    return Array(number + 1).fill(null);
  });

  // Fill partition matrix with initial values.

  // Let's fill the first row that represents how many ways we would have
  // to combine the numbers 1, 2, 3, ..., n with number 0. We would have zero
  // ways obviously since with zero number we may form only zero.
  for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
    partitionMatrix[0][numberIndex] = 0;
  }

  // Let's fill the first column. It represents the number of ways we can form
  // number zero out of numbers 0, 0 and 1, 0 and 1 and 2, 0 and 1 and 2 and 3, ... Obviously there is only one way we could
  // form number 0 and it is with number 0 itself.
  for (let summandIndex = 0; summandIndex <= number; summandIndex += 1) {
    partitionMatrix[summandIndex][0] = 1;
  }

  // Now let's go through other possible options of how we could form number m out of
  // summands 0, 1, ..., m using Dynamic Programming approach.
  for (let summandIndex = 1; summandIndex <= number; summandIndex += 1) {
    for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
      if (summandIndex > numberIndex) {
        // If summand number is bigger then current number itself then just it won't add
        // any new ways of forming the number. Thus we may just copy the number from row above.
        partitionMatrix[summandIndex][numberIndex] = partitionMatrix[summandIndex - 1][numberIndex];
      } else {
        // The number of combinations would equal to number of combinations of forming the same
        // number but WITHOUT current summand number plus number of combinations of forming the
        // <current number - current summand> number but WITH current summand.
        // Example: number of ways to form number 4 using summands up to 3 is the sum of
        // {number of ways to form 4 with sums that begin with 1 + sums that begin with 2 (i.e without summand 3)} + 
        // {number of ways to form 4 with sums that begin with 3}
        // Taking these sums to proceed in descending order of intergers, this gives us:
        // With 1: 1+1+1+1  -> 1 way
        // With 2: 2+2, 2+1+1 -> 2 ways
        // With 3: 3 + (4-3) <= convince yourself that number of ways to form 4 starting with 3 is 
        // == number of ways to form 4-3, which is the <current number - current summand> number
        // Helper: if there are n ways to get (4-3) then we get 3 + first way, 3 + second way, and so on to 3 + nth way.
        // So answer for 4 is: 1 + 2 + 1 = 4 ways
        const combosWithoutSummand = partitionMatrix[summandIndex - 1][numberIndex];
        const combosWithSummand = partitionMatrix[summandIndex][numberIndex - summandIndex];

        partitionMatrix[summandIndex][numberIndex] = combosWithoutSummand + combosWithSummand;
      }
    }
  }

  return partitionMatrix[number][number];
}
