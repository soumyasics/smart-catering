const customers = require("./CustomerSchema");
const order = require("../orders/OrderSchema");

const staffs = require("../Staff/StaffSchema");
const jwt = require("jsonwebtoken");
const complaintSchema = require("./complaintSchema");
const OrderSchema = require("../orders/OrderSchema");
//cust Registration

const registerCustomers = (req, res) => {
  const newCustomers = new customers({
    name: req.body.name,

    city: req.body.city,
    district: req.body.district,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    pincode: req.body.pincode,
  });
  newCustomers
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
//cust Registration -- finished
//login
const secret = "your-secret-key"; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
};

const login = (req, res) => {
  const { email, password } = req.body;

  customers.findOne({ email }, (err, user) => {
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
//view All catering services- for cust

const viewAllCatering = (req, res) => {
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

//View all Customers

const viewCustomers = (req, res) => {
  customers
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

// view Customers finished

//update Customer by id
const editCustomerById = (req, res) => {
  customers
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,

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
// view cust by id
const viewCustomerById = (req, res) => {
  customers
    .findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
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

// view cust by id
const viewComplaintsByCustId = (req, res) => {
  complaintSchema
    .find({ custid: req.params.id })
    .populate('catid')
    .populate('orderid')
    .populate('custid')

    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
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

// view cust by id
const viewComplaintsByCatId = (req, res) => {
  complaintSchema
    .find({ catid: req.params.id })
    .populate('custid')
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
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
const deleteCustomerById =async (req, res) => {
  let flag=0
 await OrderSchema.find({custid:req.params.id}).exec().then(dta=>{
flag=1  
})
  .catch(err=>{
    console.log(" err on deletion");

  })
  if(flag!=1){
    await OrderSchema.deleteMany({custid:req.params.id}).exec().then(dta=>{
      console.log("deleted successfully");
    })
    .catch(err=>{
      console.log(" err on deletion");
  
    })

  await complaintSchema.deleteMany({custid:req.params.id}).exec().then(dta=>{
    console.log("deleted successfully");
  })
  .catch(err=>{
    console.log(" err on deletion");

  })
 await customers
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
  }else{
    res.json({
      status: 500,
      msg: "The customer already placed an order , so Deletion Not possible"
  })
}
};
//forgotvPawd Customer by id
const forgotPwd = (req, res) => {
  customers
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

const registerComplaints = (req, res) => {
  order
    .findById({ _id: req.body.orderid })
    .exec()
    .then((data) => {
      const newCustomers = new complaintSchema({
        custid: req.body.custid,
        complaint: req.body.complaint,
        orderid: req.body.orderid,
        catid: data.catid,
        date: new Date()
      });
      newCustomers
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
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//end validate
module.exports = {
  registerCustomers,
  registerComplaints,
  login,
  requireAuth,
  viewAllCatering,
  forgotPwd,
  viewCustomerById,
  viewCustomers,
  editCustomerById,
  deleteCustomerById,
  viewComplaintsByCatId,
  viewComplaintsByCustId,
};
