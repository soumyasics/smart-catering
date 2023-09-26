const staffs = require("./StaffSchema");
const orders = require("../orders/OrderSchema");
const jwt = require("jsonwebtoken");

//catering Registration

const registerStaff = (req, res) => {
  const newStaff = new staffs({
    unitname: req.body.unitname,
    regno: req.body.regno,
    city: req.body.city,
    district: req.body.district,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    pincode: req.body.pincode,
  });
  newStaff
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
//newStaff Registration -- finished

//login
const secret = "your-secret-key"; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
};

const login = (req, res) => {
  const { email, password } = req.body;

  staffs.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password != password) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    //   if (user.password!=password) {
    //     return res.status(400).json({ message: 'Invalid credentials' });
    //   }

    const token = createToken(user);

    res.status(200).json({ user, token });
  });
};
//validate
//const secret = 'your-secret-key'; // Replace this with your own secret key

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    return res.status(200).json({ message: "ok", user: decodedToken.userId });
    next();
  });
  console.log(req.headers.authorization);
  //   console.log(decodedToken)
};

//Login staff --finished

//View all staff

const viewStaffs = (req, res) => {
  staffs
    .find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view Packers finished

//update Packer by id
const editStaffById = (req, res) => {
  staffs
    .findByIdAndUpdate(
      { _id: req.body.id },
      {
        unitname: req.body.unitname,
        regno: req.body.regno,
        city: req.body.city,
        district: req.body.district,
        contact: req.body.contact,
        email: req.body.email,

        pincode: req.body.pincode,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
//view orders By Catering id
const viewOrdersByCat = (req, res) => {
  console.log(req.body.id);
  orders
    .find({ catid: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      if (data) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "something went wrong",
        Error: err,
      });
    });
};

//view catering by id
const viewStaffById = (req, res) => {
  staffs
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "something went wrong",
        Error: err,
      });
    });
};

const deleteStaffById = (req, res) => {
  staffs
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//forgotvPawd Customer by id
const forgotPwd = (req, res) => {
  staffs
    .findOneAndUpdate(
      { email: req.body.email },
      {
        password: req.body.password,
      }
    )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
          data:data
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

// add rating to mover by  packerid
const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  staffs
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      console.log(rating);
      staffs
        .findByIdAndUpdate(
          { _id: req.params.id },
          {
            rating: rating,
          }
        )
        .exec()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
        });
    });
};

const viewAllComplaintsByCatid = (req, res) => {
  complaintSchema
    .find({ catid: req.params.id })
    .populate("custid")
    .populate("orderid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

module.exports = {
  registerStaff,
  login,
  viewStaffs,
  editStaffById,
  viewOrdersByCat,
  deleteStaffById,
  forgotPwd,
  addRating,
  viewAllComplaintsByCatid,
  viewStaffById,
};
