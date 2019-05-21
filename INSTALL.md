# Installationsguide för Baga Aqua System API

### 2019-05-21

# Förord



# Innehållsförteckning

- Förord
- Innehållsförteckning
- Microsoft Windows
  - Hämta programvaran
    - Direkt nedladdning
    - Verisionshantering med Git
  - Installera databasen
    - Importera data till databasen
    - Konfigurera tillgång till databasen
  - Installera NodeJS
    - Hämta npm beroenden
  - Konfigurera server
    - Anslut till databas
    - Lägg till mailkonto
  - Starta Server
    - Starta i terminal
    - Öppna portar i brandväggen 
  - Underhåll och uppdateringar

- GNU/Linux
  - Hämta programvaran
  - Installera Databasen
  - Installera NodeJS
  - Kör konfigurationsskript
  - Underhåll och uppdateringar


# Installera för Microsoft Windows

## Hämta programvaran
Det första steget i installationen är att hämta programvaran från [GitHub](https://github.com/vattenbagarna/Backend). Detta kan göras på två sätt - direkt nedladdning eller via Git. 

### Direkt nedladdning

Gå till [https://github.com/vattenbagarna/Backend](https://github.com/vattenbagarna/Backend) och klicka på knappen `clone or download`, klicka sedan på `download zip`. Ladda ner och spara zip-filen på servern. Extrahera zip-filen till en mapp. Du ska nu ha en mapp med alla filerna som servern behöver. Kom ihåg var den är vi återkommer till den senare under installationen.

### Verisionshantering med Git

Om du har installerat git på din server så går det aningen lättare. Då öppnar du din git-terminal, navigerar till mappen där du vill ha filerna och klonar repot med följande kommando: `git clone https://github.com/vattenbagarna/Backend.git`  
Du ska nu ha en mapp med alla filerna som servern behöver. Kom ihåg var den är vi återkommer till den senare under installationen.

## Installera databasen
Databasen som används är [MongoDB]( https://mongodb.com) och kan hämtas från deras Download-sida: [https://mongodb.com/download-center/community](https://mongodb.com/download-center/community). Hitta rätt verision för ditt operativsystem och ladda ner installationsprogrammet. Kör installationsprogrammet och följ instruktionerna på skärmen. Se till att välja alternativen installera som service och Kör service som "network service user". Dessa alternativen brukar vara ikryssade från början.

### Importera data till databasen
I mappen som vi hämtade tidigare så finns lite data att utgå ifrån, den måste nu importeras i databasen. Starta programmet MongoDB från mappen `C:\Program Files\MongoDB\Server\4.0\bin\mongo`.  
Programmet kommer att starta en MongoDB terminal. 

Börja med att skapa databasen: `use baga`  
Därefter ska det läsas in data i databasen.