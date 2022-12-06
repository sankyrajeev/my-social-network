const {User,Thought} =require ('../models');

const thoughtControl = {
    //all thoughts

    allThoughts(req,res){
        Thought.find().
        then((thoughtData)=> {
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    
    },

    thoughtCreate(req,res){
        Thought.create(req.body)
    }
}