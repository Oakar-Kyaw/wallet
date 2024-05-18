const upload = require("../../config/fileUpload/fileUpload")
const BookingController = require("../../controllers/booking/bookingController")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const Booking = new BookingController()
    // get user and create user
    app.route("/api/v1/booking")
       .post(verifyToken, Booking.createBooking)

    app.route("/api/v1/bookings")
        .get(verifyToken, Booking.listAllBooking)
    
    app.route("/api/v1/booking/:id")
       .get(verifyToken, Booking.getBookingById)
       .put(verifyToken, Booking.updateBookingById)
       .delete(verifyToken, Booking.deleteBookingById)
}