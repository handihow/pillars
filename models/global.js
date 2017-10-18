//Definition of global variables

var global = {};

// Types of Hardware: enkelvoud en meervoud
global.hardwareTypes = [
        {
            enkelvoud: "Desktop",
            meervoud: "Desktops"
        },
        {
            enkelvoud: "Multipoint computer",
            meervoud: "Multipoint computers"
        },
        {
            enkelvoud: "Laptop",
            meervoud: "Laptops"
        },
        {
            enkelvoud: "Digitaal schoolbord",
            meervoud: "Digitale schoolborden"
        },
        {
            enkelvoud: "Tablet",
            meervoud: "Tablets"
        },
        {
            enkelvoud: "Chromebook",
            meervoud: "Chromebooks"
        }
];

global.software = {
        "Rekenen":              ["Rekenen"],
        "Technisch lezen":      ["Technisch lezen"],
        "Begrijpend lezen":     ["Begrijpend lezen"],
        "Spelling":             ["Spelling"],
        "Taal":                 ["Taal"],
        "Overige": 
                                [
                                    "Aardrijkskunde",
                                    "Natuur",
                                    "Geschiedenis",
                                    "Verkeer",
                                    "Muziek",
                                    "Godsdienst of Levensbeschouwing",
                                    "Staatsinrichting",
                                    "Seksuele voorlichting",
                                    "Engels",
                                    "Techniek"
                                ],
        "ICT Geletterdheid": 
                                [
                                    "Toetsenbordvaardigheid",
                                    "Programmeren",
                                    "Mediawijsheid"
                                ]
        };


module.exports = global;