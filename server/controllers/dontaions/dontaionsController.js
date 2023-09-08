const User = require('../../models/user.model');
const {StatusCodes} = require('http-status-codes');
const customError = require('../../errors');
const Donation = require('../../models/donations.model');
const dontaions = require('.');


const getUserDonation = async(req, res)=>{
  
  const donations = await Donation.find(
    {_id: req.user.userId});
  if(!donations){
    throw new customError.BAD_REQUEST('NO Donation User Yet to make donation');
  };
 
  let totalCash = donations.reduce((tot, val)=> tot+=val.totalCash , 0);
 

  res.status(StatusCodes.OK).json({
    donations,
    totalCash,
  })
}

const postUserDonation = async(req, res)=>{
  const dontaionDetails = await Donation.create({...req.body, user:req.user.userId});
  res.status(StatusCodes.CREATED).json({
    message:"SuccessFully Donated",
    dontaionDetails
  });
}


const getThankyou = async(req, res)=>{
  const donations = await Donation.find(
    {user: req.user.userId});
    console.log(dontaions)
  if(!donations){
    throw new customError.BAD_REQUEST('NO Donation User Yet to make donation');
  };

  console.log(dontaions);
  const NumberOfDonation = donations.length;
  let specialMessage ='';
  let total_Donation = donations.reduce((tot, val)=> tot+=val.totalCash , 0);
  if(NumberOfDonation>1){
    specialMessage = `WE are highly appreciate your gratitude for you contribution again and again`;
  }

  res.status(StatusCodes.OK).json({
    message: specialMessage? specialMessage: 'Thank you for donatain',
    total_Donation,
  })
}

module.exports = {
  postUserDonation,
  getThankyou,
  getUserDonation
}
