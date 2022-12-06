const { User, Thought } = require('../models');

const thoughtControl = {
  //all thoughts

  allThoughts(req, res) {
    Thought.find().
      then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },

  thoughtCreate(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thoughtData._id } }, { new: true });

      }).then(dbUserdata => {
        if (!dbUserdata) {
          return res.status(404).json("Thought Created but no User found with this ID");
        }
        res.json("Thought succesfully created");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req,res){
    Thought.findOneAndUpdate({_id:req.params.Id},{$set:req.body},{new:true})
    .then(dbUserdata => {
      if (!dbUserdata) {
        return res.status(404).json("Thought Not found");
      }
      res.json("Thought succesfully updated");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  oneThought(req, res) {
    Thought.findOne({ _id: req.params.Id })
      .then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },

  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json("Thought not found with this ID");
        }
        return User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });


      }).then(dbUserdata => {
        if (!dbUserdata) {
          return res.status(404).json("no User found with this ID");
        }
        res.json("Thought succesfully deleted");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addreaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true })
      .then(dbUserdata => {
        if (!dbUserdata) {
          return res.status(404).json("Thought Not Found");
        }
        res.json("Reaction added");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deletereaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions:{reactionId:req.params.reactionId} } }, { new: true })
      .then(dbUserdata => {
        if (!dbUserdata) {
          return res.status(404).json("Thought Not Found");
        }
        res.json("Reaction deleted");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}

module.exports = thoughtControl;