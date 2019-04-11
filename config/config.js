//import hardware configuration files
var types = require('./hardware/types'); //hardware types that can be tracked
var hardwareStandards =  require('./hardware/standards'); //hardware Pillars standards
//import software configuration files
var functionality = require('./software/functionality'); //software functionality
var ratings = require('./software/ratings'); //software ratings
var subjects = require('./software/subjects'); //software subjects
var softwareStandards = require('./software/standards'); //software Pillars standards
//import competence configuration files
var questionnaire = require('./competence/questionnaire'); //competence questionnaires
var survey = require('./competence/survey'); //competence survey
var competenceStandards = require('./competence/standards'); //competence standards
//import management configuration files
var roles = require('./management/roles'); //management roles
var managementStandards = require('./management/standards'); //management standards

//other configuration files
var scripts = require('./other/scripts'); //scripts loaded in header or footer of the html
var email = require('./other/email'); //emails that are sent to users
var processingActivity = require('./other/processingActivity'); //processing activities
var inspectionResults = require('./other/inspectionResults'); //school inspection results

//Definition of config variable
var config = {};
//hardware
config.hardware = {};
config.hardware.types = types.types;
config.hardware.computers = types.computers();
config.hardware.laptops = types.laptops();
config.hardware.all = types.all();
config.hardware.standards = hardwareStandards;

//software
config.software = {};
config.software.subjects = subjects;
config.software.functionality = functionality;
config.software.ratings = ratings;
config.software.standards = softwareStandards;

//competence
config.competence = {};
config.competence.questionnaire = questionnaire;
config.competence.survey = survey;
config.competence.standards = competenceStandards;

//management
config.management = {};
config.management.roles = roles;
config.management.standards = managementStandards;

//other
config.email = email;
config.scripts = scripts;
config.processingActivity = processingActivity;
config.inspectionResults = inspectionResults;

module.exports = config;