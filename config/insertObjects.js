Fettavskiljare = [
	{
		Namn: "Fettavskiljare",
		RSK: 5624037,
		Produkt: "3 l/s FL 3 Liggande",
		Storlek: "900x2400"
	}
]

Oljeavskiljare = [
	{
		Namn: "Oljeavskiljare",
		RSK: 5624093,
		Produkt: "Lilla garagepaket",
		Storlek: "1200x15000"
	}
]

Slamavskiljare = [
	{
		Namn: "Slamavskiljare",
		AntalHus: "1(BDT, lågbyggd)",
		OmbyggbarBAGAEASY: false,
		VatVolym: 1.2, //m3
		SlamVolym: 0.5, //m3
		TotalVolym: 1.3, //m3
		Vikt: 80, //kg
		Diameter: 1600, //mm
		Hojd: 1550, //mm
		InloppVG: 800, //mm
		InloppAnslutning: 110, //mm
		UtloppVG: 700, //mm
		UtloppAnslutning: 110, //mm
		RSK: 5616255,
		PaketRSK: 5616256
	}
]
PaketBagaBDT1Hus = [	//more?
	{
		Namn: "BAGA Easy 10-55 hushåll",
		AntalHus: 1,
		RSK: 5616256,
		inflationMarkbadd: 11 //m2
	}
]

Pumpstationer = [
	{
		Namn: "Pumpstation",
		AntalPumpar:1,
		RSK: 5886909,
		ArtikelNr: "None",
		Pump: "GD-20  Skärande avloppspump, 3-fas",
		Modell: "Kompus 61",
		Diameter: 600, //mm
		Hojd: 700, //mm
		Utlopp: "G 32 mm inv. gänga",
		Inlopp: "Ø 110 gummitätning",
		Kabelgenomforing: "Ø 50 gummitätning"
	}
]

PumpstationerDRAN = [
	{
		Namn: "Pumpstaion BAGA Drän 60",
		Typ: "Kompus Drän 60-150",
		ArtikelNr: "KD60-150",
		Diameter: 60, //cm
		Hojd: 150, //cm
		Utlopp: "G 32 inv. gänga",
		VGut: 500, //mm
		Inlopp: 110, //mm
		VGin: "None",
		Kabelgenomforing: "Ø 50 gummitätning VG 1200 placering kl 6"
	}
]

PumpstationerVilla = [
	{
		Typ: "Pumpstation BAGA Villa 60",
		RSK: 5887125,
		Pumpstation: "Villa 60-70",
		Pump: "GC-07A 1-fas",
		Diameter: 60, //cm
		Hojd: 70, //cm
		Utlopp: "G 32 inv. gänga",
		VGut: "410 mm,  placering kl 12", //mm
		Inlopp: 110, //mm
		VGin: "500 mm,  placering kl 9",
		Kabelgenomforing: "Ø 50 gummitätning VG 570placering kl 3"
	}
]

BagaBioTank = [
	{
		Namn: "Paket Baga bioTank 1-6 hushåll",
		AntalHus: 1,
		typ: "BAGA BioTank 1",
		RSK: 5619990,
		Bestar: [5616142, 5619999]
	}
]

BagaSoloBDTRening = [
	{
		Namn: "BAGA SoloBDT-rening, allt i en tank",
		RSK: 5622349,
		Dimensioner: "2000x1750mm",
		VatVolym: 2.2, //m2
		Tillbehor: "Stativ till styrskåp, larm"
	}
]

SlutenTankToalettsystem = [
	{
		Namn: "Sluten tank för toalettsystem",
		RSK: 5616165,
		Produkt: "1200 liter Liggande",
		Storlek: "Ø 900 x 2100"
	}
]

KompaktbaddBDTKL = [
	{
		Namn: "Kompaktbädd BDT+KL",
		Typ: "BAGA Easy kompaktbädd (paket)",
		RSK: 5661891,
		AntalHus: 1,
		TotalYta: 3.4, //m2
		Bestar: "BAGA Easy grundpaket + kompaktbädd"
	}
]

BagaEasy = [
	{
		Namn: "BAGA Easy 10-55 hushåll",
		AntalHus: 10,
		SlamAvskiljare:"X" ,
		Silo: "-",
		Reservoar: "-",
		Pumpstation: "X"
	}
]

Pumpar = [
	{
		Namn: "Pump",
		Typ: "BPS 200",
		RSK: 5890162,
		ArtikelNr: "BPS200",
		Slang: 32, //mm
		InvGanga: "G 32",
		Fas: 1,
		Volt: 230,
		MotorEffekt: 0.2, //kW
		Markstrom: 1, //A
		Varvtal: 2900, //rpm
		KabelTyp: "H05RNF/H07RNF",
		KabelLangd: 10, //m
		Vikt: 5 //kg
	}
]

Reningsverk = [
	{
		Namn: "Reningsverk"
	}
]

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
