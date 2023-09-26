const express=require('express')
const router=express.Router()
const custcontroller=require('./Customer/CustomerController')
const staffController=require('./Staff/StaffController')
const food=require('./Food/FoodController')
const order=require('./orders/orderController')
const admin=require('./Admin/AdminController')
const charity=require('./charity/charityController')


//admin routes
router.post('/viewAllComplaints',admin.viewAllComplaints)
router.post('/viewAllCustomerss',admin.viewAllCustomers)

//cust  routes
router.post('/registerCustomer',custcontroller.registerCustomers)
router.post('/loginCustomer',custcontroller.login)
router.post('/checkAuthCust',custcontroller.requireAuth)
router.post('/viewAllCatering',custcontroller.viewAllCatering)
router.post('/editCustomerById/:id',custcontroller.editCustomerById)
router.post('/forgotPwd',custcontroller.forgotPwd)
router.post('/viewCustomers',custcontroller.viewCustomers)
router.post('/viewCustomerById/:id',custcontroller.viewCustomerById)
router.post('/deleteCustomerById/:id',custcontroller.deleteCustomerById)



router.post('/registerComplaints',custcontroller.registerComplaints)
router.post('/viewComplaintsByCatId/:id',custcontroller.viewComplaintsByCatId)
router.post('/viewComplaintsByCustId/:id',custcontroller.viewComplaintsByCustId)

//catering
router.post('/registerStaff',staffController.registerStaff)
router.post('/loginStaff',staffController.login)
router.post('/editStaffById',staffController.editStaffById)
router.post('/viewAllStaffs',staffController.viewStaffs)
router.post('/viewOrdersByCat/:id',staffController.viewOrdersByCat)



router.post('/deleteStaffById/:id',staffController.deleteStaffById)
router.post('/forgotPwdStaff',staffController.forgotPwd)
router.post('/viewStaffById/:id',staffController.viewStaffById)

router.post('/addRating/:id',staffController.addRating)
router.post('/viewAllComplaintsByCatid/:id',staffController.viewAllComplaintsByCatid)



//food
router.post('/addfood',food.upload,food.addFood)
router.post('/viewAllFoods',food.viewAllFoodItemss)
router.post('/editFoodById',food.upload,food.editFoodById)
router.post('/removeFoodById',food.deleteFoodById)
router.post('/viewFoodById',food.viewFoodById)
router.post('/viewFoodByCat/:id',food.viewFoodByCat)
router.post('/addReview/:id',food.addReview)

//orders
router.post('/addOrder',order.addOrder)
router.post('/viewOrderReqsByCat/:id',order.viewOrderReqsByCat)
router.post('/approveOrderByCat/:id',order.approveOrderByCat)
router.post('/viewAprvdOrdersByCat/:id',order.viewAprvdOrdersByCat)
router.post('/viewConfirmedOrdersByCustId/:id',order.viewConfirmedOrdersByCustId)
router.post('/viewPendingOrdersByCustId/:id',order.viewPendingOrdersByCustId)
router.post('/viewOrdersByFoodId/:id',order.viewOrdersByFoodId)
router.post('/rejectOrderByCat/:id',order.rejectOrderByCat)
router.post('/viewRejectedOrdersByCustId/:id',order.viewRejectedOrdersByCustId)
router.post('/donate',order.donate)
router.post('/viewdonateNotifcnByCharityId/:id',order.viewdonateNotifcnByCharityId)
router.post('/acceptDonationByCharity/:id',order.acceptDonationByCharity)
router.post('/rejectDonationByCharity/:id',order.rejectDonationByCharity)
router.post('/viewAcceptedDonationsByCharity/:id',order.viewAcceptedDonationsByCharity)
router.post('/viewAcceptedDonationsByCustId/:id',order.viewAcceptedDonationsByCustId)
router.post('/viewrejectedDonationsByCustId/:id',order.viewrejectedDonationsByCustId)
router.post('/Vieworders',order.Vieworders)

//charity 
router.post('/registerCharity',charity.registerCharity)
router.post('/loginCharity',charity.login)
router.post('/viewCharities',charity.viewCharities)
router.post('/viewAllCharities',charity.viewAllCharities)
router.post('/deleteCharityById/:id',charity.deleteCharityById)
router.post('/forgotPwdchar',charity.forgotPwd)
router.post('/editCharityById/:id',charity.editCharityById)
router.post('/ApproveCharity/:id',charity.ApproveCharity)
router.post('/viewCharityById/:id',charity.viewCharityById)





module.exports=router


