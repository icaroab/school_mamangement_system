const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            answer:{
                type:[
                    {
                        id:{
                            type:Number,
                            required:true
                        },
                        desc:{
                            type:String,
                            required:true
                        },
                        isTrue:{
                            type:Boolean
                        }
                    },
                ]
            }
        }

    ],
}, { timestamps: true });

module.exports = mongoose.model("question", questionSchema);