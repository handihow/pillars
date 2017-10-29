//Definition of global variables

var global = {};

// Types of Hardware: enkelvoud en meervoud
global.hardwareTypes = [
        {
            enkelvoud: "Desktop",
            meervoud: "Desktops",
            bijhouden: true
        },
        {
            enkelvoud: "Multipoint computer",
            meervoud: "Multipoint computers",
            bijhouden: true
        },
        {
            enkelvoud: "Laptop",
            meervoud: "Laptops",
            bijhouden: true
        },
        {
            enkelvoud: "Digitaal schoolbord",
            meervoud: "Digitale schoolborden",
            bijhouden: true
        },
        {
            enkelvoud: "Tablet",
            meervoud: "Tablets",
            bijhouden: true
        },
        {
            enkelvoud: "Chromebook",
            meervoud: "Chromebooks",
            bijhouden: true
        },
        {
            enkelvoud: "Telefoon",
            meervoud: "Telefoons",
            bijhouden: false
        },
        {
            enkelvoud: "Kopieermachine",
            meervoud: "Kopieermachines",
            bijhouden: false
        },
        {
            enkelvoud: "Printer",
            meervoud: "Printers",
            bijhouden: false
        },
        {
            enkelvoud: "Access Point",
            meervoud: "Access Points",
            bijhouden: false
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

global.softwareFuncties = [
                                "Instructie", 
                                "Oefenen", 
                                "Toets"
                                ];

global.softwareKwaliteiten = [
                                "Sluit goed aan op leerdoelen", 
                                "Is aantrekkelijk en gebruiksvriendelijk", 
                                "Toont resultaten van leerlingen", 
                                "Is adaptief", 
                                "Leerlingen kunnen thuis oefenen"
                                ];

module.exports = global;