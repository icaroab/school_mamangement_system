const Section = require('../models/sectionSchema.js');
const Student = require('../models/studentSchema.js');

const sectionCreate = async (req, res) => {
    console.log('sectioncreate')
    console.log(req.body);
    try {
        const section = new Section({
            name: req.body.sclassName,
            school: req.body.adminID
        });

        const existingSectionByName = await Section.findOne({
            name: req.body.sclassName,
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

const sectionList = async (req, res) => {
//     try {
//         let sections = await Section.find({ school: req.params.id })
//         if (sclasses.length > 0) {
//             res.send(sclasses)
//         } else {
//             res.send({ message: "No sclasses found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
};

const getSectionDetail = async (req, res) => {
//     try {
//         let sclass = await Sclass.findById(req.params.id);
//         if (sclass) {
//             sclass = await sclass.populate("school", "schoolName")
//             res.send(sclass);
//         }
//         else {
//             res.send({ message: "No class found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
}

// const getSclassStudents = async (req, res) => {
//     try {
//         let students = await Student.find({ sclassName: req.params.id })
//         if (students.length > 0) {
//             let modifiedStudents = students.map((student) => {
//                 return { ...student._doc, password: undefined };
//             });
//             res.send(modifiedStudents);
//         } else {
//             res.send({ message: "No students found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

const deleteSection = async (req, res) => {
    try {
        const deletedSection = await Section.findByIdAndDelete(req.params.id);
        if (!deletedSection) {
            return res.send({ message: "Class not found" });
        }
        res.send(deletedSection);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteSections = async (req, res) => {
    try {
        const deletedSections = await Section.deleteMany({ section: req.params.id });
        if (deletedSections.deletedCount === 0) {
            return res.send({ message: "No sections found to delete" });
        }
        res.send(deletedSections);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    sectionCreate,
    sectionList,
    deleteSection,
     deleteSections, 
    getSectionDetail
};