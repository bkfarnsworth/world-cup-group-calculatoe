import GroupResultGenerator from './../src/GroupResultGenerator';
import testGroups from './testGroups';

it('should instantiate a generator without fail', () => {
  let groupResultGenerator = new GroupResultGenerator();
  expect(groupResultGenerator).toBeDefined();
});

it('should not have an undefined testGroups', () => {
  expect(testGroups).toBeDefined();
})

it('should have 27 results if there are 3 games left', () => {
  let groupD = testGroups.find(g => g.id === "D");
  expect(groupD).toBeDefined();
  let groupResultGenerator = new GroupResultGenerator();
  let results = groupResultGenerator.generate(groupD);
  expect(results.length).toBe(27);
})

it('should have 9 results if there are 2 games left ', () => {
  let groupZ = testGroups.find(g => g.id === "Z");
  expect(groupZ).toBeDefined();
  let groupResultGenerator = new GroupResultGenerator();
  let results = groupResultGenerator.generate(groupZ);
  expect(results.length).toBe(9);
})

it('should have 2 matchResults in each groupResult if there are 2 games left ', () => {
  let groupZ = testGroups.find(g => g.id === "Z");
  expect(groupZ).toBeDefined();
  let groupResultGenerator = new GroupResultGenerator();
  let results = groupResultGenerator.generate(groupZ);
  console.log(results[0]);
  expect(results[0].matchResults.length).toBe(2);
})



