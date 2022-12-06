const { User } = require('../models');

const userController = {
    allUsers(req, res) {
        User.find()
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    oneUser(req, res) {
        User.findOne({ _id: req.params.Id })
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },

    createUser(req, res) {
        User.create(req.body)
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },
    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.Id })
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },
    addNewFriend(req,res){
        User.findOneAndUpdate({_id:req.params.userId},{$push:{friends:req.params.friendId}},{new:true})
        .then(dbUserdata =>{
            if(!dbUserdata){
              return res.status(404).json("User Not Found");
            }
            res.json("New Friend added");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    deleteFriend(req,res){
        User.findOneAndUpdate({_id:req.params.userId},{$pull:{friends:req.params.friendId}},{new:true})
        .then(dbUserdata =>{
            if(!dbUserdata){
              return res.status(404).json("User Not Found");
            }
            res.json("Friend Deleted");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    updateUser(req,res){
        User.findOneAndUpdate({_id:req.params.Id},{$set:req.body},{new:true})
        .then(dbUserdata => {
          if (!dbUserdata) {
            return res.status(404).json("User Not found");
          }
          res.json("User succesfully updated");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
}



module.exports = userController;