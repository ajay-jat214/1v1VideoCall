const { setTimeout } = require('node:timers/promises');
const haiku = require('./haiku');

const MAX_TRIES = 10;

const users = {};

async function randomID(counter = 0) {
  if (counter > MAX_TRIES) {
    return null;
  }
  await setTimeout(10);
  const id = haiku();
  return id in users ? randomID(counter + 1) : id;
}

exports.create = async (socket) => {
  const id = await randomID();
  if (id) {
    users[id] = socket;
  }
  return id;
};

exports.get = (id) => users[id];

exports.remove = (id) => delete users[id];
