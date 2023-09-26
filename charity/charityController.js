const charity = require("./charitySchema");
const jwt = require("jsonwebtoken");

//catering Registration

const registerCharity = (req, res) => {
  const newStaff = new charity({
    unitname: req.body.unitname,
    regno: req.body.regno,
    city: req.body.city,
    district: req.body.district,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    pincode: req.body.pincode,
    isActive: false,
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

  charity.findOne({ email }, (err, user) => {
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

//View all char

const viewAllCharities = (req, res) => {
  charity
    .find({})
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

const ApproveCharity = (req, res) => {
  charity
    .findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
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
};

const viewCharities = (req, res) => {
  charity
    .find({ isActive: true })
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

// view Charity finished

//view by id
const viewCharityById = (req, res) => {
  charity
    .findById({ _id: req.params.id })
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
          data: data,
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

//update Charity by id
const editCharityById = (req, res) => {
  charity
    .findByIdAndUpdate(
      { _id: req.params.id },
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

const deleteCharityById = (req, res) => {
  charity
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
  charity
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

module.exports = {
  registerCharity,
  login,
  viewCharities,
  deleteCharityById,
  forgotPwd,
  editCharityById,
  viewCharityById,
  viewAllCharities,
  ApproveCharity,
};
