var organisationSettings = {}

organisationSettings.standard = {
	messages: true,
	privacy: true,
	hardware: true,
	software: true,
	competenceNew: true,
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
    competenceNew: "Overzicht Digitale Deskundigheid",
    competenceStudents: "Digitale Geletterdheid Leerlingen",
    competence: "Deskundigheid (LEGACY)",
    management: "Organisatie",
    pillars: "Pillars Berekening",
    evaluations: "Evaluatie"
};

module.exports = organisationSettings;