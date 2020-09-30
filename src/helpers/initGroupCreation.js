export default function initGroupCreation(numOfGroups) {
  let x = 0;
  let groups = [];

  while (x < numOfGroups) {
    groups[x] = {
      id: 'group' + x,
      circuits: [],
      intensity: 0,
      nickname: '',
    };
    x = x + 1;
  }

  return [...groups];
}
