var types = {}

types.types = [
        {
            singular: "Desktop",
            plural: "Desktops",
            track: true,
            isComputer: true,
            isLaptop: false,
            isAll: true
        },
        {
            singular: "Multipoint computer",
            plural: "Multipoint computers",
            track: true,
            isComputer: true,
            isLaptop: false,
            isAll: true
        },
        {
            singular: "Laptop",
            plural: "Laptops",
            track: true,
            isComputer: true,
            isLaptop: true,
            isAll: true
        },
        {
            singular: "Digitaal schoolbord",
            plural: "Digitale schoolborden",
            track: true,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Tablet",
            plural: "Tablets",
            track: true,
            isComputer: false,
            isLaptop: false,
            isAll: true
        },
        {
            singular: "Chromebook",
            plural: "Chromebooks",
            track: true,
            isComputer: false,
            isLaptop: false,
            isAll: true
        },
        {
            singular: "Telefoon",
            plural: "Telefoons",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Kopieermachine",
            plural: "Kopieermachines",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Printer",
            plural: "Printers",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Access Point",
            plural: "Access Points",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Robotica",
            plural: "Robotica",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Beamer",
            plural: "Beamers",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Monitor",
            plural: "Monitoren",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Switch",
            plural: "Switches",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Server",
            plural: "Servers",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Koptelefoon",
            plural: "Koptelefoons",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        },
        {
            singular: "Geluidsinstallatie",
            plural: "Geluidsinstallaties",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false
        }
];

types.computers = function(){
    return types.types.filter(val => {return val.isComputer}).map(val => {return val.singular})
}

types.laptops = function(){
    return types.types.filter(val => {return val.isLaptop}).map(val => {return val.singular})
}

types.all = function(){
    return types.types.filter(val=> {return val.isAll}).map(val => {return val.singular})
}

module.exports = types;