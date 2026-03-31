export const projectsData = [
    {
       id: 1,
        name: "support d'analyse de conformité",
        contexte: " Les Données Personnelles sont réglementées par les lois européennes, le RGPD. Avec l’augmentation des IA et de leur utilisation, se pose la question des données et de leur utilisation dans ce domaine. Depuis le 1er aout 2024, l’Union Européenne a publié l’IA ACT, un texte de loi pour encadrer l’usage des IA. Dans le Cadre de mon stage, j’ai étudié ; auprès de la DPO de l’académie de Lyon ; ce nouveau règlement.",
        besoin: "Pour aider les professeurs souhaitant utiliser les IA, nous souhaitions créer un support d'aide à l'évaluation de la conformité d'une IA en concordance avec le RIA. Un support qui analysera l’utilisation, les données et le domaine d’étude de l’IA. ",
        tools: ['textes RGPD','Google Colab','Albert'],        
        realisation: "1.J’ai étudié les textes de lois pour calibrer des questions auxquels les utilisateurs devront répondre." +
           "2.Les utilisateurs enregistrent dans un questionnaire détaillé des informations concernant leur IA tel que le but, les données récoltées pour son entrainement ainsi que leur utilisation."+
            "3.J’ai ensuite étudié des solutions possibles ; nous souhaitions partir sur le même principe qu’une des IA utilisé au sein de l’organisme."+
            "J’ai donc entrepris des recherches pour comprendre les IA et leur utilisation et ais proposé une version de prompt.",
        bilan: "Bien que le projet n’ait pas pu aboutir à une production fonctionnelle, celui-ci m’a permis de développer des compétences sur les nouvelles technologies, les IA génératrices. J’ai aussi acquis des connaissances sur des notions importantes telles que la gestion des données, ainsi que l’optimisation des récoltes de données mais aussi les risques de cybersécurité et des enjeux juridique associés à toutes ces notions. ",
    },
    {
        id: 2,
        name: 'GLPI',
        contexte: "Pour enrichir mes connaissances en première année de BTS SIO, nous avons entrepris l'installation de GLPI sur un système Linux Debian 12. L’objectif étant d'acquérir une compréhension approfondie d’un processus d'installation de logiciel de gestion de parc informatique au sein d'un environnement Debian.",
        besoin: "Le logiciel GLPI très utilisé dans le domaine de la gestion de parc informatique, permet d’appréhender les gestions de tickets et d’un parc informatique. De plus, par ce projet se développe des compétences d’installation sur du Linux. ",
        tools: ['ferme de serveur','Debian12'],        
        realisation: "1.Après l’installation des Machines virtuelle, nous avons installé les serveur apache et les extensions php, MySQL."+
            "2. Ensuite nous avons installé le GLPI et configuré les droits administrateur et la création de compte."+
            "3. Nous avons ensuite réalisé une base de donnés manuellement et tester les fonctions de ticketing.",
        bilan:'Ce projet m’a permis de développer des connaissances d’installation et une plus ample compréhension des systèmes linux, des machines virtuelles et des dépendances réseau. L’utilisation de GLPI fut un expérience réelle de gestion de ticket et d’insertion dans un environnement de travail. ',
    },
    {
        id: 3,
        name: 'Outil d’analyse de migration',
        contexte: "Suite à une directive de l’entreprise, le site à eu un changement de logiciel de GED, les documents de l’ancien logiciel ont été migré.",
        besoin: "Comme il y’a eu des problème de paramétrage de la migration, il fallait un outil pour analyser les erreurs et lister les modifications à réaliser. ",
        tools: ['Python’,’Pandas’,’Tkinter'],        
        realisation: "1. . Création de l’architecture du projet : choix d’une architecture SOLID couplé à un MVC pour le front . "+
            "2. Réalisation de l’algorithme suite à une pré-analyse des erreurs de migrations."+
            "3.Développement d’un interface graphique avec Tkinter.",
        bilan:'Ce projet m’a permis de développer des compétences de traitement de données et de création de logiciel lourd. ',
    },
    { id: 4,
        name: 'Locamoi',
        contexte: "locamoi est un site de location de logement en ligne, il permet utilisateurs de se connecter à un compte et de réserver une location touristique avec le même principe que Airbnb.",
        besoin: " Afin de s’initier aux API et de nous familiariser avec une architecture qui permet l’évolution d’un logiciel, nous avions besoin de créer un site de réservation avec une API qui renvoi des informations depuis un serveur de données. L’utilisation d’une api permet une meilleure gestion des flux et pérenniser l’entretien du site. ",
        tools: ['ferme de serveur','PHP','HTML','JS'],        
        realisation: "1.L’analyse par un MCD puis MLD débouche sur la création d’une base de données ."+
            "2. Création de l’API : établir les requêtes et les appels."+
            "3.Codage du Site web avec appel de l’API par JS.",
        bilan:'Ce projet m’a permis de développer des connaissances sur les API et de développer un site fonctionnel en prenant en compte les demande du marché. ',
    },
    {
         id: 5,
         name: "",
         contexte: "",
         besoin: " ",
         tools: [''],        
         realisation: '',
         bilan:'',
        
    }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',

// id: 1,
//        id: 1,
//        name: "",
//        contexte: "",
//        besoin: " ",
//        tools: ['textes RGPD','Google Colab','Albert'],        
//        realisation: '',
//        bilan:'',
    
// },


