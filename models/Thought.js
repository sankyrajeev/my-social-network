const { Schema, model } = require('mongoose');
 const {format_date} = require('../utils/dateFormat');
 const reactionSchema = require('./Reaction');



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            
            trim: true,
            maxlength:280,
            minlength:1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp)=>format_date(timeStamp),
          },
        username:{
            type:String,
            required:true,
        },

        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters:true
        },
        
      }
    
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
})


const Thought= model('Thought', thoughtSchema);
module.exports = Thought;