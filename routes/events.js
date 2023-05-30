const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");

const router = Router();

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

router.use(jwtValidator);

router.get("/", [fieldsValidator], getEvents);

router.post(
  "/",
  [
    check("title", "The field title is required").not().isEmpty(),
    check("start", "The field start is required").custom(isDate),
    check("end", "The field end is required").custom(isDate),
    fieldsValidator,
  ],
  createEvent
);

router.put("/:id", [fieldsValidator], updateEvent);

router.delete("/:id", [fieldsValidator], deleteEvent);

module.exports = router;
