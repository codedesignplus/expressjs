const { response } = require("express");
const Event = require("../models/event");

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name email");

    res.json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Internal error server",
    });
  }
};

const createEvent = async (req, res = response) => {
  try {
    const event = new Event(req.body);

    event.user = req.identity.uid;

    const result = await event.save();

    res.json({
      ok: true,
      event: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Internal error server",
    });
  }
};

const updateEvent = async (req, res = response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId).populate("user", "name email");

    if (!event) {
      return res.status(404).json({
        ok: true,
        msg: "Event Not Exist",
      });
    }

    if (event.user._id.toString() !== req.identity.uid) {
      return res.status(403).json({
        ok: true,
        msg: "RBAC failed",
      });
    }

    const newEvent = {
      ...req.body,
      user: req.identity.uid,
    };

    const result = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Internal error server",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId).populate("user", "name email");

    if (!event) {
      return res.status(404).json({
        ok: true,
        msg: "Event Not Exist",
      });
    }

    if (event.user._id.toString() !== req.identity.uid) {
      return res.status(403).json({
        ok: true,
        msg: "RBAC failed",
      });
    }

    const result = await Event.findByIdAndRemove(eventId);

    res.json({
      ok: true,
      event: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Internal error server",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
