const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    sectionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'sclass'
    },
    answer:{
        type:[
            {
                qId:{
                    type: Number,
                    required:true
                },
                id:{
                    type:Number,
                    required:true
                },
                isChecked:{
                    type:Boolean,
                    required:true
                }
            }
        ]
    },
}, { timestamps: true });

module.exports = mongoose.model("answer", answerSchema);