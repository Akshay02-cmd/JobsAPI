const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const notFound = require("../middleware/not-found");

const getalljobs = async (req, res) => {
  const jobs = await Job.find({ CreatedBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getjob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    CreatedBy: userID,
  });
  if (!job) {
    throw new NotFoundError(` job not found on this ID: ${jobId}`);
  }
  res.status(StatusCodes.OK).json(job);
};
const createjob = async (req, res) => {
  req.body.CreatedBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updatejob = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("company or position field cannot be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, CreatedBy: userID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(` job not found on this ID: ${jobId}`);
  }
  res.status(StatusCodes.OK).json(job);
};
const deletejob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndDelete({
    _id: jobId,
    CreatedBy: userID,
  });
  if (!job) {
    throw new NotFoundError(` job not found on this ID: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getalljobs,
  getjob,
  createjob,
  updatejob,
  deletejob,
};
