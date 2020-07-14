//import hardware configuration files
var types = require('./hardware/types'); //hardware types that can be tracked
var hardwareStandards =  require('./hardware/standards'); //hardware Pillars standards
var hardwareColumns = require('./hardware/columns'); //hardware columns
//import software configuration files
var functionality = require('./software/functionality'); //software functionality
var ratings = require('./software/ratings'); //software ratings
var subjects = require('./software/subjects'); //software subjects
var softwareStandards = require('./software/standards'); //software Pillars standards
var softwareSurvey = require('./software/survey'); //software survey
//import competence configuration files
var competenceSurvey = require('./competence/survey'); //competence survey
var competenceStandards = require('./competence/standards'); //competence standards
var customCSS = require('./competence/customCSS'); //custom css for the surveys
//import management configuration files
var roles = require('./management/roles'); //management roles
var managementStandards = require('./management/standards'); //management standards

//other configuration files
var scripts = require('./other/scripts'); //scripts loaded in header or footer of the html
var email = require('./other/email'); //emails that are sent to users
var processingActivity = require('./other/processingActivity'); //processing activities
var inspectionResults = require('./other/inspectionResults'); //school inspection results
var organisationSettings = require('./other/organisationSettings'); //organisation settings
var formsCSS = require('./other/formsCSS'); //custom css for forms in the application
var forms = require('./other/form'); //form column information

//Definition of config variable
var config = {};
//hardware
config.hardware = {};
config.hardware.types = types.types;
config.hardware.computers = types.computers();
config.hardware.laptops = types.laptops();
config.hardware.all = types.all();
config.hardware.standards = hardwareStandards;
config.hardware.columns = hardwareColumns;

//software
config.software = {};
config.software.subjects = subjects;
config.software.functionality = functionality;
config.software.ratings = ratings;
config.software.standards = softwareStandards;
config.software.survey = softwareSurvey;

//competence
config.competence = {};
config.competence.customCSS = customCSS;
config.competence.survey = competenceSurvey;
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
config.organisationSettings = organisationSettings.standard;
config.organisationSettingTopics = organisationSettings.topics;
config.formsCSS = formsCSS;
config.forms = forms;

config.currentSchoolYear = "2019/2020"

module.exports = config;