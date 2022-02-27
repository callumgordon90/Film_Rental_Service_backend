const router = require ("express").Router();

const movieRouter = require ("./views/moviesRouter");
const seriesRouter = require ("./views/seriesRouter");
const usersRouter = require ("./views/usersRouter");
const orderRouter = require ("./views/orderRouter");
const loginRouter = require ("./views/loginRouter");

router.use("/movies", movieRouter);
router.use("/series", seriesRouter);
router.use("/users", usersRouter);
router.use("/orders", orderRouter);
router.use("/login", loginRouter);

module.exports = router;