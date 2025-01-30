const { initializeDatabase } = require("./db/db.connect");

const Event = require("./models/events.models");
const express = require("express");

const app = express();

app.use(express.json());
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
initializeDatabase();

async function createEvent(newEvent) {
  try {
    const events = new Event(newEvent);
    const savedEvent = await events.save();
    return savedEvent;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
async function readAllEvents() {
  try {
    const allEvents = await Event.find();
    return allEvents;
  } catch (error) {
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length !== 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the events." });
  }
});

app.post("/events", async (req, res) => {
  try {
    const event = await createEvent(req.body);
    res.status(200).json({
      message: "Events added successfully",
      events: event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function readCardBytitle(eventName) {
  try {
    const title = await Event.find({ eventName: eventName });
    return title;
  } catch (error) {
    throw error;
  }
}

app.get("/events/:eventName", async (req, res) => {
  try {
    const events = await readCardBytitle(req.params.eventName);
    if (events.length != 0) {
      res.send(events);
    } else {
      res.status(404).json({ error: "No Events found for this title" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the events." });
  }
});

async function readCardByTags(eventTags) {
  try {
    const tags = await Event.find({ tags: eventTags });
    return tags;
  } catch (error) {
    throw error;
  }
}

app.get("/events/tags/:eventTags", async (req, res) => {
  try {
    const events = await readCardByTags(req.params.eventTags);
    if (events.length != 0) {
      res.send(events);
    } else {
      res.status(404).json({ error: "No Events found for this tag" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the events." });
  }
});

async function updateDataById(eventId, dataToUpdate) {
  try {
    const events = await Event.findByIdAndUpdate(
      { _id: eventId },
      dataToUpdate,
      { new: true }
    );
    return events;
  } catch (error) {
    throw error;
  }
}

app.post("/events/id/:eventId", async (req, res) => {
  try {
    const updatedEvents = await updateDataById(req.params.eventId, req.body);
    if (updatedEvents) {
      res.status(200).json({
        message: "Event upadated successfully",
        updatedEvents: updatedEvents,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the event." });
  }
});

app.get("/", async (req, res) => {
  res.send("Meet-Up app");
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});
