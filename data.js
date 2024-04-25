function getTimelineData() {

  return {
    "timelines": [ 
    
    // Civilizations and Empires
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
            [[-450],       [-1],        2, "Celts (La Tène)", "A European Iron Age culture","La_Tène_culture"],
            [[-1200],       [600],        2, "Ancient Greece", "A loose collection of culturally and linguistically related city-states","Ancient_Greece"],
            [[-753],       [476],        2, "Ancient Rome", "Encompasses the founding of the Italian city of Rome, the Roman Kingdom, Roman Republic, Roman Empire, and the collapse of the Western Roman Empire","Ancient_Rome"],
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
            [[-2000], [1697], 2, "Maya civilization", "","Maya_civilization"],
            [[1428], [1521], 2, "Aztec Empire", "","Aztec_Empire"],
            [[1438], [1572], 2, "Inca Empire", "","Inca_Empire"],
          ]
        }
      ]
    },

    // History of Japan
    {
      "name": "History of Japan",
      "description": "A timeline of Japanese history. Events are sorted in the categories Politics, Culture. The category Periods shows the accepted succession of historical periods.",
      "color": "indigo",
      "options": {
        "min": [-1100,1,1],
        "max": [2100,1,1],
      },
      "groups": [
        {
          "name": "Periods",
          "color": "red",
          "dates": [
            [[-1000], [300], 2, "Yayoi", "弥生時代","Yayoi_period"],
            [[300], [538], 2, "Kofun", "古墳時代","Kofun_period"],
            [[538], [710], 2, "Asuka", "飛鳥時代","Asuka_period"],
            [[710], [794], 2, "Nara", "奈良時代","Nara_period"],
            [[794], [1185], 2, "Heian", "平安時代","Heian_period"],
            [[1185], [1333], 2, "Kamakura", "鎌倉時代","Kamakura_period"],
            [[1333], [1336], 2, "Kenmu Restoration", "建武の新政","Kenmu_Restoration"],
            [[1336], [1573], 2, "Muromachi (Ashikaga)", "室町時代","Muromachi_period"],
            [[1573], [1603], 2, "Azuchi–Momoyama", "安土桃山時代","Azuchi–Momoyama_period"],
            [[1603], [1868], 2, "Edo (Tokugawa)", "江戸時代","Edo_period"],
            [[1868], [1912], 2, "Meiji", "明治時代","Meiji_(era)"],
            [[1912], [1926], 2, "Taishō", "大正","Taishō_era"],
            [[1926], [1989], 2, "Shōwa", "昭和","Shōwa_(1926–1989)"],
            [[1989], [2019], 2, "Heisei", "平成","Heisei_era"],
            [[2019], [2021], 2, "Reiwa", "令和","Reiwa_era"],
          ]
        },
        {
          "name": "Politics",
          "color": "purple",
          "dates": [
            [[-189], null, 1, "Himiko", "Queen Himiko (卑弥呼), Japan's first known ruler, comes to power", "Himiko"],
            [[735], null, 1, "Smallpox Epidemic", "A smallpox epidemic kills over a quarter of the population", "735–737_Japanese_smallpox_epidemic"],

            [[895], null, 1, "Isolation", "Japan isolates itself by cutting imperial embassies to China", ""],
            [[939], null, 1, "Taira no Masakado Rebellion", "Rebellion of Taira no Masakado, considered first samurai war", ""],
            [[1274], null, 1, "1. Mongol Invasion", "First Mongol invasion of Japan", ""],
            [[1281], null, 1, "2. Mongol Invasion", "Second Mongol invasion of Japan", ""],

            [[1467], [1615], 2, "Sengoku period", "戦国時代", "Sengoku_period"],

            [[1543], null, 1, "European Arrival", "First Europeans arrive in Japan, start of Nanban trade period", ""],
            [[1592], null, 1, "1. Invasion of Korea", "First Japanese invasion of Korea", ""],
            [[1597], null, 1, "2. Invasion of Korea", "Second Japanese invasion of Korea", ""],
            [[1598], null, 1, "Withdrawal from Korea", "Japan withdraws from Korea", ""],
            [[1609], null, 1, "Invasion of Okinawa", "Invasion of Okinawa by Satsuma, a Japanese province", ""],
            [[1614], null, 1, "Expulsion of Jesuits", "Expulsion of the Jesuits from Japan", ""],
            [[1635], null, 1, "Locked Country", "Sakoku \"locked country\" policy bans any contact with foreigners", ""],
            [[1854], null, 1, "Black Ships", "American \"Black Ships\" force Japan into trade agreements", ""],
            [[1868], null, 1, "Boshin War", "Boshin War begins", ""],
            [[1868], null, 1, "Tokyo", "Tokyo becomes capital", ""],
            [[1890], null, 1, "Meiji Constitution", "Japan becomes a constitutional monarchy", ""],
            [[1904], null, 1, "Russo-Japanese War", "Start of Russo-Japanese War", ""],
            [[1931], null, 1, "Invasion of Manchuria", "Japanese invasion of Manchuria", ""],
            [[1937], null, 1, "Invasion of China", "Japan launches full-scale invasion of China", ""],
            [[1941,12,7], null, 1, "Pearl Harbor", "Japan attacks Pearl Harbor", "Attack_on_Pearl_Harbor"],
            [[1945,8,6], null, 1, "Hiroshima and Nagasaki", "Atomic bombings of Hiroshima and Nagasaki", "Atomic_bombings_of_Hiroshima_and_Nagasaki"],
          ]
        },
        {
          "name": "Culture",
          "color": "amber",
          "dates": [
            [[538], null, 1, "Buddhism", "Introduction of Buddhism from China", "Buddhism"],
            [[607], null, 1, "Hōryū-ji", "Hōryū-ji Temple is founded", "Horyu-ji"],
            [[712], null, 1, "Kojiki", "The Kojiki (古事記), Japan's first written document, is created", "Kojiki"],
            [[752], null, 1, "Great Buddha", "The Great Buddha of the Tōdai-ji Temple is completed", "Tōdai-ji"],

            [[864], null, 1, "Mount Fuji erupts", "", ""],
            [[905], null, 1, "Samurai", "Word \"samurai\" appears in the Kokin Wakashu poem collection", ""],
            [[1008], null, 1, "Tale of Genji", "The Tale of Genji published, considered world's first novel", ""],
            [[1498], null, 1, "Meio Nankaido Earthquake", "", ""],
            [[1600], null, 1, "Red Seal Ships", "Japan begins trade missions known as the Red Seal Ships", ""],
            [[1707], null, 1, "Mount Fuji erupts", "", ""],
            [[1923], null, 1, "Great Kanto Earthquake", "", ""],
            [[1964], null, 1, "Summer Olympics", "Tokyo hosts the Summer Olympics", ""],
            [[1968], null, 1, "Economy", "Japan becomes world's second biggest economy", ""],
            [[1991], null, 1, "Economic Crash", "Japanese economic bubble pops, asset prices plunge", ""],
            [[2002], null, 1, "World Cup", "Japan and South Korea host the FIFA World Cup", ""],
            [[2010], null, 1, "China overtakes Japan", "China overtakes Japan as world's second biggest economy", ""],
            [[2011,3,11], null, 1, "Tohoku Earthquake", "Tohoku Earthquake and Tsunami", "2011_Tōhoku_earthquake_and_tsunami"],
          ]
        }
      ]
    },

    // History of China
    {
      "name": "History of China",
      "description": "A timeline of Chinese history. Events are sorted in the categories Politics, Culture, Science. The category Periods shows the accepted succession of historical periods.",
      "color": "red",
      "options": {
        "min": [-1100,1,1],
        "max": [2100,1,1],
      },
      "groups": [
        {
          "name": "Dynasties",
          "color": "red",
          "dates": [
            [[-2070],       [-1600],      2, "Xia", "", "Xia_dynasty"],
            [[-1600],       [-1046],      2, "Shang", "", "Shang_dynasty"],
            [[-1046],       [-256],       2, "Zhou", "", "Zhou_dynasty"],
            [[-722],        [-476],       2, "Spring & Autumn", "", "Spring_and_Autumn_period"],
            [[-476],        [-221],       2, "Warring States", "", "Warring_States_period"],
            [[-221],        [-206],       2, "Qin", "", "Qin_dynasty"],
            [[-206],        [220],        2, "Han", "", "Han_dynasty"],
            [[220],         [280],        2, "Three Kingdoms", "", "link"],
            [[266],         [420],        2, "Jin", "", "link"],
            [[420],         [589],        2, "Northern and Southern", "", "link"],
            [[581],         [618],        2, "Sui", "", "link"],
            [[618],         [907],        2, "Tang", "", "link"],
            [[907],         [960],        2, "Five Dynasties, 10 Kingdoms", "", "link"],
            [[960],         [1279],       2, "Song, Liao, Jin, Western Xia", "", "link"],
            [[1271],        [1368],       2, "Yuan", "", "link"],
            [[1368],        [1644],       2, "Ming", "", "link"],
            [[1644],        [1912],       2, "Qing", "", "link"],
            [[1912],        [2021],       2, "Republic of China", "", "link"],
            [[1949],        [2021],       2, "Peoples Republic of China", "", "link"]
          ]
        },
        {
          "name": "Politics",
          "color": "purple",
          "dates": [
            [[-2711],       [-2598],      2, "Yellow Emperor", "", "Yellow_Emperor"],
            [[-2295],       [-2197],      2, "Yu the Great", "", "Yu_the_Great"],
            [[-1046],       null,         1, "Battle of Muye", "", "Battle_of_Muye"],
            [[-259,2,18],   [-210,9,10],  2, "Qin Shi Huang", "", "Qin_Shi_Huang"],
            [[208],         null,         1, "Battle of Red Cliffs", "", "Battle_of_Red_Cliffs"],
            [[624,2,17],    [705,12,16],  2, "Wu Zetian", "", "Wu_Zetian"], 
            [[630],         [700,11,11],  2, "Di Renjie", "", "Di_Renjie"], 
            [[1893,12,26],  [1976,11,9],  2, "Mao Zedong", "", "Mao_Zedong"]
          ]
        },
        {
          "name": "Culture",
          "color": "amber",
          "dates": [
            [[-551],        [-479],       2, "Confucius", "", "Confucius"],
            [[-340],        [-278],       2, "Qu Yuan", "", "Qu_Yuan"],
            [[-296],        null,         1, "Bamboo Annals", "", "Bamboo_Annals"],
            [[-94],         null,         1, "Records of the Grand Historian", "", "Records_of_the_Grand_Historian"],
            [[627],         null,         1, "Journey to the West", "", "Journey_to_the_West"]
          ]
        },
        {
          "name": "Science",
          "color": "blue",
          "dates": [
            [[78],          [139],        2, "Zhang Heng", "", "link"], 
            [[132],         null,         1, "Seismograph", "", "link"], 
            [[141],         [208],        2, "Hua Tuo", "", "link"], 
            [[150],         [219],        2, "Zhang Zhongjing", "", "link"]
          ]
        }
      ]
    },

    // // History of Science
    // {
    //   "name": "History of Sciene",
    //   "description": "A timeline of scientific discoveries. Events are sorted in the categories Physics, Chemistry, Biology, Medicine. The category Periods shows the accepted succession of historical periods.",
    //   "color": "blue",
    //   "options": {
    //     "min": [-1100,1,1],
    //     "max": [2100,1,1],
    //   },
    //   "groups": [
    //     {
    //       "name": "Periods",
    //       "color": "red",
    //       "dates": [
    //         [[-1000], [300], 2, "Yayoi", "弥生時代","Yayoi_period"],
    //       ]
    //     },
    //     {
    //       "name": "Politics",
    //       "color": "purple",
    //       "dates": [
    //         [[-189], null, 1, "Himiko", "Queen Himiko (卑弥呼), Japan's first known ruler, comes to power", "Himiko"],
            
    //       ]
    //     },
    //     {
    //       "name": "Culture",
    //       "color": "amber",
    //       "dates": [
    //         [[538], null, 1, "Buddhism", "Introduction of Buddhism from China", "Buddhism"],
            
    //       ]
    //     },
    //     {
    //       "name": "Science",
    //       "color": "blue",
    //       "dates": [
    //         [[538], null, 1, "Buddhism", "Introduction of Buddhism from China", "Buddhism"],
            
    //       ]
    //     }
    //   ]
    // },

    // // History of Flight and Spacetravel
    // {
    //   "name": "History of Flight and Spacetravel",
    //   "description": "A timeline of scientific discoveries. Events are sorted in the categories Physics, Chemistry, Biology, Medicine. The category Periods shows the accepted succession of historical periods.",
    //   "color": "blue",
    //   "options": {
    //     "min": [-1100,1,1],
    //     "max": [2100,1,1],
    //   },
    //   "groups": [
    //     {
    //       "name": "Periods",
    //       "color": "red",
    //       "dates": [
    //         [[-1000], [300], 2, "Yayoi", "弥生時代","Yayoi_period"],
    //       ]
    //     },
    //     {
    //       "name": "Politics",
    //       "color": "purple",
    //       "dates": [
    //         [[-189], null, 1, "Himiko", "Queen Himiko (卑弥呼), Japan's first known ruler, comes to power", "Himiko"],
            
    //       ]
    //     },
    //     {
    //       "name": "Culture",
    //       "color": "amber",
    //       "dates": [
    //         [[538], null, 1, "Buddhism", "Introduction of Buddhism from China", "Buddhism"],
            
    //       ]
    //     },
    //     {
    //       "name": "Science",
    //       "color": "blue",
    //       "dates": [
    //         [[538], null, 1, "Buddhism", "Introduction of Buddhism from China", "Buddhism"],
            
    //       ]
    //     }
    //   ]
    // },

    // Ancient Rome
    {
      "name": "Ancient Rome",
      "description": "A timeline of ancient Rome.",
      "color": "amber",
      "options": {
        "min": [-1100,1,1],
        "max": [1600,1,1],
      },
      "groups": [
        {
          "name": "Periods",
          "color": "red",
          "dates": [
            [[-750], [-510], 2, "Roman Kingdom", "Rome is ruled by the (semi-mythological) seven kings of Rome: Romulus, Numa Pompilius, Tulus Hostilius, Ancus Marcius, Lucius Tarquinius Priscus, Servius Tullius, Lucius Tarquinius Superbus. ", "Roman_Kingdom"],
            [[-509], [-28], 2, "Roman Republic", "The Roman Republic is ruled with a system of elected officials.", "Roman_Republic"]
            [[-27], [394], 2, "Roman Empire", "The Roman Empire is ruled by an emperor.", "Roman_Empire"]
            [[395], [476], 2, "Western Roman Empire", "The Western Roman Empire.", "Western_Roman_Empire"]
            [[395], [1453], 2, "Eastern Roman Empire", "The Eastern Roman Empire (Byzantine Empire).", "Byzantine_Empire"]
          ]
        },
        {
          "name": "Politics",
          "color": "purple",
          "dates": [

            [[-753], null, 1, "Traditional founding of Rome", "According to legend, Rome is founded by Romulus.", ""],
            [[-390], null, 1, "Sack of Rome by the Gauls", "Rome is sacked by the Gauls under Brennus.", ""],
            [[-264], [-241], 2, "First Punic War", "First major conflict between Rome and Carthage over control of Sicily.", ""],
            [[-218], [-201], 2, "Second Punic War", "Hannibal leads Carthaginian forces in a daring invasion of Italy.", ""],
            [[-149], [-146], 2, "Third Punic War", "Rome destroys Carthage, ending the Punic Wars.", ""],
            [[-133], null, 1, "Tiberius Gracchus murdered", "Beginning of political unrest leading to the fall of the Republic.", ""],
            [[-60], null, 1, "Formation of the First Triumvirate", "Julius Caesar, Pompey, and Crassus form an alliance.", ""],
            [[-49], [-45], 2, "Caesar's Civil War", "Julius Caesar defeats Pompey, becoming dictator of Rome.", ""],
            [[-44], null, 1, "Assassination of Julius Caesar", "Julius Caesar is assassinated on the Ides of March.", ""],
            [[-31], null, 1, "Battle of Actium", "Octavian defeats Antony and Cleopatra, becoming ruler of Rome.", ""],
            [[-27], null, 1, "Octavian becomes Augustus", "Octavian becomes the first Emperor of Rome, establishing the Empire.", ""],
            [[70], null, 1, "Destruction of the Second Temple", "Roman army destroys the Second Temple in Jerusalem.", ""],
            [[79], null, 1, "Eruption of Mount Vesuvius", "Volcanic eruption buries Pompeii and Herculaneum.", ""],
            [[235], [285], 2, "Crisis of the Third Century", "Period of political instability, economic crisis, and civil wars.", "Crisis_of_the_Third_Century"]
            [[313], null, 1, "Edict of Milan", "Constantine grants religious tolerance to Christians in the Roman Empire.", ""],
            [[395], null, 1, "Division of the Roman Empire", "The Roman Empire splits into the Western Roman Empire and the Eastern Roman Empire (Byzantine Empire)."]
            [[410], null, 1, "Sack of Rome by the Visigoths", "Rome is sacked for the first time in over 800 years.", ""],
            [[476], null, 1, "Fall of the Western Roman Empire", "Traditional date for the fall of the Western Roman Empire.", ""],

          ]
        },
        {
          "name": "Culture",
          "color": "amber",
          "dates": [
            [[-620], null, 1, "Ostia", "Possible founding date for Ostia, the port of Rome. ", ""],
            
          ]
        },
      ]
    },


    
    ] // End Timelines
  }

}
