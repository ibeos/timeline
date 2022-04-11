function getTimelineData() {

  return {
    "timelines": [ 

    {
      "name": "Civilizations and Empires",
      "description": "",
      "color": "amber",
      "options": {
        "min": [-4600,1,1],
        "max": [2100,1,1],
      },
      "groups": [
        {
          "name": "Europe",
          "color": "blue",
          "dates": [
            [[-450],       [-1],        2, "Celts (La Tène)", "","La_Tène_culture"],
            [[-1200],       [600],        2, "Ancient Greece", "","Ancient_Greece"],
            [[-753],       [476],        2, "Ancient Rome", "","Ancient_Rome"],
            [[395],       [1453],        2, "Byzantine Empire", "","Byzantine_Empire"],
            [[962],       [1806],        2, "Holy Roman Empire", "","Holy_Roman_Empire"],
          ]
        },
        {
          "name": "Asia",
          "color": "red",
          "dates": [
            [[-4500],       [-1900],        2, "Sumer", "","Sumer"],
            [[-2025],       [-609],        2, "Assyria", "","Assyria"],
            [[-1895],       [-539],        2, "Babylonia", "","Babylonia"],
            [[-550],       [-330],        2, "First Persian Empire", "","Achaemenid_Empire"],
            [[-206],        [220],        2, "Han Dynasty", "", "Han_dynasty"],
            [[320],       [550],        2, "Gupta Empire", "","Gupta_Empire"],
            [[618],         [907],        2, "Tang Dynasty", "", "Tang_dynasty"],
            [[1206],       [1368],        2, "Mongol Empire", "","Mongol_Empire"],
            [[1299],       [1922],        2, "Ottoman Empire", "","Ottoman_Empire"],
          ]
        },
        {
          "name": "Africa",
          "color": "amber",
          "dates": [
            [[-3150],       [-332],        2, "Ancient Egypt", "","Ancient_Egypt"],
            [[-80],       [960],        2, "Empire of Aksum", "","Kingdom_of_Aksum"],
            [[300],       [1200],        2, "Ancient Ghana", "","Ghana_Empire"],
            // [[500],       [1500],        2, "Nubia", "","link"],
            [[700],       [1380],        2, "Kanem-Bornu", "","Kanem–Bornu_Empire"],
            [[1464],       [1591],        2, "Songhai Empire", "","link"],
            [[1220],       [1450],        2, "Kingdom of Zimbabwe", "","link"],
            [[1235],       [1660],        2, "Mali Empire", "","link"],
            [[1180],       [1897],        2, "Kingdom of Benin", "","link"],
          ]
        },
        {
          "name": "America",
          "color": "green",
          "dates": [
            [[-2000],       [1697],        2, "Maya civilization", "","Maya_civilization"],
            [[1428],       [1521],        2, "Aztec Empire", "","Aztec_Empire"],
            [[1438],       [1572],        2, "Inca Empire", "","Inca_Empire"],
          ]
        }
      ]
    }
    
    ] // End Timelines
  }

}
