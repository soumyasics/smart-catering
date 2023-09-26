const cust = require("../Customer/CustomerSchema");
const staff = require("../Staff/StaffSchema");
const order = require("./OrderSchema");
const donationSchema = require("./donationSchema");

const addOrder = (req, res) => {
  const order1 = new order({
    custid: req.body.custid,
    catid: req.body.catid,
    foodid: req.body.foodid,
    count: req.body.count,
    date: req.body.date,
    comments: req.body.comments,
  });
  order1
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

//View all orders for catreing serv

const viewOrderReqsByCat = (req, res) => {
  order
    .find({ catid: req.params.id, status: "pending" })
    .populate("custid")
    .populate("foodid")
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

//reject order

const rejectOrderByCat = (req, res) => {
  order
    .findByIdAndUpdate({ _id: req.params.id }, { status: "rejected" })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data Updated successfully",
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

//Approve order

const approveOrderByCat = (req, res) => {
  order
    .findByIdAndUpdate({ _id: req.params.id }, { status: "approved" })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data Updated successfully",
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

//View all orders for catreing serv

const viewAprvdOrdersByCat = (req, res) => {
  order
    .find({ catid: req.params.id, status: "approved" })
    .populate("custid")
    .populate("foodid")
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

const Vieworders = (req, res) => {
    order
      .find({})
      .populate("custid")
      .populate("catid")
      .populate("foodid")
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

//View all pending orders for cust

const viewPendingOrdersByCustId = (req, res) => {
  order
    .find({ custid: req.params.id, status: "pending" })
    .populate("catid")
    .populate("foodid")
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

//View all orders for cust

const viewConfirmedOrdersByCustId = (req, res) => {
  order
    .find({ custid: req.params.id, status: "approved" })
    .populate("catid")
    .populate("foodid")
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

//View all rejected orders for cust

const viewRejectedOrdersByCustId = (req, res) => {
  order
    .find({ custid: req.params.id, status: "rejected" })
    .populate("catid")
    .populate("foodid")
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

const viewOrdersByFoodId = (req, res) => {
  order
    .find({ foodid: req.params.id, status: "approved" })
    .populate("userid")
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

//DONATE

const donate = (req, res) => {
  const notifcn = new donationSchema({
    custid: req.body.custid,
    catid: req.body.catid,
    foodid: req.body.foodid,
    orderid: req.body.orderid,
    date: req.body.date,
    comment: req.body.comment,
    charityStatus: "pending",
    charityId: req.body.charityId,
  });
  notifcn
    .save()
    .then((data) => {
      order
        .findByIdAndUpdate(
          { _id: req.body.orderid },
          { charityStatus: "requested" }
        )
        .exec()
        .then((data1) => {
          console.log("updated");
        })
        .catch((err1) => {
          console.log("not upadted");
        });

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

const viewdonateNotifcnByCharityId = (req, res) => {
  donationSchema
    .find({ charityId: req.params.id, status: "pending" })
    .populate("custid")
    .populate("foodid")
    .populate("catid")
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

//Accept Donation
const acceptDonationByCharity = (req, res) => {
  donationSchema
    .findByIdAndUpdate({ _id: req.params.id }, { charityStatus: "accepted" })
    .exec()
    .then((data) => {
      order
        .findByIdAndUpdate({ _id: data.orderid }, { charityStatus: "accepted" })
        .exec()
        .then((data1) => {
          console.log("updated");
        })
        .catch((err1) => {
          console.log("not upadted");
        });
      res.json({
        status: 200,
        msg: "Data updated successfully",
        data:data
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

//Reject Donation
const rejectDonationByCharity = (req, res) => {
  donationSchema
    .findByIdAndUpdate({ _id: req.params.id }, { charityStatus: "rejected" })
    .exec()
    .then((data) => {
      order
        .findByIdAndUpdate({ _id: data.orderid }, { charityStatus: "pending" })
        .exec()
        .then((data1) => {
          console.log("updated");
        })
        .catch((err1) => {
          console.log("not upadted");
        });
      res.json({
        status: 200,
        msg: "Data updated successfully",
        data:data
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

//View Accepted Donations
const viewAcceptedDonationsByCharity = (req, res) => {
  donationSchema
    .find({ charityId: req.params.id, status: "accepted" })
    .populate("custid")
    .populate("foodid")
    .populate("catid")
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

//View Accepted Donations by Customer
const viewAcceptedDonationsByCustId = (req, res) => {
  donationSchema
    .find({ custid: req.params.id, status: "pending" })
    .populate("charityId")
    .populate("foodid")
    .populate("catid")
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

//View Accepted Donations by Customer
const viewrejectedDonationsByCustId = (req, res) => {
  donationSchema
    .find({ custid: req.params.id, status: "rejected" })
    .populate("charityId")
    .populate("foodid")
    .populate("catid")
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
module.exports = {
  addOrder,
  approveOrderByCat,
  viewAprvdOrdersByCat,
  viewConfirmedOrdersByCustId,
  viewOrderReqsByCat,
  viewOrdersByFoodId,
  viewPendingOrdersByCustId,
  rejectOrderByCat,
  viewRejectedOrdersByCustId,
  donate,
  viewdonateNotifcnByCharityId,
  acceptDonationByCharity,
  rejectDonationByCharity,
  viewAcceptedDonationsByCharity,
  viewAcceptedDonationsByCustId,
  viewrejectedDonationsByCustId,
  Vieworders
};
