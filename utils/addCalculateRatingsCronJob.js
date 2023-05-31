const CronJob = require("cron").CronJob;
const { calculateRatings, getAllUsers } = require("../services/user.service");

// const logger = require("./logger");
const addCalculateRatingsCronJob = async () => {
  const users = await getAllUsers();
  const job = new CronJob(
    "*/5 * * * * *",
    () => calculateRatings(users.users),
    null,
    true,
  );
  await job.start();
};
module.exports = addCalculateRatingsCronJob;
