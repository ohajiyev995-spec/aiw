/* Data for Hogwarts: Houses & Wizards */
(function () {
  const createHouse = (house) => Object.freeze(house);
  const createWizard = (wizard) => Object.freeze(wizard);
  const createSpell = (spell) => Object.freeze(spell);

  window.HOUSES = Object.freeze([
    createHouse({
      id: "gryffindor",
      name: "Gryffindor",
      founder: "Godric Gryffindor",
      mascot: "Lion",
      colors: ["Scarlet", "Gold"],
      traits: ["Bravery", "Chivalry", "Daring"],
      relic: "Sword of Gryffindor",
      ghost: "Nearly Headless Nick",
      established: 990,
      milestones: [
        {
          year: 990,
          title: "Founding of Gryffindor Tower",
          description:
            "Godric Gryffindor helped establish the house to nurture witches and wizards who valued courage and righteous action above all else.",
        },
        {
          year: 1992,
          title: "Sword Revealed",
          description:
            "The sword of Gryffindor manifested to aid young heroes when true bravery was shown beneath Hogwarts.",
        },
      ],
        summary:
          "Gryffindor champions daring acts and moral courage, urging students to protect others even when the cost is high. Alumni often lead from the front, inspiring communities with bold compassion and a refusal to accept tyranny or injustice.",
        img: "https://img.icons8.com/color/512/gryffindor.png",
      alt: "Gryffindor House Crest",
    }),
    createHouse({
      id: "slytherin",
      name: "Slytherin",
      founder: "Salazar Slytherin",
      mascot: "Serpent",
      colors: ["Emerald", "Silver"],
      traits: ["Ambition", "Resourcefulness", "Cunning"],
      relic: "Salazar's Locket",
      ghost: "The Bloody Baron",
      established: 990,
      milestones: [
        {
          year: 996,
          title: "Chamber Concealed",
          description:
            "Salazar Slytherin reportedly sealed his chamber deep within Hogwarts, leaving behind legends that shaped the house's mystique for centuries.",
        },
        {
          year: 1997,
          title: "Redemption of Reputation",
          description:
            "Students and alumni collaborated to reject pure-blood supremacy, demonstrating that ambition can advance justice as boldly as it pursues power.",
        },
      ],
        summary:
          "Slytherin prizes sharp minds and strategic ambition, teaching that influence can be wielded responsibly when guided by conviction. The house nurtures visionaries who adapt quickly, leverage opportunity, and lead transformative movements within the wizarding world.",
        img: "https://img.icons8.com/color/512/slytherin.png",
      alt: "Slytherin House Crest",
    }),
    createHouse({
      id: "ravenclaw",
      name: "Ravenclaw",
      founder: "Rowena Ravenclaw",
      mascot: "Eagle",
      colors: ["Sapphire", "Bronze"],
      traits: ["Wisdom", "Creativity", "Curiosity"],
      relic: "Diadem of Ravenclaw",
      ghost: "The Grey Lady",
      established: 993,
      milestones: [
        {
          year: 993,
          title: "Spiral Staircase Enchanted",
          description:
            "Rowena Ravenclaw enchanted the moving staircase that leads to the airy towers where the house debates, invents, and dreams.",
        },
        {
          year: 1996,
          title: "Lost Diadem Rediscovered",
          description:
            "The legendary diadem resurfaced briefly, reminding scholars of the responsibility that accompanies the pursuit of boundless knowledge.",
        },
      ],
        summary:
          "Ravenclaw elevates inquisitive spirits and original thinkers who see patterns others miss. Its students relish puzzles, prize wit, and delight in sharing knowledge that sparks innovation across magical disciplines and everyday life alike.",
        img: "https://img.icons8.com/color/512/ravenclaw.png",
      alt: "Ravenclaw House Crest",
    }),
    createHouse({
      id: "hufflepuff",
      name: "Hufflepuff",
      founder: "Helga Hufflepuff",
      mascot: "Badger",
      colors: ["Canary", "Charcoal"],
      traits: ["Loyalty", "Patience", "Fairness"],
      relic: "Hufflepuff's Cup",
      ghost: "The Fat Friar",
      established: 993,
      milestones: [
        {
          year: 993,
          title: "Feasting Halls Unified",
          description:
            "Helga Hufflepuff enchanted the Hogwarts kitchens, ensuring every student would be welcomed with warmth, nourishment, and equality.",
        },
        {
          year: 1998,
          title: "Defenders of the Castle",
          description:
            "Hufflepuff students stood steadfast in the castle defense, exemplifying the house's legendary perseverance and inclusive bravery.",
        },
      ],
        summary:
          "Hufflepuff celebrates steadfast hearts who value cooperation over glory. Members cultivate inclusive communities, working diligently behind the scenes to lift others up while defending fairness with unshakeable resolve and kindness.",
        img: "https://img.icons8.com/color/512/hufflepuff.png",
      alt: "Hufflepuff House Crest",
    }),
  ]);

  window.WIZARDS = Object.freeze([
    createWizard({
      id: "harry-potter",
      name: "Harry Potter",
      house: "Gryffindor",
      years: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
      aliases: ["The Boy Who Lived", "Chosen One"],
      summary:
        "Harry grew from a cautious first-year into a resilient leader willing to challenge oppressive systems. Balancing loyalty to friends with the weight of prophecy, he repeatedly risked his safety to dismantle dark networks and defend the wider wizarding world from fear. His instinct to trust others kept resistance movements united even at their bleakest moments.",
      notableEvents: [
        {
          year: 1991,
          title: "Stone Safeguarded",
          description:
            "Protected the Philosopher's Stone alongside Ron and Hermione, foiling Voldemort's early return.",
        },
        {
          year: 1997,
          title: "Horcrux Hunt",
          description:
            "Led the hunt for Horcruxes while resisting the corruption of the Deathly Hallows' lure.",
        },
        {
          year: 1998,
          title: "Battle of Hogwarts",
          description:
            "Sacrificed himself and later defeated Voldemort, ending the Second Wizarding War.",
        },
        ],
        img: "https://hp-api.onrender.com/images/harry.jpg",
      alt: "Harry Potter",
      spoilerLevel: "high",
    }),
    createWizard({
      id: "hermione-granger",
      name: "Hermione Granger",
      house: "Gryffindor",
      years: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
      aliases: ["Brightest Witch of Her Age", "Minister for Magic"],
      summary:
        "Hermione channels encyclopedic knowledge into decisive action, advocating fiercely for marginalized groups and modernizing stagnant institutions. Her leadership blends pragmatism with empathy, making her a strategist who responds quickly to crisis without abandoning ethical considerations. She documents every mission, ensuring future students inherit transparent playbooks they can study and adapt with confidence instead of whispered legends.",
      notableEvents: [
        {
          year: 1992,
          title: "Polyjuice Strategist",
          description:
            "Brewed Polyjuice Potion to investigate the Chamber of Secrets threat.",
        },
        {
          year: 1995,
          title: "Dumbledore's Army",
          description:
            "Co-founded Dumbledore's Army, designing curriculum and defensive drills for fellow students.",
        },
        {
          year: 1998,
          title: "Ministry Reforms",
          description:
            "After the war, spearheaded legislation for house-elf rights and educational reform.",
        },
        ],
        img: "https://hp-api.onrender.com/images/hermione.jpeg",
      alt: "Hermione Granger",
      spoilerLevel: "low",
    }),
    createWizard({
      id: "ron-weasley",
      name: "Ron Weasley",
      house: "Gryffindor",
      years: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
      aliases: ["King Weasley", "Keeper Weasley"],
      summary:
        "Ron combines humor with tactical instincts, grounding friends during perilous missions. His loyalty and quick thinking repeatedly stabilize high-pressure plans, making him the trustworthy collaborator who spots overlooked angles and restores confidence when stakes climb. He measures success by the team's morale, often diffusing tension before nerves jeopardize a crucial move.",
      notableEvents: [
        {
          year: 1991,
          title: "Wizard Chess Champion",
          description:
            "Commanded a life-sized chess set to secure the Philosopher's Stone.",
        },
        {
          year: 1997,
          title: "Sword Retrieval",
          description:
            "Recovered the Sword of Gryffindor, enabling the destruction of Horcruxes.",
        },
        {
          year: 1998,
          title: "Battlefield Coordination",
          description:
            "Coordinated reinforcements during the Battle of Hogwarts.",
        },
        ],
        img: "https://hp-api.onrender.com/images/ron.jpg",
      alt: "Ron Weasley",
      spoilerLevel: "high",
    }),
    createWizard({
      id: "albus-dumbledore",
      name: "Albus Dumbledore",
      house: "Gryffindor",
      years: [1892, 1893, 1894, 1895, 1896],
      aliases: ["Headmaster", "Chief Warlock"],
      summary:
        "Dumbledore's visionary leadership shaped modern wizarding politics. A master of layered plans, he balanced compassion with calculated secrecy, orchestrating long-term strategies to dismantle dark movements while nurturing younger heroes to rise on their own merits. Even in failure he harvested lessons, documenting contingencies that enabled the Order to rebound stronger each time.",
      notableEvents: [
        {
          year: 1945,
          title: "Grindelwald Duel",
          description:
            "Defeated Gellert Grindelwald, ending a global wizarding conflict.",
        },
        {
          year: 1995,
          title: "Order Revived",
          description:
            "Reformed the Order of the Phoenix to oppose Voldemort's resurgence.",
        },
        {
          year: 1997,
          title: "Astronomy Tower Plan",
          description:
            "Arranged his own death to protect Draco Malfoy and secure Snape's cover.",
        },
        ],
        img: "https://img.icons8.com/color/512/albus-dumbledore.png",
      alt: "Professor Albus Dumbledore",
      spoilerLevel: "high",
    }),
    createWizard({
      id: "severus-snape",
      name: "Severus Snape",
      house: "Slytherin",
      years: [1971, 1972, 1973, 1974, 1975, 1976, 1977],
      aliases: ["Half-Blood Prince", "Professor Snape"],
      summary:
        "Snape navigated factional loyalties with relentless discipline, masking his true motives behind a stoic facade. His mastery of potions and counter-curses, paired with a covert pledge to protect Harry, positioned him as one of the war's most complex double agents. Every calculated slight reinforced his cover, buying time for resistance cells to regroup.",
      notableEvents: [
        {
          year: 1981,
          title: "Vow of Protection",
          description:
            "Swore to protect Lily Potter's son to atone for past choices.",
        },
        {
          year: 1996,
          title: "Unbreakable Vow",
          description:
            "Made an Unbreakable Vow with Narcissa Malfoy, furthering his cover.",
        },
        {
          year: 1997,
          title: "Headmastership",
          description:
            "Became Hogwarts headmaster while secretly sabotaging Death Eater control.",
        },
        ],
        img: "https://hp-api.onrender.com/images/snape.jpg",
      alt: "Professor Severus Snape",
      spoilerLevel: "high",
    }),
    createWizard({
      id: "minerva-mcgonagall",
      name: "Minerva McGonagall",
      house: "Gryffindor",
      years: [1947, 1948, 1949, 1950, 1951],
      aliases: ["Professor McGonagall", "Deputy Headmistress"],
      summary:
        "McGonagall blends stern composure with fierce advocacy for her students. A brilliant Transfiguration expert, she continually strengthens Hogwarts' defenses and models principled leadership that empowers others to act decisively under pressure. She mentors quietly between battles, ensuring each protege leaves with practical skills and the confidence to uphold Hogwarts' inclusive legacy.",
      notableEvents: [
        {
          year: 1995,
          title: "Umbridge Resistance",
          description:
            "Protected students from Dolores Umbridge's abuses, counseling targeted pupils.",
        },
        {
          year: 1998,
          title: "Castle Mobilized",
          description:
            "Enchanted the castle to defend itself during the final battle.",
        },
        ],
        img: "https://ik.imagekit.io/hpapi/mcgonagall.jpg",
      alt: "Professor Minerva McGonagall",
      spoilerLevel: "low",
    }),
    createWizard({
      id: "rubeus-hagrid",
      name: "Rubeus Hagrid",
      house: "Gryffindor",
      years: [1940, 1941, 1942],
      aliases: ["Keeper of Keys", "Professor Hagrid"],
      summary:
        "Hagrid's enormous heart bridges magical communities, introducing students to misunderstood creatures with patience and pride. Despite prejudice, he continuously opens Hogwarts' gates to outsiders, teaching empathy through hands-on care and unflinching loyalty. His cottage operates as a refuge where future defenders learn that kindness and courage grow from the same roots.",
      notableEvents: [
        {
          year: 1943,
          title: "Expulsion and Resilience",
          description:
            "Expelled after being framed, yet remained at Hogwarts as gamekeeper.",
        },
        {
          year: 1991,
          title: "Keeper of Secrets",
          description:
            "Delivered Harry's Hogwarts letter and safeguarded key missions.",
        },
        {
          year: 1998,
          title: "Battlefront Support",
          description:
            "Rescued students and creatures during the final battle.",
        },
        ],
        img: "https://hp-api.onrender.com/images/hagrid.png",
      alt: "Professor Rubeus Hagrid",
      spoilerLevel: "low",
    }),
    createWizard({
      id: "draco-malfoy",
      name: "Draco Malfoy",
      house: "Slytherin",
      years: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
      aliases: ["Seeker Malfoy"],
      summary:
        "Draco grapples with his family's expectations and the realities of war. Over time he questions inherited ideology, illustrating how empathy and shared danger can reshape even entrenched loyalties when given genuine alternatives and support. His reluctant acts of mercy sow doubt among followers, guiding him toward accountability after the conflict.",
      notableEvents: [
        {
          year: 1996,
          title: "Vanishing Cabinet Plot",
          description:
            "Repaired the Vanishing Cabinet under duress from Voldemort.",
        },
        {
          year: 1997,
          title: "Astronomy Tower Crisis",
          description:
            "Faced the impossible task of assassinating Dumbledore, ultimately lowering his wand.",
        },
        {
          year: 1998,
          title: "Battle of Hogwarts",
          description:
            "Rescued by Harry from Fiendfyre, beginning a shift in allegiances.",
        },
        ],
        img: "https://hp-api.onrender.com/images/draco.jpg",
      alt: "Draco Malfoy",
      spoilerLevel: "high",
    }),
    createWizard({
      id: "luna-lovegood",
      name: "Luna Lovegood",
      house: "Ravenclaw",
      years: [1992, 1993, 1994, 1995, 1996, 1997],
      aliases: ["Loony", "Quibbler Contributor"],
      summary:
        "Luna's unshakable optimism brings comfort to allies navigating grief and fear. Her creative thinking and willingness to believe in the extraordinary unlock unconventional solutions, proving that open-mindedness can be a tactical advantage as well as a personal philosophy. She normalizes vulnerability in strategy sessions, inviting teammates to voice concerns before battles begin.",
      notableEvents: [
        {
          year: 1995,
          title: "Mystery Department Battle",
          description:
            "Fought alongside Dumbledore's Army in the Department of Mysteries.",
        },
        {
          year: 1997,
          title: "Ravenclaw Insight",
          description:
            "Guided allies to Ravenclaw's common room to retrieve crucial clues.",
        },
        {
          year: 1998,
          title: "Calming Harry",
          description:
            "Helped Harry gain access to Hogwarts by rallying support at the Hog's Head.",
        },
        ],
        img: "https://hp-api.onrender.com/images/luna.jpg",
      alt: "Luna Lovegood",
      spoilerLevel: "low",
    }),
    createWizard({
      id: "neville-longbottom",
      name: "Neville Longbottom",
      house: "Gryffindor",
      years: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
      aliases: ["Dumbledore's Army Leader"],
      summary:
        "Neville evolves from timid student to decisive resistance leader. His steadfast courage during prolonged occupation exemplifies everyday heroism, demonstrating that perseverance and moral clarity can defeat fear even without fame or prophecy. He cultivates community gardens and secret meeting spaces that keep hope alive and nourish the fighters defending Hogwarts.",
      notableEvents: [
        {
          year: 1995,
          title: "Training Breakthrough",
          description:
            "Mastered advanced defensive spells with Dumbledore's Army.",
        },
        {
          year: 1997,
          title: "DA Underground",
          description:
            "Led the student resistance against the Carrows, protecting first-years.",
        },
        {
          year: 1998,
          title: "Nagini Defeated",
          description:
            "Destroyed the final Horcrux with the Sword of Gryffindor.",
        },
        ],
        img: "https://hp-api.onrender.com/images/neville.jpg",
      alt: "Neville Longbottom",
      spoilerLevel: "high",
    }),
  ]);

  window.SPELLS = Object.freeze([
    createSpell({
      id: "expelliarmus",
      name: "Expelliarmus",
      incantation: "Expelliarmus",
      type: "Charm",
      difficulty: "Intermediate",
      summary:
        "Expelliarmus is a standard dueling charm that redirects an opponent's magical momentum instead of returning raw force. Practitioners favor it for disarming quickly while avoiding escalation, buying time to regroup, negotiate, or bind an assailant with less hazardous follow-up spells.",
      effect: "Disarms an opponent by forcing their wand or held object away.",
      notableUsers: ["Harry Potter", "Remus Lupin"],
      counterSpells: ["Protego", "Shielding Charms"],
      img: "assets/img/spell-expelliarmus.webp",
      tags: ["Dueling", "Defense", "Disarm"],
      ministryClass: "Light magic",
    }),
    createSpell({
      id: "stupefy",
      name: "Stupefy",
      incantation: "Stupefy",
      type: "Jinx",
      difficulty: "Intermediate",
      summary:
        "Stupefy delivers a concise burst of magic that overwhelms a target's senses without inflicting lasting damage when used correctly. Aurors and professors alike rely on it to incapacitate threats swiftly, especially during structured training exercises or controlled security operations.",
      effect: "Renders a target unconscious with a non-lethal stunning blast.",
      notableUsers: ["Auror Corps", "Order of the Phoenix"],
      counterSpells: ["Protego", "Finite Incantatem"],
      img: "assets/img/spell-stupefy.webp",
      tags: ["Dueling", "Stunning", "Control"],
      ministryClass: "Potentially dangerous",
    }),
    createSpell({
      id: "protego",
      name: "Protego",
      incantation: "Protego",
      type: "Defensive",
      difficulty: "Intermediate",
      summary:
        "Protego conjures a translucent barrier that absorbs or deflects incoming spells, letting witches and wizards position themselves safely while planning a counter. Its versatility makes it a staple in defensive lessons, forming the base technique for numerous advanced shield variants.",
      effect: "Manifests a shield that blocks curses, jinxes, and hexes.",
      notableUsers: ["Hermione Granger", "Minerva McGonagall"],
      counterSpells: ["Finite Incantatem", "Protego Maxima"],
      img: "assets/img/spell-protego.webp",
      tags: ["Defense", "Shield", "Protective"],
      ministryClass: "Standard defensive magic",
    }),
    createSpell({
      id: "expecto-patronum",
      name: "Expecto Patronum",
      incantation: "Expecto Patronum",
      type: "Defensive",
      difficulty: "Advanced",
      summary:
        "Expecto Patronum channels protective emotion into a luminous guardian capable of repelling despair-inducing creatures and guiding allies through darkness. The spell demands practiced focus, yet disciplined casters use it to amplify morale and signal safe passage during coordinated patrols.",
      effect: "Summons a Patronus that wards off dark entities and conveys messages.",
      notableUsers: ["Harry Potter", "Kingsley Shacklebolt"],
      counterSpells: ["Finite Incantatem", "Protego Totalum"],
      img: "assets/img/spell-expecto-patronum.webp",
      tags: ["Defense", "Guardians", "Light"],
      ministryClass: "Non-verbally capable",
    }),
    createSpell({
      id: "wingardium-leviosa",
      name: "Wingardium Leviosa",
      incantation: "Wingardium Leviosa",
      type: "Charm",
      difficulty: "Beginner",
      summary:
        "Wingardium Leviosa introduces students to fine control over levitation, emphasizing steady wand movements and precise pronunciation. It allows mundane tasks to be completed safely at a distance, moving classroom equipment, brewing components, or precarious artifacts without physical strain.",
      effect: "Lifts and guides objects smoothly through the air.",
      notableUsers: ["Hermione Granger", "Charms Faculty"],
      counterSpells: ["Finite Incantatem"],
      img: "assets/img/spell-wingardium-leviosa.webp",
      tags: ["Levitation", "Classwork", "Utility"],
      ministryClass: "Instructional standard",
    }),
    createSpell({
      id: "lumos-nox",
      name: "Lumos / Nox",
      incantation: "Lumos / Nox",
      type: "Utility",
      difficulty: "Beginner",
      summary:
        "The paired Lumos and Nox incantations provide controlled illumination, casting a focused beam of light and extinguishing it instantly when no longer needed. Students practice the sequence to maintain awareness in dark corridors, archives, or fieldwork sites without dazzling companions.",
      effect: "Generates or dismisses wand light for improved visibility.",
      notableUsers: ["Hogwarts Students", "Field Researchers"],
      counterSpells: ["Nox", "Finite Incantatem"],
      img: "assets/img/spell-lumos-nox.webp",
      tags: ["Light", "Exploration", "Utility"],
      ministryClass: "Everyday magic",
    }),
    createSpell({
      id: "accio",
      name: "Accio",
      incantation: "Accio",
      type: "Utility",
      difficulty: "Intermediate",
      summary:
        "Accio summons distant objects with practiced intent, letting witches and wizards retrieve tools, documents, or protective gear without abandoning their position. Properly executed, the charm follows clear mental direction, reducing wasted motion during timed exams or dynamic dueling drills.",
      effect: "Summons an object directly to the caster's location.",
      notableUsers: ["Hermione Granger", "Cedric Diggory"],
      counterSpells: ["Protego", "Finite Incantatem"],
      img: "assets/img/spell-accio.webp",
      tags: ["Summoning", "Logistics", "Utility"],
      ministryClass: "Non-verbally capable",
    }),
    createSpell({
      id: "alohomora",
      name: "Alohomora",
      incantation: "Alohomora",
      type: "Charm",
      difficulty: "Beginner",
      summary:
        "Alohomora manipulates simple locking mechanisms, enabling quick access for authorized witches and wizards who demonstrate delicate wandwork. Stewards and professors teach it alongside etiquette, stressing responsible use when retrieving stored equipment, assisting caretakers, or evacuating secured classrooms under supervision.",
      effect: "Unlocks basic latches, bolts, and catches.",
      notableUsers: ["Nymphadora Tonks", "Hermione Granger"],
      counterSpells: ["Colloportus", "Finite Incantatem"],
      img: "assets/img/spell-alohomora.webp",
      tags: ["Utility", "Access", "Locks"],
      ministryClass: "Light magic",
    }),
    createSpell({
      id: "petrificus-totalus",
      name: "Petrificus Totalus",
      incantation: "Petrificus Totalus",
      type: "Jinx",
      difficulty: "Intermediate",
      summary:
        "Petrificus Totalus locks a target's limbs rigidly, pausing movement while leaving vital functions unharmed. Defense teams employ it when containment matters more than injury, coordinating follow-up restraints or safe relocation once a situation is stabilized and assessed.",
      effect: "Immobilizes a target's body in a rigid bind.",
      notableUsers: ["Minerva McGonagall", "Auror Trainees"],
      counterSpells: ["Finite Incantatem", "Rennervate"],
      img: "assets/img/spell-petrificus-totalus.webp",
      tags: ["Restraint", "Defense", "Control"],
      ministryClass: "Potentially dangerous",
    }),
    createSpell({
      id: "sectumsempra",
      name: "Sectumsempra",
      incantation: "Sectumsempra",
      type: "Curse",
      difficulty: "Advanced",
      summary:
        "Sectumsempra carves lacerations along an opponent's projected outline, necessitating advanced discipline and immediate medical oversight. Instructors categorize it as a last-resort defensive measure, emphasizing simulation-based study rather than field use to discourage reckless experimentation by curious students.",
      effect: "Slices along the target's path, inflicting deep gashes.",
      notableUsers: ["Advanced Defense Students", "Severus Snape"],
      counterSpells: ["Vulnera Sanentur", "Episkey"],
      img: "assets/img/spell-sectumsempra.webp",
      tags: ["Dueling", "Dangerous", "Curse"],
      ministryClass: "Restricted magic",
    }),
    createSpell({
      id: "obliviate",
      name: "Obliviate",
      incantation: "Obliviate",
      type: "Charm",
      difficulty: "Advanced",
      summary:
        "Obliviate streamlines selected memories, allowing trained Minders to remove sensitive information without destabilizing a subject's identity. Ministry teams use it under strict guidelines, documenting every application to protect witnesses, maintain secrecy, and comply with cross-departmental investigative protocols.",
      effect: "Modifies or erases targeted memories with precision.",
      notableUsers: ["Gilderoy Lockhart", "Obliviator Squad"],
      counterSpells: ["Rennervate", "Pensieve Review"],
      img: "assets/img/spell-obliviate.webp",
      tags: ["Memory", "Mind Magic", "Secrecy"],
      ministryClass: "Requires certification",
    }),
    createSpell({
      id: "riddikulus",
      name: "Riddikulus",
      incantation: "Riddikulus",
      type: "Counter-curse",
      difficulty: "Beginner",
      summary:
        "Riddikulus transforms a feared boggart into something ridiculous, breaking its hold through laughter and confident imagination. Professors favor it for resilience lessons, helping students redirect anxiety into humor and reinforcing teamwork as classmates support each other's chosen counter-images.",
      effect: "Forces a boggart into a humorous shape, weakening it.",
      notableUsers: ["Remus Lupin", "Neville Longbottom"],
      counterSpells: ["Finite Incantatem", "Patronus Training"],
      img: "assets/img/spell-riddikulus.webp",
      tags: ["Defense", "Boggart", "Resilience"],
      ministryClass: "Light magic",
    }),
  ]);
})();