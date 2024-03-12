const Subject = require('../models/subjectSchema.js');
const Student = require('../models/studentSchema.js');
const Question = require('../models/questionSchema.js');
const Section = require('../models/sectionSchema.js');
const Answer = require('../models/answerSchema.js');

const subjectCreate = async (req, res) => {
    console.log('subjectcreate')
    try {
        const newQuestions = await Question.create(req.body);
        res.status(201).send(newQuestions)
    } catch (err) {
        res.status(500).json(err);
    }
};
const getQuestions = async (req, res) => {
    const { userId, qId } = req.params
    console.log('getQuestions',userId, qId)
    let sampleAnswer = []
    try {
        const submittedAnswer = await Answer.find({ userId: userId, sectionId: qId })
        console.log(submittedAnswer)
        if (submittedAnswer.length > 0) {
            sampleAnswer = await Question.find({ titleId: qId }).exec()
            res.json({
                submitted: true,
                submitter: await Student.findById(userId).select('name'),
                sectionId: qId,
                result: comparedResult(submittedAnswer[0].answer, sampleAnswer[0].questions)
            })
        } else {
            res.json({
                submitted: false,
                submitter: null,
                sectionId: qId,
                result: (await Question.find({ titleId: qId }).exec())[0].questions
            })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
const getQuestionTitle = async (req, res) => {
    console.log('getQuestionsTItle',)
    try {
        let questionTitle = await Section.find()
        res.send(questionTitle)
    } catch (err) {
        res.status(500).json(err)
    }
}
const postAnswer = async (req, res) => {
    const { userId, qId } = req.params
    const data = {
        userId,
        sectionId: qId,
        answer: req.body
    }
    try {
        const result = await Answer.create(data);
        res.send(result)
    } catch (err) {
        res.status(500).json(err)
    }
}
const getAnswer = async (req, res) => {
}
const comparedResult = (answer, questions) => {
    const result = questions.map((question, qIndex) => ({
        question: question.question,
        answer: question.answer.map((ans, aIndex) => ({
            id: ans.id,
            desc: ans.desc,
            isTrue: ans.isTrue,
            isChecked: answer.filter(a => a.qId === qIndex && a.id === aIndex)[0].isChecked
        }))
    }))
    return result
}
const allSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ school: req.params.id })
            .populate("sectionName", "sectionName")
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const classSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ sectionName: req.params.id })
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const freeSubjectList = async (req, res) => {
    try {
        let subjects = await Subject.find({ sectionName: req.params.id, teacher: { $exists: false } });
        if (subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSubjectDetail = async (req, res) => {
    try {
        let subject = await Subject.findById(req.params.id);
        if (subject) {
            subject = await subject.populate("sectionName", "sectionName")
            subject = await subject.populate("teacher", "name")
            res.send(subject);
        }
        else {
            res.send({ message: "No subject found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

        // Set the teachSubject field to null in teachers
        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Remove the objects containing the deleted subject from students' examResult array
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id } } }
        );

        // Remove the objects containing the deleted subject from students' attendance array
        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedSubject._id } } }
        );

        res.send(deletedSubject);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteSubjects = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteSubjectsByClass = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ sectionName: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { subjectCreate, getQuestions, getQuestionTitle, postAnswer, getAnswer, freeSubjectList, classSubjects, getSubjectDetail, deleteSubjectsByClass, deleteSubjects, deleteSubject, allSubjects };