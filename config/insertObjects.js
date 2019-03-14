Fettavskiljare = [
    {
        "Namn": "Fettavskiljare",
        "Produkt": "3 l/s FL 3 Liggande",
        "RSK": 5624037,
        "Storlek": "900x2400"
    }
];

Oljeavskiljare = [
    {
        "Namn": "Oljeavskiljare",
        "Produkt": "Lilla garagepaket",
        "RSK": 5624093,
        "Storlek": "1200x15000"
    }
];

Slamavskiljare = [
    {
        "AntalHus": "1(BDT, lågbyggd)",
        // M3
        "Diameter": 1600,
        // Mm
        "Hojd": 1550,
        // Mm
        "InloppAnslutning": 110,
        // Mm
        "InloppVG": 800,
        "Namn": "Slamavskiljare",
        "OmbyggbarBAGAEASY": false,
        "PaketRSK": 5616256,
        "RSK": 5616255,
        // M3
        "SlamVolym": 0.5,
        // M3
        "TotalVolym": 1.3,
        // Mm
        "UtloppAnslutning": 110,
        // Mm
        "UtloppVG": 700,
        // Kg
        "VatVolym": 1.2,
        // Mm
        "Vikt": 80
    }
];
PaketBagaBDT1Hus = [
    {
        "AntalHus": 1,
        "Namn": "BAGA Easy 10-55 hushåll",
        "RSK": 5616256,
        // M2
        "inflationMarkbadd": 11
    }
];

Pumpstationer = [
    {
        "AntalPumpar": 1,
        "ArtikelNr": "None",
        // Mm
        "Diameter": 600,
        // Mm
        "Hojd": 700,
        //"Ø 110 gummitätning",
        "Inlopp": {"O": 110, "typ": "gummitätning"},
        //"Ø 50 gummitätning",
        "Kabelgenomforing": {"O": 50, "typ": "gummitätning"},
        "Modell": "Kompus 61",
        "Namn": "Pumpstation",
        "Pump": "GD-20  Skärande avloppspump, 3-fas",
        "RSK": 5886909,
        //"G 32 mm inv. gänga"
        "Utlopp": {"G": 32, "typ": "inv. gänga"}
    }
];

PumpstationerDRAN = [
    {
        "ArtikelNr": "KD60-150",
        // Cm
        "Diameter": 60,
        // Cm
        "Hojd": 150,
        // Mm
        "Inlopp": 110,
        //"Ø 50 gummitätning VG 1200 placering kl 6",
        "Kabelgenomforing": {"O": 50, "typ": "gummitätning VG 1200", "placeringKL": 6},
        "Namn": "Pumpstaion BAGA Drän 60",
        "Typ": "Kompus Drän 60-150",
        //"G 32 inv. gänga",
        "Utlopp": {"G": 32, "typ": "inv. gänga"},
        // Mm
        "VGin": "None",
        "VGut": 500
    }
];

PumpstationerVilla = [
    {
        // Cm
        "Diameter": 60,
        // Cm
        "Hojd": 70,
        // Mm
        "Inlopp": 110,
        //"Ø 50 gummitätning VG 570placering kl 3",
        "Kabelgenomforing": {"O": 50, "typ": "gummitätning VG 570", "placeringKL": 3},
        "Pump": "GC-07A 1-fas",
        "Pumpstation": "Villa 60-70",
        "RSK": 5887125,
        "Typ": "Pumpstation BAGA Villa 60",
        //"G 32 inv. gänga",
        "Utlopp": {"G": 32, "typ": "inv. gänga"},
        // Mm
        //"500 mm,  placering kl 9",
        "VGin": {"mm": 500, "placeringKL": 9},
        //"410 mm,  placering kl 12"
        "VGut": {"mm": 410, "placeringKL": 12}
    }
];

BagaBioTank = [
    {
        "AntalHus": 1,
        "Bestar": [5616142, 5619999],
        "Namn": "Paket Baga bioTank 1-6 hushåll",
        "RSK": 5619990,
        "typ": "BAGA BioTank 1"
    }
];

BagaSoloBDTRening = [
    {
        //"2000x1750mm",
        "Dimensioner": {"O": 2000, "H": 1750},
        "Namn": "BAGA SoloBDT-rening, allt i en tank",
        "RSK": 5622349,
        "Tillbehor": "Stativ till styrskåp, larm",
        // M2
        "VatVolym": 2.2
    }
];

SlutenTankToalettsystem = [
    {
        "Namn": "Sluten tank för toalettsystem",
        "Produkt": "1200 liter Liggande",
        "RSK": 5616165,
        //"Ø 900 x 2100"
        "Storlek": {"diameter": 900, "langd": 2100}
    }
];

KompaktbaddBDTKL = [
    {
        "AntalHus": 1,
        "Bestar": "BAGA Easy grundpaket + kompaktbädd",
        "Namn": "Kompaktbädd BDT+KL",
        "RSK": 5661891,
        // M2
        "TotalYta": 3.4,
        "Typ": "BAGA Easy kompaktbädd (paket)"
    }
];

BagaEasy = [
    {
        "AntalHus": 10,
        "Namn": "BAGA Easy 10-55 hushåll",
        "Pumpstation": "X",
        "Reservoar": "-",
        "Silo": "-",
        "SlamAvskiljare": "X"
    }
];

Pumpar = [
    {
        "ArtikelNr": "BPS200",
        "Fas": 1,
        // M
        "InvGanga": "G 32",
        "KabelLangd": 10,
        "KabelTyp": "H05RNF/H07RNF",
        // A
        "Markstrom": 1,
        // KW
        "MotorEffekt": 0.2,
        "Namn": "Pump",
        //lyft: m
        "PumpKurva": {"lps": [2.25, 2, 0.5], "lyft": [1, 1.9, 6]},
        "RSK": 5890162,
        // Mm
        "Slang": 32,
        "Typ": "BPS 200",
        // Rpm
        "Varvtal": 2900,
        // Kg
        "Vikt": 5,
        "Volt": 230
    }
];

Reningsverk = [
    {
        "Namn": "Reningsverk"
    }
];

BagaEasyPaket = [
    {
        "Namn": "Baga Easy Paket",
        "AntalHus": 1,
        "RSK": 5619984,
        "AntalBioModuler": 1
    }
];

Ledning = [
    {
        "InnerDiameter": 30,
        "Namn": "Ledning",
        "PNKlass": "10",
        "Typ": "PEM",
        "YtterDiameter": 32
    }
];

db.Objects.insert(Fettavskiljare);
db.Objects.insert(Oljeavskiljare);
db.Objects.insert(Slamavskiljare);
db.Objects.insert(PaketBagaBDT1Hus);
db.Objects.insert(Pumpstationer);
db.Objects.insert(PumpstationerDRAN);
db.Objects.insert(PumpstationerVilla);
db.Objects.insert(BagaBioTank);
db.Objects.insert(BagaSoloBDTRening);
db.Objects.insert(SlutenTankToalettsystem);
db.Objects.insert(KompaktbaddBDTKL);
db.Objects.insert(BagaEasy);
db.Objects.insert(Pumpar);
db.Objects.insert(Reningsverk);
db.Objects.insert(Ledning);
