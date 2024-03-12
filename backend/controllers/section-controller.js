const Section = require('../models/sectionSchema.js');
const Student = require('../models/studentSchema.js');

const sectionCreate = async (req, res) => {
    console.log('section create')
    try {
        const section = new Section({
            name: req.body.sectionName,
            // school: req.body.adminID
        });
        const existingSectionByName = await Section.findOne({
            name: req.body.sectionName,
            // school: req.body.adminID
        });

        if (existingSectionByName) {
            res.send({ message: 'Sorry this class name already exists' });
        }
        else {
            const result = await section.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const getQuestionTitle = async (req, res) => {
    console.log('getQuestionsTItle',)
    try {
        let questionTitle = await Section.find()
        res.send(questionTitle)
    } catch (err) {
        res.status(500).json(err)
    }
}
const sectionList = async (req, res) => {
    console.log('sectionList')
    try {
        let sectiones = await Section.find({ school: req.params.id })
        if (sectiones.length > 0) {
            res.send(sectiones)
        } else {
            res.send({ message: "No sectiones found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSectionDetail = async (req, res) => {
    try {
        let section = await Section.findById(req.params.id);
        if (section) {
            section = await section.populate("school", "schoolName")
            res.send(section);
        }
        else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getSectionStudents = async (req, res) => {
    try {
        let students = await Student.find({ sectionName: req.params.id })
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteSection = async (req, res) => {
    try {
        const deletedClass = await Section.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.send({ message: "Class not found" });
        }
        res.send(deletedClass);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deletesections = async (req, res) => {
    try {
        const deletedClasses = await Section.deleteMany({ school: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            return res.send({ message: "No classes found to delete" });
        }
        res.send(deletedClasses);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { sectionCreate,getQuestionTitle,sectionList, deleteSection, deletesections, getSectionDetail, getSectionStudents };