import db from "../dbConnect.js";

const ynotSchema = db.Schema({
      ynotMessage: String,
      upVotes: Number,
      downVotes: Number,
      ytf: String,
      createdDate: Date
});

export const YnotObject = db.model("ynot", ynotSchema, "ynots");

export const createYnot = async (newYnot) => {
  try {
    const createdYnot = await YnotObject.create(newYnot);
    return createdYnot;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Duplicate Error");
    } else {
      throw error;
    }
  }
};

export const updateYnotObject = async (id, updatedYnotData) => {
  const ynot = await YnotObject.findByIdAndUpdate(id, updatedYnotData, {
    new: true,
  });
  return ynot;
};

export const findOneYnotByID = async (id) => {
  const ynot = await YnotObject.findById(id);
  return ynot;
};

export const deleteYnot = async (id) => {
  const response = await YnotObject.findByIdAndDelete(id);
  return response;
};

export const listAllYnots = async () => {
  const allYnots = await YnotObject.find();
  return allYnots;
}
