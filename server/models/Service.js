const mongoose = require("mongoose");

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isHttpUrl(value) {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (error) {
    return false;
  }
}

const durationSchema = new mongoose.Schema(
  {
    minHours: {
      type: Number,
      required: true,
      min: 0,
    },
    maxHours: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const imageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      match: slugPattern,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isHttpUrl,
        message: "Image URL must be a valid http or https URL.",
      },
    },
    aspect: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const reviewSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      match: slugPattern,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    duration: {
      type: durationSchema,
      required: true,
      validate: {
        validator(duration) {
          return !duration || duration.maxHours >= duration.minHours;
        },
        message: "Maximum duration must be greater than or equal to minimum duration.",
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [imageSchema],
      default: [],
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

serviceSchema.path("images").validate(function validateUniqueImageIds(images) {
  const ids = images.map((image) => image.id);
  return ids.length === new Set(ids).size;
}, "Image ids must be unique within a service.");

serviceSchema.path("reviews").validate(function validateUniqueReviewIds(reviews) {
  const ids = reviews.map((review) => review.id);
  return ids.length === new Set(ids).size;
}, "Review ids must be unique within a service.");

module.exports = mongoose.model("Service", serviceSchema);
