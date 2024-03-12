const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { sectionCreate, sectionList,getQuestionTitle, deleteSection, deletesections, getSectionDetail, getSectionStudents} = require('../controllers/section-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance ,
    getTestsByStudent} = require('../controllers/student_controller.js');
// const { subjectCreate,getQuestions,getQuestionTitle,postAnswer,getAnswer, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
//Question
const {getQuestions,postAnswer,getAnswer, subjectCreate} = require('../controllers/question-controller.js');
// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)


// Section

router.post('/SectionCreate', sectionCreate);

router.get('/SectionList/:id', sectionList);
router.get("/Section/:id", getSectionDetail)

router.get("/Section/Students/:id", getSectionStudents)

router.delete("/sections/:id", deletesections)
router.delete("/Section/:id", deleteSection)

// Subject

router.post('/SubjectCreate', subjectCreate);

// router.get('/AllSubjects/:id', allSubjects);
// router.get('/ClassSubjects/:id', classSubjects);
// router.get('/FreeSubjectList/:id', freeSubjectList);
// router.get("/Subject/:id", getSubjectDetail)

// router.delete("/Subject/:id", deleteSubject)
// router.delete("/Subjects/:id", deleteSubjects)
// router.delete("/SubjectsClass/:id", deleteSubjectsByClass)
//Question
router.get('/questions/:userId/:qId', getQuestions);
router.get('/titles', getQuestionTitle)
router.post('/question/submit/:userId/:qId', postAnswer)
router.get('/question/submit/:userId/:qId', getAnswer)

router.get('/students', getStudents)
router.get('/students/:sId/tests', getTestsByStudent)
module.exports = router;