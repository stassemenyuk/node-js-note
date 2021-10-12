function countNotes(arr) {
  let tasks = (rnd = ideas = 0);
  arr.forEach((item) => {
    if (item.category === 'Task') {
      tasks++;
    } else {
      if (item.category === 'Random thought') {
        rnd++;
      } else {
        ideas++;
      }
    }
  });
  return {
    tasks,
    rnd,
    ideas,
  };
}

module.exports = countNotes;
