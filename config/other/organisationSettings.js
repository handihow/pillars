var organisationSettings = {}

organisationSettings.standard = {
	messages: true,
	privacy: true,
	hardware: true,
	software: true,
	competenceNew: false,
    competenceStudents: false,
	competence: true,
	management: true,
	pillars: true,
	evaluations: true
};

organisationSettings.topics = 
{
    messages: "Berichten / Informatie",
    privacy: "Algemene Verordering Gegevensbescherming",
    hardware: "Hardware",
    software: "(Digitale) Leermiddelen",
    competenceNew: "Overzicht Digitale Deskundigheid (geavanceerd)",
    competenceStudents: "Digitale Deskundigheid Leerlingen",
    competence: "Deskundigheid (basis)",
    management: "Organisatie",
    pillars: "Pillars Berekening",
    evaluations: "Evaluatie"
};

module.exports = organisationSettings;