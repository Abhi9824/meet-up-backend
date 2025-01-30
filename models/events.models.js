const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  hostedBy: { type: String, required: true },
  imageUrl: { type: String, required: true },
  details: { type: String, required: true },
  dressCode: { type: String },
  ageRestriction: { type: String },
  tags: [
    {
      type: String,
      required: true,
      enum: [
        "marketing",
        "digital",
        "technology",
        "agriculture",
        "tech Conference",
        "designing",
        "creativity",
        "robotics",
      ],
    },
  ],
  date: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  location: {
    city: { type: String },
    address: { type: String },
    isOnline: { type: Boolean, default: false },
    onlineLink: String,
  },
  price: { type: Number, required: true },
  speakers: [
    {
      name: { type: String, required: true },
      title: { type: String, required: true },
      imageUrl: { type: String },
    },
  ],
  rsvpLink: { type: String },
});

const Event = new mongoose.model("Event", eventSchema);

module.exports = Event;
