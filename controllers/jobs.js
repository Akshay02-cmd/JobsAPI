const getalljobs = (req, res) => {
  res.send("get all jobs");
};
const getjob = (req, res) => {
  res.send("get a job");
};
const createjob = (req, res) => {
  res.send("create a job");
};
const updatejob = (req, res) => {
  res.send("update a job");
};
const deletejob = (req, res) => {
  res.send("delete a job");
};

module.exports = {
  getalljobs,
  getjob,
  createjob,
  updatejob,
  deletejob,
};
