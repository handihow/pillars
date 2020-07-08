var types = {}

types.types = [
        {
            singular: "Desktop",
            plural: "Desktops",
            track: true,
            isComputer: true,
            isLaptop: false,
            isAll: true, 
            defaultPrice: 520
        },
        {
            singular: "Multipoint computer",
            plural: "Multipoint computers",
            track: true,
            isComputer: true,
            isLaptop: false,
            isAll: true,
            defaultPrice: 1040
        },
        {
            singular: "Laptop",
            plural: "Laptops",
            track: true,
            isComputer: true,
            isLaptop: true,
            isAll: true,
            defaultPrice: 520
        },
        {
            singular: "Digitaal schoolbord",
            plural: "Digitale schoolborden",
            track: true,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 3550
        },
        {
            singular: "Tablet",
            plural: "Tablets",
            track: true,
            isComputer: false,
            isLaptop: false,
            isAll: true,
            defaultPrice: 360
        },
        {
            singular: "Chromebook",
            plural: "Chromebooks",
            track: true,
            isComputer: false,
            isLaptop: false,
            isAll: true,
            defaultPrice: 250
        },
        {
            singular: "Telefoon",
            plural: "Telefoons",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 450
        },
        {
            singular: "Kopieermachine",
            plural: "Kopieermachines",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 800
        },
        {
            singular: "Printer",
            plural: "Printers",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 430
        },
        {
            singular: "Access Point",
            plural: "Access Points",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 230
        },
        {
            singular: "Robotica",
            plural: "Robotica",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 6000
        },
        {
            singular: "Beamer",
            plural: "Beamers",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 510
        },
        {
            singular: "Monitor",
            plural: "Monitoren",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 290
        },
        {
            singular: "Switch",
            plural: "Switches",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 35
        },
        {
            singular: "Server",
            plural: "Servers",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 2900
        },
        {
            singular: "Koptelefoon",
            plural: "Koptelefoons",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 90
        },
        {
            singular: "Geluidsinstallatie",
            plural: "Geluidsinstallaties",
            track: false,
            isComputer: false,
            isLaptop: false,
            isAll: false,
            defaultPrice: 550
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