``// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
      
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],  
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      0.5,      0.7,      1.05,   1,      1,      1,      1,      1],
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],     
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
        stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],    
        shotgun:        [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        hurricane: [1, 1, 1, 1, 1.3, 1.3, 1.1, 1.5, 1.15, 1, 1, 1, 1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
            propel:     [0.9,   0.8,   1,      1,      0.8,    0.9,    0.9,    0.7,    0.7,    0.5,    0.9,    1,      0.9],
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            revix:      [0.8,   1,     1,      0.4,    0.8,    0.8,    0.8,    2,      1,      8,      1,      1,      0.8],
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],     
            DeltaCannon:[1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],
  /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      2,      2,      1.2,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
            expl:       [3,   0,     10,     1,    2.5,    1.2,    1.2,    0,        2,      5,    1,      0,      1],  
            expl2:      [3,     2,     1,      1,      1,      1,      1,      0.5,    0.7,    0.8,    1,      1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],
            twist: [1, 1, 1, 0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [2.5,   1,     1,      0.85,   1,      2,    1.5,        0.9,    1,    1,      2,      1,      1], 
        meta:           [1.5,   1,     1,      1,      1,      1,  1,      0.8,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.8,    0.8,    0.5,    0.7,    0.45,   0.5,    1,      1],   
        master:         [3,     1,     1,      0.9,    0.6,    1.1,    1,      0.8,      1,      0.3,    0.7,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.8,    0.95,    0.8,    1,      1,      1,      1,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7],
    highpower:          [1,     1,     0.5,    1,      1.5,    1.5,    1.3,    1,      1,      1,      1,      1.5,    1.3],
    og:                 [1,   1,     1,      1,      1.1,    1.1,    1.2,    1.1,      1,      1,      1,      1,      1.1],
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    buzzreload:         [0.35,  0,     1,      1,      1,      1,      1,      0,      1,      1,      1,      1,      1],
    flamethrower:       [0.6,  0.8,   1,      1,      1,      0.7,      0.9,      2,      1,      6,      1,      10,      1], 
    lance:              [0.4,  0,   1,      1,      1,      0.8,      0.8,      1,      1,      4,      0.8,      1,      1], 
    sword:              [0.4,  0,     1,      1,      1,      1,      1,      1.2,      1,      5,    1,      1,      1.1], 
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    jumpsmashreload:         [8,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1],
    halfdamage:         [1,     1,     1,      1,      1,      0.5,      1,      1,      1,      1,    1,      1,      1], 
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    nodam: [1, 4, 1, 1, 1, 0, 1, 1, 1, 0.0001, 1, 1, 1],
    redist: [8, 10, 1, 0.4, 5, 5, 5, 1, 1, 2, 1.3, 0.1, 1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],        
    protectorswarm: [5, 0.000001, 1, 1, 5, 5, 5, 1, 1, 1, 5, 1, 10],
    bobcatdom: [3, 0, 1, 1, 10, 10, 10, 1.5, 1, 1, 5, 1, 1],
    dom: [3, 0, 1, 1, 10, 10, 10, 1, 1, 1, 5, 1, 1],
    dom2: [3, 0, 1, 1, 2, 2, 2, 1.5, 1, 1, 5, 1, 1],
    dom3: [2, 0, 1, 1, 5, 5, 8, 2, 1, 1.5, 5, 1, 1],
    xkbattlec: [2, 0, 1, 1, 2, 2, 2, 3, 1, 1.5, 5, 1, 1],
    arena: [0.76, 0, 1, 1, 9e99, 9e99, 9e99, 10, 1, 10, 1, 1, 5],
    hyperspeed: [1, 1, 1, 1, 1, 1, 1, 2, 2.1, 1, 1, 0.11, 1],
    domspray: [0.3, 0, 1, 1, 1.3, 1.3, 1.3, 0.8, 1, 1, 5, 5, 1],
    fdom: [2.5, 0, 1, 1, 1.5, 2, 1.5, 1.5, 1, 1.5, 1, 1, 1],
    obliteratorDominator: [4.5, 0, 1, 0.95, 15, 15, 15, 0.5, 1, 1, 1, 0.5, 1],
    basicDominator: [1.5, 0, 0.25, 0.9, 2, 2, 2, 1.3, 2, 1.5, 1, 4, 1],
    destroyerdominator: [6, 0, 1, 1, 10, 10, 10, 0.5, 1, 1, 1, 1.25, 1],
    megaop: [0.5, -1, 1, 1.25, 9, 9, 15, 7, 5, 1, 5, 1, 1],
    speedbenttag:   [0.9, 1,     1,      1,      0.9,      0.8,      1,      0.9,      1,      1,      1,      1,      1],
    lucasop:   [1, 1,     1,      1,      0.9,      0.8,      1,      0.9,      1,      3,      1,      1,      1], 
    splitter:            [0.05,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      360,      1],
    auto_turret: [1.1, 0.3, 0.9, 1.125, 0.6, 0.255, 0.94, 1.6, 1.2, 1, 0.3, 0.75, 1.75],
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
    lancer: 8,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase, explode
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    SHOOT_ON_DEATH: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    UPGRADES_TIER_4: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};
exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};


exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };
// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.explosion = {
    PARENT: [exports.bullet],
    LABEL: 'Bullet',
    MOTION_TYPE: 'slowexplode', // motor, swarm, chase, explode
    TYPE: 'bullet',
    PERSISTS_AFTER_DEATH: true,
    ACCEPTS_SCORE: false,
    BODY: {
    PENETRATION: 3,
    SPEED: 0,
    RANGE: 90,
    DENSITY: 10,
    HEALTH: 10 * wepHealthFactor,
    DAMAGE: 1 * wepDamageFactor,
    PUSHABILITY: 0
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: true,
    TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.egg, { COLOR: 99 }]
    }
  ]
};
exports.flame = {
    PARENT: [exports.bullet],
    LABEL: 'Bullet',
    MOTION_TYPE: 'fastexplode', // motor, swarm, chase, explode
    TYPE: 'bullet',
    PERSISTS_AFTER_DEATH: true,
    ACCEPTS_SCORE: false,
    BODY: {
    PENETRATION: 2,
    SPEED: 1,
    RANGE: 3,
    DENSITY: 1,
    HEALTH: 1 * wepHealthFactor,
    DAMAGE: 1 * wepDamageFactor,
    PUSHABILITY: 0
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: true,
    TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [16, 0, 0, 0, 0, 1],
      TYPE: [exports.egg, { COLOR: 99 }]
    }
  ]
};
exports.lancerbullet = {
    PARENT: [exports.bullet],
    INVISIBLE: [0, 1],
    LABEL: 'Bullet',
    TYPE: 'bullet',
    PERSISTS_AFTER_DEATH: true,
    ACCEPTS_SCORE: false,
    BODY: {
    PENETRATION: 1,
    SPEED: 2.5,
    RANGE: 1,
    DENSITY: 1,
    HEALTH: 1 * wepHealthFactor,
    DAMAGE: 1 * wepDamageFactor,
    PUSHABILITY: 0
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: true,
};
exports.injectbullet = {
    PARENT: [exports.bullet],
    INVISIBLE: [0, 1],
    POISON: true,
    POISONEFFECTIVENESS: {HP: 5, HPP:0.1, SH: 8, SHP:0.1, Time:3, AddTime:0, ExpDam:1, Interval: 300},
    FREEZE: true,
    FREEZEEFFECTIVENESS: {SlowMulti: 0.7, Time:5, AddTime:0},
    LABEL: 'Bullet',
    TYPE: 'bullet',
    PERSISTS_AFTER_DEATH: true,
    ACCEPTS_SCORE: false,
    BODY: {
    PENETRATION: 1,
    SPEED: 2.5,
    RANGE: 1,
    DENSITY: 1,
    HEALTH: 1 * wepHealthFactor,
    DAMAGE: 1 * wepDamageFactor,
    PUSHABILITY: 0
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: true,
};
exports.explosionop = {
    PARENT: [exports.bullet],
    LABEL: 'Bullet',
    MOTION_TYPE: 'explode', // motor, swarm, chase, explode
    TYPE: 'bullet',
    PERSISTS_AFTER_DEATH: true,
    ACCEPTS_SCORE: false,
    BODY: {
    PENETRATION: 100,
    SPEED: 0,
    RANGE: 90,
    DENSITY: 1000,
    HEALTH: 100 * wepHealthFactor,
    DAMAGE: 1000 * wepDamageFactor,
    PUSHABILITY: 999
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: true,
    TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.egg, { COLOR: 99 }]
    }
  ]
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };
exports.testbullet = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 5, HPP:0.5, SH: 8, SHP:0, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: 0.5, Time:10, AddTime:0},
};
exports.testbullet3 = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 5, HPP:0.5, SH: 8, SHP:0, Time:5, AddTime:0, ExpDam:1, Interval: 100},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: 0.5, Time:5, AddTime:0},
};
exports.testbullet2 = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 5, HPP:0.1, SH: 8, SHP:0.1, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: 0.7, Time:5, AddTime:0},
};
exports.CCB = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 4, HPP:0.1, SH: 6, SHP:0.1, Time:2, AddTime:0, ExpDam:1, Interval: 300},
  FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: 0.45, Time:4, AddTime:0},
};
exports.poisonbullet = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 5, HPP:0.3, SH: 8, SHP:0, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: false,
  FREEZEEFFECTIVENESS: {SlowMulti: 0, Time:10, AddTime:0},
};
exports.earthbullet = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 4, HPP:0.4, SH: 7, SHP:0, Time:2.5, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: false,
  FREEZEEFFECTIVENESS: {SlowMulti: 0, Time:10, AddTime:0},
};

exports.freezebullet = {
  PARENT: [exports.bullet],
  POISON: false,
  POISONEFFECTIVENESS: {HP: 5, HPP:0.5, SH: 8, SHP:0, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: 0.5, Time:10, AddTime:0},
};
exports.healingbullet = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 5, HPP:-0.5, SH: 8, SHP:-0.5, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: false,
  FREEZEEFFECTIVENESS: {SlowMulti: 0, Time:5, AddTime:0},
};
exports.speedbullet = {
  PARENT: [exports.bullet],
  POISON: false,
  POISONEFFECTIVENESS: {HP: 5, HPP:0.5, SH: 8, SHP:0, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: -0.5, Time:10, AddTime:0},
};
exports.angelbullet = {
  PARENT: [exports.bullet],
  POISON: true,
  POISONEFFECTIVENESS: {HP: 5, HPP:-0.5, SH: 8, SHP:-0.5, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: -0.5, Time:10, AddTime:0},
};
exports.stunbullet = {
  PARENT: [exports.bullet],
  POISON: false,
  POISONEFFECTIVENESS: {HP: 5, HPP:-0.5, SH: 8, SHP:-0.5, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: 0, Time:1, AddTime:0},
};
exports.brr = {
  PARENT: [exports.bullet],
  POISON: false,
  POISONEFFECTIVENESS: {HP: 5, HPP:-0.5, SH: 8, SHP:-0.5, Time:3, AddTime:0, ExpDam:1, Interval: 300},
FREEZE: true,
  FREEZEEFFECTIVENESS: {SlowMulti: -5, Time:5, AddTime:0},
};
exports.burnEffect = {
  LABEL: "Bullet",
  TYPE: "bullet",
  ACCEPTS_SCORE: false,
  COLOR: 12,
  SIZE: 5,
  BODY: {
    PENETRATION: 1,
    SPEED: 3.75,
    RANGE: 10,
    DENSITY: 1.25,
    HEALTH: 1,
    DAMAGE: 0,
    PUSHABILITY: 0.3
  },
  FACING_TYPE: "smoothWithMotion",
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: "never",
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true
};

exports.burnbullet = {
  PARENT: [exports.bullet],
  ACCEPTS_SCORE: false,
  BURN: true,
  BURN_TO_APPLY: 1,
  SHOWBURN: true,
  FACING_TYPE: "smoothWithMotion",
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: "never",
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true
};
exports.shockEffect = {
  LABEL: "Bullet",
  TYPE: "bullet",
  ACCEPTS_SCORE: false,
  COLOR: 3,
  SIZE: 5,
  BODY: {
    PENETRATION: 1,
    SPEED: 3.75,
    RANGE: 10,
    DENSITY: 1.25,
    HEALTH: 1,
    DAMAGE: 0,
    PUSHABILITY: 0.3
  },
  FACING_TYPE: "smoothWithMotion",
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: "never",
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true
};
exports.shockBullet = {
  LABEL: "Beem",
  TYPE: "bullet",
  ACCEPTS_SCORE: false,
  SHAPE: -1,
  SHOCK: true,
  SHOCK_TO_APPLY: 3,
  SHOWSHOCK: true,
  BODY: {
    PENETRATION: 10,
    SPEED: 4,
    RANGE: 90,
    DENSITY: 1.25,
    HEALTH: 0.33 * wepHealthFactor,
    DAMAGE: 4 * wepDamageFactor,
    PUSHABILITY: 0.3
  },
  FACING_TYPE: "smoothWithMotion",
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: "never",
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true
};
exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.tripblock2 = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        SIZE: 4,
        MOTION_TYPE: 'motor',    
        BODY: {
            SPEED: 0.2,
            DENSITY: 2,
            RANGE: 100,
            DAMAGE: 1,
            PENETRATION: 1
        },
    };
    exports.tripblock = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: 6,
        SIZE: 8, 
        MOTION_TYPE: 'motor',
        CONTROLLERS: ['fastspin'],
        FACING_TYPE: 'autospinfast',
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
        GUNS: [ {
            POSITION: [  13,     8,      1,      0,      0,     0,     1   ],
          }, {
            POSITION: [   4,     8,     1.7,    13,      0,     0,     1   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.tripblock2, STAT_CALCULATOR: gunCalcNames.trap,
                              AUTOFIRE: true,

                    }, }, {
            POSITION: [  13,     8,      1,      0,      0,     180,     1   ],
          }, {
            POSITION: [   4,     8,     1.7,    13,      0,     180,     1   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.tripblock2, STAT_CALCULATOR: gunCalcNames.trap,
                              AUTOFIRE: true,

                    }, },
            ],
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.dronechipmodel = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.fastdrone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
      GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  15,     5,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.tonsmorrecoil, g.weak]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.dronechipmodel2 = {
        PARENT: [exports.dronechipmodel],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.invissunchip = {
  PARENT: [exports.dronechipmodel2],
  INVISIBLE: [0.08, 0.03],
  HITS_OWN_TYPE: 'hard',
    AI: {
            BLIND: true,
            FARMER: true,
        },
};
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
exports.twistmissile = {
  PARENT: [exports.bullet],
  LABEL: 'Missile',
  INDEPENDENT: true,
  FACING_TYPE: 'turnWithSpeed',
  BODY: {
    RANGE: 120
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [14, 6, 1, 0, 0, 90, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
          g.doublereload,
          g.lowpower,
          g.muchmorerecoil,
          g.morespeed,
          g.morespeed
        ]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
        STAT_CALCULATOR: gunCalcNames.thruster
      }
    },
    {
      POSITION: [14, 6, 1, 0, 0, 270, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
          g.doublereload,
          g.lowpower,
          g.muchmorerecoil,
          g.morespeed,
          g.morespeed
        ]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
        STAT_CALCULATOR: gunCalcNames.thruster
      }
    }
  ]
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                  
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
exports.ceptionistBullet = {
    PARENT: [exports.bullet],
    LABEL: 'Mini-Tank',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.lowpower, g.norecoil]),
            TYPE: [ exports.bullet, { PERSISTS_AFTER_DEATH: true, } ],
            AUTOFIRE: true,
        }, }, 
    ],
};
    exports.homingbullet = {
    PARENT: [exports.swarm],
    SHAPE: 0,
    INDEPENDENT: true
    };
exports.lazerbeam = {
    LABEL: 'lazerbeam',
    TYPE: 'bullet',
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    SHAPE: -1,
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 6,
        RANGE: 60,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
};
exports.oplazerbeam = {
    LABEL: 'lazerbeam',
    TYPE: 'bullet',
    //MOTION_TYPE: 'explode',
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    SHAPE: -1,
    SIZE: 10,
    ACCEPTS_SCORE: true,
    BODY: {
        PENETRATION: 10,
        SPEED: 30,
        RANGE: 155,
        DENSITY: 1.25,
        HEALTH: 10 * wepHealthFactor,
        DAMAGE: 12 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
};
exports.operlazerbeam = {
    LABEL: 'lazerbeam',
    TYPE: 'bullet',
    MOTION_TYPE: 'opexplode',
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    SHAPE: -1,
    SIZE: 10,
    ACCEPTS_SCORE: true,
    BODY: {
        PENETRATION: 10,
        SPEED: 30,
        RANGE: 155,
        DENSITY: 1.25,
        HEALTH: 10 * wepHealthFactor,
        DAMAGE: 12 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
};
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };
 exports.TSB = {
        PARENT: [exports.bullet],
        LABEL: 'TSB',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };
 exports.BSB = {
        PARENT: [exports.bullet],
        LABEL: 'BSB',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };
 exports.SSB = {
        PARENT: [exports.bullet],
        LABEL: 'SSB',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };
 exports.ASB = {
        PARENT: [exports.bullet],
        LABEL: 'ASB',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.CCB,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.CCB,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.CCB,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.CCB,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.CCB,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };
// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 30,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 9,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };
exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.autoTurretH = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 2,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.homingbullet,
            }, },
    ],
};
exports.autoTurretP = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 2,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.poisonbullet,
            }, },
    ],

};
exports.autoTurretM = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1.4,      0,      0,      1,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machine3gun = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    10,     1.3,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasher = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
exports.stun3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
      OBSTACLE: true,
    DIE_AT_RANGE: true,
      DIE_AT_LOW_SPEED: true,
    BODY: {
        FOV: 3,
        DAMAGE: 0.1,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 0,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    20,      1,      -10,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.buzzreload]),
                TYPE: exports.stunbullet,
            }, }
    ],
};
exports.poison3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
      OBSTACLE: true,
    DIE_AT_RANGE: true,
      DIE_AT_LOW_SPEED: true,
    BODY: {
        FOV: 3,
        DAMAGE: 0.1,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 1,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    20,      1,      -10,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.buzzreload]),
                TYPE: exports.earthbullet,
            }, }
    ],
};
exports.autotestgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 2,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.testbullet2,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe, g.lowpower, g.lowpower]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };
exports.driveindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    DANGER: -999,
    SHAPE: 4,
};
exports.revolutionistring = {
    PARENT: [exports.bullet],
    LABEL: '',
    CONTROLLERS: ['spin'], 
    BODY: {
        FOV: 0.8
    },
    COLOR: 19,
    DANGER: -999,
    SHAPE: [[-4, 4],[-3.80, 3.80],[-3.80, -3.80],[3.80,-3.80],[3.80,3.80],[-3.80,3.80],[-4,4],[4,4],[4,-4],[-4,-4]],
};
exports.reverserevolutionistring = {
    PARENT: [exports.bullet],
    LABEL: '',
    CONTROLLERS: ['reversespin'], 
    BODY: {
        FOV: 0.8
    },
    COLOR: 19,
    DANGER: -999,
    SHAPE: [[-4, 4],[-3.80, 3.80],[-3.80, -3.80],[3.80,-3.80],[3.80,3.80],[-3.80,3.80],[-4,4],[4,4],[4,-4],[-4,-4]],
};
exports.rainbowdrive = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 36,
    DANGER: -999,
    SHAPE: 4,
};
exports.switchindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 1,
    DANGER: -999,
    SHAPE: -4,
};
exports.decoTurretBullet = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 5,
    DANGER: -999,
    SHAPE: 1,
};
exports.decoTurretthing = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 5,
    DANGER: -999,
    SHAPE: [[0.3,1.9],[0.3,0],[0.4,0],[0.4,2],[-0.4,2],[-0.4,0],[-0.3,0],[-0.3,1.9]],
};
exports.decoTurretHive = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 3,
    DANGER: -999,
    SHAPE: 1,
};
exports.decoTurretTrap = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 5,
    DANGER: -999,
    SHAPE: -3,
};
exports.decoTurretBee = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 5,
    DANGER: -999,
    SHAPE: 4,
};
exports.decoTurretSwarm = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 5,
    DANGER: -999,
    SHAPE: 3,
};
exports.decoTurretAswd = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8
    },
    COLOR: 2,
    DANGER: -999,
    SHAPE: 0,
};
exports.mindindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    SHAPE: 0,
    CONTROLLERS: ['doNothing'], 
    COLOR: 9,
};
exports.newindicator = {
    //PARENT: [exports.genericTank],
    LABEL: '',
      BODY: {
        FOV: 0.8,
    //FACING_TYPE: 'bound'
    },
    //CONTROLLERS: ['spin'],
    //FACING_TYPE: 'withMotion',
    //TYPE: 'bullet',
  //SHAPE: [[-0.987,-0.606],[-0.987,-1],[1,-1.006],[1,1],[-0.99,0.994],[-0.99,0.595],[0.57,0.6],[0.57,-0.6]],
    COLOR: 2,
    DANGER: -999,
    //SHAPE: [[0.3,1.9],[0.3,0],[0.4,0],[0.4,2],[-0.4,2],[-0.4,0],[-0.3,0],[-0.3,1.9]],  
    SHAPE: [[0.3,3.9],[0.3,2],[0.4,2],[0.4,4],[-0.4,4],[-0.4,2],[-0.3,2],[-0.3,3.9]]
};
exports.aswdindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
      BODY: {
        FOV: 0.8
    },
    TYPE: 'bullet',
    SHAPE: [[-0.987,-0.606],[-0.987,-1],[1,-1.006],[1,1],[-0.99,0.994],[-0.99,0.595],[0.57,0.6],[0.57,-0.6]],
    CONTROLLERS: ['doNothing'], 
    COLOR: 2,
    DANGER: -999,
    //SHAPE: [[0.3,1.9],[0.3,0],[0.4,0],[0.4,2],[-0.4,2],[-0.4,0],[-0.3,0],[-0.3,1.9]],  
};
exports.healindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    SHAPE: [[-0.987,-0.606],[-0.987,-1],[1,-1.006],[1,1],[-0.99,0.994],[-0.99,0.595],[0.57,0.6],[0.57,-0.6]],
    CONTROLLERS: ['doNothing'], 
    COLOR: 5,
};
exports.freezeindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    SHAPE: [[-0.987,-0.606],[-0.987,-1],[1,-1.006],[1,1],[-0.99,0.994],[-0.99,0.595],[0.57,0.6],[0.57,-0.6]],
    CONTROLLERS: ['doNothing'], 
    COLOR: 9,
};
exports.zoomindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    SHAPE: [[-0.987,-0.606],[-0.987,-1],[1,-1.006],[1,1],[-0.99,0.994],[-0.99,0.595],[0.57,0.6],[0.57,-0.6]],
    CONTROLLERS: ['doNothing'], 
    COLOR: 3,
};
exports.toxicindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    SHAPE: [[-0.987,-0.606],[-0.987,-1],[1,-1.006],[1,1],[-0.99,0.994],[-0.99,0.595],[0.57,0.6],[0.57,-0.6]],
    CONTROLLERS: ['doNothing'], 
    COLOR: 1,
};
exports.stunindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    SHAPE: [[-0.987,-0.606],[-0.987,-1],[1,-1.006],[1,1],[-0.99,0.994],[-0.99,0.595],[0.57,0.6],[0.57,-0.6]],
    CONTROLLERS: ['doNothing'], 
    COLOR: 6,
};
exports.driveindicator = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    SHAPE: 4,
    CONTROLLERS: ['doNothing'], 
    COLOR: 16,
};
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.hiveprobe = {
  PARENT: [exports.genericTank],
  LABEL: "Probe",
  TYPE: "drone",
  HITS_OWN_TYPE: "hardWithBuffer",
  DRAW_HEALTH: true,
  BODY: {
    FOV: 0.5,
    SPEED: 3,
    ACCELERATION: 0.4,
    HEALTH: 2.5,
    SHIELD: 0,
    DAMAGE: 1.2,
    RESIST: 1,
    PENETRATION: 1,
    DENSITY: 0.4
  },
  AI: {
    BLIND: true
  },
  CLEAR_ON_MASTER_UPGRADE: true,
  GIVE_KILL_MESSAGE: false,
  ACCEPTS_SCORE: false,
  CONTROLLERS: [
    "nearestDifferentMaster",
    "mapAltToFire",
    "minion",
    "canRepel",
    "hangOutNearMaster"
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lowpower]),
        TYPE: exports.bullet
      }
    }
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [25, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    }
  ]
};
exports.clonerprobe = {
  PARENT: [exports.genericTank],
  LABEL: "Probe",
  TYPE: "drone",
  HITS_OWN_TYPE: "hardWithBuffer",
  DRAW_HEALTH: true,
  BODY: {
    FOV: 0.5,
    SPEED: 3,
    ACCELERATION: 0.4,
    HEALTH: 2.5,
    SHIELD: 0,
    DAMAGE: 1.2,
    RESIST: 1,
    PENETRATION: 1,
    DENSITY: 0.4
  },
  AI: {
    BLIND: true
  },
  CLEAR_ON_MASTER_UPGRADE: true,
  GIVE_KILL_MESSAGE: false,
  ACCEPTS_SCORE: false,
  CONTROLLERS: [
    "nearestDifferentMaster",
    "mapAltToFire",
    "minion",
    "canRepel",
    "hangOutNearMaster"
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lowpower]),
        TYPE: exports.bullet
      }
    }
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [22, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    }
  ]
};
exports.autoclonerprobe = makeAuto(exports.clonerprobe, 'Probe')
exports.splitprobe = {
  PARENT: [exports.genericTank],
  LABEL: "Probe",
  TYPE: "drone",
  //SIZE: 5,
  HITS_OWN_TYPE: "hardWithBuffer",
  DRAW_HEALTH: true,
  BODY: {
    FOV: 0.5,
    SPEED: 3,
    ACCELERATION: 0.4,
    HEALTH: 1,
    SHIELD: 0,
    DAMAGE: 1.2,
    RESIST: 1,
    PENETRATION: 1,
    DENSITY: 0.4,
  },
  AI: {
    BLIND: true
  },
  CLEAR_ON_MASTER_UPGRADE: true,
  GIVE_KILL_MESSAGE: false,
  ACCEPTS_SCORE: false,
  CONTROLLERS: [
    "nearestDifferentMaster",
    "mapAltToFire",
    "minion",
    "canRepel",
    "hangOutNearMaster"
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lowpower, g.lowpower, g.halfreload]),
        TYPE: exports.bullet
      }
    }
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [22, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    }
  ]
};
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.autobulletTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    COLOR: 16,
    INDEPENDENT: true,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.lowpower, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.autobulletTurrete = {
    PARENT: [exports.genericTank],
    LABEL: '',
    TYPE: 'bullet',
    COLOR: 16,
    INDEPENDENT: true,
    BODY: {
        FOV: 3,
    },
    HAS_NO_RECOIL: true,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.lowpower, g.auto]),
                TYPE: exports.explosion,
            }, },
    ],
};
exports.autobullet = {
    LABEL: 'Auto-Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,      180,     360, 1], 
                    TYPE: exports.autobulletTurret,
                        },
             ],
};
exports.bomb = {
    LABEL: 'Auto-Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        FOV: 100,
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    MOTION_TYPE: 'glide', // def
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    DIE_AT_RANGE: true,
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,      180,     360, 1], 
                    TYPE: exports.autobulletTurrete,
                        },
             ],
};
exports.firebullet = {
  PARENT: [exports.bullet],
  LABEL: 'Bullet',
  MOTION_TYPE: 'explode',
  TYPE: 'bullet',
  ACCEPTS_SCORE: false,
  BODY: {
    PENETRATION: 1,
    SPEED: 3.75,
    RANGE: 90,
    DENSITY: 1.25,
    HEALTH: 0.33 * wepHealthFactor,
    DAMAGE: 4 * wepDamageFactor,
    PUSHABILITY: 0.3
  },
  FACING_TYPE: 'smoothWithMotion',
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: 'never',
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true,
};
exports.CeptionistTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    CONTROLLERS: ['doNothing'],
    COLOR: 17,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ],   
            COLOR: 17,
            }, 
    ],
};
exports.ceptionistMarking = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: -1,
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        }, 
    ],
};
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    DAMAGE_CLASS: 2, // 0: def, 1: food, 2: tanks, 3: obstacles
    INDEPENDENT: true,
};
exports.armourBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 4,
    DAMAGE_CLASS: 2, // 0: def, 1: food, 2: tanks, 3: obstacles
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.lanceBody = {
        LABEL: '',
        INVISIBLE: [0, 1],
        COLOR: 16,
        SHAPE: [[0, 2.5], [-0.7, 0], [0.7, 0]],
        INDEPENDENT: true,
    };
    exports.fenceBody = {
        LABEL: '',
        INVISIBLE: [0, 1],
        COLOR: 9,
        SHAPE: [[0, 2.5], [-0.7, 0], [0.7, 0]],
        INDEPENDENT: true,
    };
    exports.swordBody = {
        LABEL: '',
        INVISIBLE: [0, 1],
        COLOR: 16,
        SHAPE: [[0, 3.5], [-0.7, 0], [0.7, 0]],
        INDEPENDENT: true,
    };
    exports.injectBody = {
        LABEL: '',
        INVISIBLE: [0, 1],
        COLOR: 6,
        SHAPE: [[0, 2.5], [-0.7, 0], [0.7, 0]],
        INDEPENDENT: true,
    };
exports.jumpBody1 = {
  LABEL: '',
  CONTROLLERS: ['fastspin'],
  COLOR: 9,
  SHAPE: 7,
  INDEPENDENT: true
};
exports.jumpBody2 = {
  LABEL: '',
  CONTROLLERS: ['reversespin'],
  COLOR: 9,
  SHAPE: 7,
  INDEPENDENT: true
};
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };
exports.arenacloser = {
  COLOR: 3,
  DRAW_HEALTH: false,
  CAN_GO_OUTSIDE_ROOM: true,
  CAN_BE_ON_LEADERBOARD: false,
  ACCEPTS_SCORE: true,
  PARENT: [exports.genericTank],
  LABEL: "Arena Closer",
  NAME: "",
  DANGER: 20,
  SIZE: 22,
  CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
  SKILL: skillSet({
    rld: 10,
    dam: 10,
    pen: 10,
    str: 10,
    spd: 10,
    atk: 10,
    hlt: 10,
    shi: 10,
    rgn: 10,
    mob: 10
  }),

  BODY: {
    ACCELERATION: 2,
    SPEED: 20,
    HEALTH: 9e99 * base.HEALTH, //nonexistant stat
    RESIST: 9e99,
    SHIELD: 9e99,
    REGEN: 9e99,
    DAMAGE: 9e99,
    PENETRATION: 9e99,
    FOV: 4.0,
    DENSITY: 9e99
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [14, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.halfreload, g.basic, g.arena]),
        TYPE: exports.bullet
      }
    }
  ]
};
exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.trapminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    SHAPE: 8,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.halfreload, g.threequartersrof]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.trap,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};

exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };

function makeAutoM(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurretM, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeAutoH(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurretH, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeAutoP(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurretP, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
};

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.basichybrid = makeHybrid(exports.basic, 'Bascrid');

exports.autobasichybrid = makeAuto(exports.basichybrid, 'Auto Bascrid');

exports.autobasic = makeAuto(exports.basic, 'Auto Basic');

exports.autohomingbasic = makeAutoH(exports.basic, 'Auto Homing Basic'); 

exports.rainbowbasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    COLOR: 36,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-1, -0.8],
              [-0.8, -1],
              [0.8, -1],
              [1, -0.8],
              [0.2, 0],
              [1, 0.8],
              [0.8, 1],
              [-0.8, 1],
              [-1, 0.8],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };        
        exports.optanks = {
            PARENT: [exports.genericTank],
            LABEL: 'Really OP Tanks',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-1, -0.8],
              [-0.8, -1],
              [0.8, -1],
              [1, -0.8],
              [0.2, 0],
              [1, 0.8],
              [0.8, 1],
              [-0.8, 1],
              [-1, 0.8],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.op, g.op, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };        
            exports.Beta = {
            PARENT: [exports.genericTank],
            LABEL: 'Beta Tanks',
            RESET_UPGRADES: false,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-1, -1.8],
              [-1.8, -1],
              [1.8, -1],
              [1, -1.8],
              [1.2, 1],
              [1, 1.8],
              [1.8, 1],
              [-1.8, 1],
              [-1, 1.8],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
        exports.AIT = {
            PARENT: [exports.genericTank],
            LABEL: 'AIT',
            RESET_UPGRADES: false,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-1, -0.5],
              [-0.5, -1],
              [0.5, -1],
              [1, -0.5],
              [0.2, 0],
              [1, 0.5],
              [0.5, 1],
              [-0.5, 1],
              [-1, 0.5],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
        exports.AIT2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Bosses',
            RESET_UPGRADES: false,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-3, -3],
              [-3, -3],
              [3, -3],
              [3, -3],
              [3, 3],
              [3, 3],
              [3, 3],
              [-3, 3],
              [-3, 3],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };      
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
            exports.singletest = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.burnbullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
           /* exports.marita = {
                PARENT: [exports.genericTank],f
                LABEL: 'Marita Is Funny As Hell',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.op, g.mini, g.mini, g.sniper]),
                            TYPE: exports.explosion,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  */
            exports.hadoken = {
                PARENT: [exports.genericTank],
                LABEL: 'Hadoken',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.sniper]),
                            TYPE: exports.bullet,
                        }, }, { 
                          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     8,      0.8,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.morereload, g.pound, g.destroy, g.jumpsmashreload, g.morespeed, g.morespeed]),
                            TYPE: exports.explosion,
                            ALT_FIRE: true,
                        }, }
                ],
            };
            exports.lucas = {
                PARENT: [exports.genericTank],
                LABEL: 'Lucasio_Destroyer',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.op, g.morereload, g.mini]),
                            TYPE: exports.lazerbeam,
                        }, }, { 
                          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,     8,      1.2,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.pound, g.destroy, g.lucasop]),
                            TYPE: exports.explosionop,
                            ALT_FIRE: true,
                        }, }
                ],
        TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.rainbowdrive,
    }, ],
            };
            exports.revolutionist = {
                PARENT: [exports.genericTank],
                LABEL: 'Revolutioneer',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      TYPE: exports.auto3gun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      TYPE: exports.auto3gun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    } ],
            };
            exports.neptune = {
                PARENT: [exports.genericTank],
                LABEL: 'Neptune',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      TYPE: exports.autotestgun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      TYPE: exports.autotestgun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    } ],
            };
            exports.autorevolutionist = makeAuto(exports.revolutionist, 'Hadron');
            exports.mercury = {
                PARENT: [exports.genericTank],
                LABEL: 'Mercury',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      TYPE: exports.stun3gun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      TYPE: exports.stun3gun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    }, {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: exports.smasherBody
    }, ],
            };
            exports.earth = {
                PARENT: [exports.genericTank],
                LABEL: 'Earth',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      TYPE: exports.poison3gun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      TYPE: exports.poison3gun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    }, {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: exports.smasherBody
    }, ],
            };
            exports.venus = {
                PARENT: [exports.genericTank],
                LABEL: 'Venus',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
      TYPE: exports.sniper3gun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
      TYPE: exports.sniper3gun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    } ],
            };
            exports.jupiter = {
                PARENT: [exports.genericTank],
                LABEL: 'Jupiter',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto, g.highpower]),
      TYPE: exports.heavy3gun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto, g.highpower]),
      TYPE: exports.heavy3gun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    } ],
            };
            exports.uranus = {
                PARENT: [exports.genericTank],
                LABEL: 'Uranus',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.auto, g.highpower]),
      TYPE: exports.auto4gun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.auto, g.highpower]),
      TYPE: exports.auto4gun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    } ],
            };
            exports.mars = {
                PARENT: [exports.genericTank],
                LABEL: 'Mars',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.auto, g.highpower]),
      TYPE: exports.machine3gun
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.auto, g.highpower]),
      TYPE: exports.machine3gun
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    } ],
            };
            exports.saturn = {
                PARENT: [exports.genericTank],
                LABEL: 'Saturn',
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      TYPE: exports.autoTurret
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      TYPE: exports.autoTurret
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 0],
      TYPE: exports.revolutionistring,
    }, {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 0, 25, 0, 360, 0],
      TYPE: exports.autoTurret
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 0, -25, 0, 360, 0],
      TYPE: exports.autoTurret
    }, {
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: exports.reverserevolutionistring,
    } ],
            };
            exports.explodetest = {
                PARENT: [exports.genericTank],
                LABEL: 'explode test',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     16,      1.2,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.expl2]),
                            TYPE: exports.bomb,
                        }, }, ],
    TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [50, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    },
  ]
};
        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.armour = {
            PARENT: [exports.genericTank],
            LABEL: 'Armoury',
            DANGER: 4,
            BODY: {
                FOV: base.FOV * 1,
                DENSITY: base.DENSITY * 1.2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.armourBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
    exports.autoarmour = makeAuto(exports.armour, 'Auto Armour'); 

            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
exports.landmine = {
  PARENT: [exports.genericTank],
  LABEL: "Landmine",
  INVISIBLE: [0.06, 0.01],
  DANGER: 7,
  BODY: {
    SPEED: base.SPEED * 1.1,
    FOV: base.FOV * 1.05,
    DENSITY: base.DENSITY * 2
  },
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: exports.smasherBody
    },
    {
      POSITION: [21.5, 0, 0, 90, 360, 0],
      TYPE: exports.smasherBody
    }
  ],
  IS_SMASHER: true,
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
  STAT_NAMES: statnames.smasher
};
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };
exports.jumpsmash = {
  PARENT: [exports.genericTank],
  LABEL: "Jump Smasher",
  DANGER: 5,
  BODY: {
    FOV: base.FOV * 1.05,
    DENSITY: base.DENSITY * 2
  },
  IS_SMASHER: true,
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [24, 0, 0, 0, 360, 0],
      TYPE: exports.jumpBody1
    },
    {
      POSITION: [24, 0, 0, 0, 360, 0],
      TYPE: exports.jumpBody2
    }
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [2, 6, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.tonsmorrecoil,
          g.tonsmorrecoil,
          g.jumpsmashreload
        ]),
        TYPE: exports.bullet,
        LABEL: "Jump Smasher", // def
        STAT_CALCULATOR: 0, // def
        WAIT_TO_CYCLE: false, // def
        AUTOFIRE: false, // def
        SYNCS_SKILLS: false, // def
        MAX_CHILDREN: 0, // def
        ALT_FIRE: false, // def
        NEGATIVE_RECOIL: false // def
      }
    }
  ],

  IS_SMASHER: true,
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
  STAT_NAMES: statnames.smasher
};
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'WierdSpike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
           exports.autotwin = makeAuto(exports.twin, 'Auto Twin');
    exports.lazertwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Equinox',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     3.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.morereload, g.morereload, g.morereload, g.halfdamage]),
                TYPE: exports.lazerbeam,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -3.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.morereload, g.morereload, g.morereload, g.halfdamage]),
                TYPE: exports.lazerbeam,
            }, }, 
        ],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.rainbowdrive,
    }, ],
    };
  exports.revix = {
        PARENT: [exports.genericTank],
        LABEL: 'revix',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,     4,      2,      0,      0,      0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
            }, }, 
        ],
    };  
  exports.DeltaCannon = {
        PARENT: [exports.genericTank],
        LABEL: 'DeltaCannon',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,      0,      5,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,      0,      -5,    0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,      0,      0,     2.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      90,    2.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,     -90,    2.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     7,      2,     -3,      0,     180,    2.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.muchmorerecoil]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };  
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);        
        exports.gunnertest = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.testingthingy = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.autobent = makeAuto(exports.bent, 'Auto Triple Shot'); 
        exports.speedbent1 = {
            PARENT: [exports.genericTank],
            LABEL: 'Speed-Triple',
            DANGER: 5,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.speedbenttag]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.speedbenttag]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.speedbenttag]),
                        TYPE: exports.bullet,
                    }, },
            ],
              TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.switchindicator,
    }, ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'PentaShot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.autosniper = makeAuto(exports.sniper, 'Auto Sniper'); 
    exports.cyanide = makeAutoP(exports.sniper, 'Cyanide'); 
    exports.sniperdrive = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniperdrive',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.autobullet,
            }, },
        ],
              TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.driveindicator,
          }, 
        ], 
    };
    exports.snipertest = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
      TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [11, 0, 0, 270, 90, 1],
      TYPE: exports.newindicator,
      FACING_TYPE: 'withTarget'
    }
  ]
    };
    exports.PoisonCannon = {
        PARENT: [exports.genericTank],
        LABEL: 'Toxifier',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    9,     0.5,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.poisonbullet,
            }, },
        ],
        TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [7, 15, 0, 0, 360, 0],
      TYPE: exports.toxicindicator
    }
  ]
    };
    exports.FreezeCannon = {
        PARENT: [exports.genericTank],
        LABEL: 'Freezer',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    10,     0.4,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.freezebullet,
            }, },
        ],
        TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [7, 15, 0, 0, 360, 0],
      TYPE: exports.freezeindicator
    }
  ]
    };
    exports.StunCannon = {
        PARENT: [exports.genericTank],
        LABEL: 'Stuntal',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    11,     0.3,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.stunbullet,
            }, },
        ],
        TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [7, 15, 0, 0, 360, 0],
      TYPE: exports.stunindicator
    }
  ]
    };
    exports.Primordial = {
        PARENT: [exports.genericTank],
        LABEL: 'Primordial',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,     0.1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.healingbullet,
            }, },
        ],
        TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [7, 15, 0, 0, 360, 0],
      TYPE: exports.healindicator
    }
  ]
    };
    exports.Zoom = {
        PARENT: [exports.genericTank],
        LABEL: 'Zoom',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    14,     0.06,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.lessreload]),
                TYPE: exports.speedbullet,
            }, },
        ],
        TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [7, 15, 0, 0, 360, 0],
      TYPE: exports.zoomindicator
    }
  ]
    };
    exports.AngelCannon = {
        PARENT: [exports.genericTank],
        LABEL: 'Angelica',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    15,     0,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.angelbullet,
            }, },
        ],
    };
    exports.Steeder = {
        PARENT: [exports.genericTank],
        LABEL: 'Steeder',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    11,     0.8,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.testbullet,
            }, },
        ],
    };
   exports.aswdwsa = {
        PARENT: [exports.genericTank],
        LABEL: 'AsWdWsA',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    10,     0.5,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.testbullet2,
            }, },
        ],
      TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [7, 15, 0, 0, 360, 0],
      TYPE: exports.aswdindicator
    },
  ]
    };
   exports.autoaswdwsa = makeAuto(exports.aswdwsa, 'auto AsWdWsA'); 
   exports.urmum = {
        PARENT: [exports.genericTank],
        LABEL: 'UrMuM',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  40,    22,     2,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload]),
                TYPE: exports.testbullet3,
            }, },
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.infantry = {
                PARENT: [exports.genericTank],
                LABEL: 'Infantry',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      -10,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      -10,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, }, { 
                          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      10,      0,      0,      0.5,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      10,      0,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.musket = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  16,    8,    1,      0,      5.5,      0,      0,   ], 
                        }, {
                    POSITION: [  20,     4,      1,      0,      5.5,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, }, { 
                          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  16,    8,    1,      0,      -5.5,      0,      0.5,   ], 
                        }, {
                    POSITION: [  20,     4,      1,      0,      -5.5,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
    exports.autorifle = makeAuto(exports.rifle, 'Auto Rifle');
    exports.riflehybrid = makeHybrid(exports.rifle, 'Rifagiulus'); 
exports.FlameKilla = {
    PARENT: [exports.genericTank],
    LABEL: "FlameKilla",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [15.231, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [2, 0, 0.001, 1, 1, 0.75, 1, 9, 1, 0.4, 1, 95000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 8, 1, 0, 0, 357.254, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [2, 0, 0.001, 1, 1, 0.75, 1, 9, 1, 0.4, 1, 95000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 8, 1, 0, 0, 2.922, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [2, 0, 0.001, 1, 1, 0.75, 1, 9, 1, 0.4, 1, 95000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 8, 1, -5.538, -8.308, 1.45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [2, 0, 0.001, 1, 1, 0.75, 1, 9, 1, 0.4, 1, 95000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 8, 1, -5.538, 8.308, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [2, 0, 0.001, 1, 1, 0.75, 1, 9, 1, 0.4, 1, 95000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
        exports.stalker = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            INVISIBLE: [0.08, 0.03],
            LABEL: 'Stalker',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     -2,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
exports.hivemind = {
  PARENT: [exports.genericTank],
  LABEL: "Hivemind",
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [0, 20, 1, 0, 0, 90, 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.slow]),
        TYPE: exports.hiveprobe,
        MAX_CHILDREN: 1
      }
    },
    {
      POSITION: [0, 20, 1, 0, 0, 270, 3.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.slow]),
        TYPE: exports.hiveprobe,
        MAX_CHILDREN: 1
      }
    }
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [25, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    },  {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [32, 0, 0, 0, 360, 0],
      TYPE: exports.decoTurretHive
    }
  ]
};
exports.cloner = {
  PARENT: [exports.genericTank],
  LABEL: "Cloner",
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [0, 20, 1, 0, 0, 90, 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.slow]),
        TYPE: exports.clonerprobe,
        MAX_CHILDREN: 1
      }
    }
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [22, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    }
  ]
};
exports.autocloner2 = {
  PARENT: [exports.genericTank],
  LABEL: "Auto-Cloner",
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [0, 20, 1, 0, 0, 90, 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.slow]),
        TYPE: exports.autoclonerprobe,
        MAX_CHILDREN: 1
      }
    }
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [22, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    }
  ]
};
exports.autocloner = makeAuto(exports.autocloner2, 'Auto Cloner')
exports.splitter = {
  PARENT: [exports.genericTank],
  LABEL: "Splitter",
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [ {
      POSITION: [0, 5, 1, 0, 0, 90, 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.slow, g.splitter]),
        TYPE: exports.splitprobe,
        MAX_CHILDREN: 32,
      }
    }
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [22, 0, 0, 0, 360, 0],
      TYPE: exports.mindindicator
    }
  ]
};
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, 'Auto Assassin');

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
       exports.autohunter = makeAuto(exports.hunter, 'Auto Hunter'); 
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.dictator = {
        PARENT: [exports.genericTank],
        LABEL: 'Dictator',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        SHAPE: 8,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.og]),
                    TYPE: exports.fastdrone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.autodirector = makeAuto(exports.director, 'Auto Director');
    exports.manage = {
        PARENT: [exports.genericTank],
        LABEL: 'Manager',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        INVISIBLE: [0.08, 0.03],
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.og]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: 'Master',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
exports.overdrivedrone = makeAuto(exports.drone, 'Drone')
exports.overdrive = {
    PARENT: [exports.genericTank],
    LABEL: 'Overdrive',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 6,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.overdrivedrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.overdrivedrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.driveindicator,
    }, ],
};
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.og]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.og]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.og]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.og]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, 'Auto overseer');
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.UNLOCKED = {
                PARENT: [exports.genericTank],
                LABEL: 'UNLOCKED',
                DANGER: 7,
                MAX_CHILDREN: 12,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.bee],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.bee],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'            
                        }, }, {
                          POSITION: [   13,    7.5,    0.8,     0,     0,     0,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.twin]),
                            TYPE: exports.bullet,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'  
                        }, }, {
                          POSITION: [   13,    7.5,    0.8,     0,     0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.twin]),
                            TYPE: exports.bullet,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'  
                        }, },
                ],
            };
exports.Oliver = {
    PARENT: [exports.genericTank],
    LABEL: "Tower mech",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [12.462, 7.04, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2.077, 7.04, 1.3, 12.462, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 0.45, 0.6, 0.39, 1.25, 1.8, 0.8, 10, 1.25, 0.00001, 1]
                ]),
                TYPE: exports.trap
            },
        },
        {
            POSITION: [18, 8, 1, 0, 4.154, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0.5, 0.001, 1, 1, 0.75, 1, 2.25, 1, 2.5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, -4.154, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0.5, 0.001, 1, 1, 0.75, 1, 2.25, 1, 2.5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.FairSquare = {
    PARENT: [exports.genericTank],
    LABEL: 'FairSquare',
    GUNS: [{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 86.60028584087672, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 313.57502572748444, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -25, 0, 199.21267181718565, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -25, 0, 20.154211156845577, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 264.6022512235196, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 134.7258596062668, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 108.56809137067239, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 289.38144022152323, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 18.580492403639255, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 199.57895212482913, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 199.19884728385205, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 108.57927038044454, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 20.1768596271113, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 288.14312224878563, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 247.5811079441346, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 152.8718634677266, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 66.26055916197174, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 334.76496015119756, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },},
    ],
};
    exports.NAUTULUS = {
    PARENT: [exports.genericTank],
    LABEL: 'NAUTULUS',
    GUNS: [{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 86.60028584087672, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 313.57502572748444, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -25, 0, 199.21267181718565, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -25, 0, 20.154211156845577, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 264.6022512235196, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 134.7258596062668, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 108.56809137067239, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 289.38144022152323, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 18.580492403639255, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 199.57895212482913, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 199.19884728385205, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 108.57927038044454, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 20.1768596271113, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 288.14312224878563, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 247.5811079441346, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 152.8718634677266, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 66.26055916197174, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -90, 0, 334.76496015119756, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        }, },
    ],
};
exports.Rocketer = {
    PARENT: [exports.genericTank],
    LABEL: 'Rocketer',
    GUNS: [{
      POSITION: [18.571428571428573, 8.571428571428571, 1, -5, 0, 242.4763490516134, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 8.571428571428571, 1, -5, 0, 120, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 8.571428571428571, 1, -8, 0, 180, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 8.571428571428571, 1, 0, 0, 337.5, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 8.571428571428571, 1, 0, 0, 22.5, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 8.571428571428571, 1, 6, 0, 0, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, },
    ],
};
exports.Lottery = {
    PARENT: [exports.genericTank],
    LABEL: 'Lottery',
    GUNS: [{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 330, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 300, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 240, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 210, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 150, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 120, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 90, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 60, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 30, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 270, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 0, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 180, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 180, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 0, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 270, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [12.857142857142858, 4.285714285714286, 1, 0, 0, 90, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [8.571428571428571, 4.285714285714286, 1, 0, 0, 225, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: undefined,
        },
    },{
      POSITION: [8.571428571428571, 4.285714285714286, 1, 0, 0, 315, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: undefined,
        },
    },{
      POSITION: [8.571428571428571, 4.285714285714286, 1, 0, 0, 45, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: undefined,
        },
    },{
      POSITION: [8.571428571428571, 4.285714285714286, 1, 0, 0, 135, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: undefined,
        }, },
    ],
};
exports.TrapHard = {
    PARENT: [exports.genericTank],
    LABEL: "TrapHard",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [11.077, 6.4, 1, 0, 0, 330, 0.5],
        },
        {
            POSITION: [1.846, 6.4, 1.3, 11.077, 0, 330, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 0.1, 0.001, 0.45, 0.6, 0.39, 1.25, 2.25, 0.8, 5, 1.25, 0.00001, 1]
                ]),
                TYPE: exports.trap
            },
        },
        {
            POSITION: [11.077, 6.4, 1, 0, 0, 30, 0.5],
        },
        {
            POSITION: [1.846, 6.4, 1.3, 11.077, 0, 30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 0.1, 0.001, 0.45, 0.6, 0.39, 1.25, 2.25, 0.8, 5, 1.25, 0.00001, 1]
                ]),
                TYPE: exports.trap
            },
        },
        {
            POSITION: [11.077, 6.4, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [1.846, 6.4, 1.3, 11.077, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 0.1, 0.001, 0.45, 0.6, 0.39, 1.25, 2.25, 0.8, 5, 1.25, 0.00001, 1]
                ]),
                TYPE: exports.trap
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 210, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 150, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 8, 1, 0, -2.769, 150, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 8, 1, 0, 2.769, 210, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 10.24, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.HELLBLAZER = {
    PARENT: [exports.genericTank],
    LABEL: 'HELLBLAZER',
    GUNS: [{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 337.5, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 22.5, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 0, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -4, 0, 315, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -4, 0, 45, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -5, 0, 217.5, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -5, 0, 142.5, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -15, 0, 240, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -15, 0, 120, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 180, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, },
    ],
};
  exports.DELTAGUNNER = {
    PARENT: [exports.genericTank],
    LABEL: 'DELTAGUNNER',
    GUNS: [{
      POSITION: [18, 7.142857142857143, 1, 0, 0, 86.60028584087672, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, 0, 0, 313.57502572748444, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18, 7.142857142857143, 1.4, -25, 0, 199.21267181718565, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18, 7.142857142857143, 1.4, -25, 0, 20.154211156845577, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, 0, 0, 264.6022512235196, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 134.7258596062668, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 108.56809137067239, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 289.38144022152323, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1.4, -90, 0, 18.580492403639255, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1.4, -90, 0, 199.57895212482913, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, -90, 0, 199.19884728385205, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, -90, 0, 108.57927038044454, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, -90, 0, 20.1768596271113, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, -90, 0, 288.14312224878563, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, -90, 0, 247.5811079441346, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, -90, 0, 152.8718634677266, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7.142857142857143, 1, -90, 0, 66.26055916197174, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        },
    },{
      POSITION: [18, 7, 1, -90, 0, 334, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
        }, },
    ],
};
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, 'Auto cruiser');
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
exports.autounderseer = makeAuto(exports.underseer, 'Auto Underseer');
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };
/* exports.barryroachthing = {
  PARENT: [exports.genericTank],
  LABEL: 'Thingn For Techer',
  SHAPE: 5,
  GUNS: [{        SIZE     X       Y     ANGLE    ARC 
                POSITION: [   5,    10,      0,      30,    110, 0, 0], 
                  PROPERTIES: {
                      SHOOT_SETTINGS: combineStats([g.basic, g.single, g.mini]),
                      TYPE: exports.bullet,
                    },  }, 
  ],
}; */
exports.mal = {
  PARENT: [exports.genericTank],
  LABEL: "Maleficitor",
  DANGER: 6,
  STAT_NAMES: statnames.drone,
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    SPEED: base.SPEED * 0.9,
    FOV: base.FOV * 1.3
  },
  SHAPE: 4,
  MAX_CHILDREN: 14,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [5, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
        TYPE: exports.invissunchip,
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro
      }
    }
  ]
};
        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Spawner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
        exports.lilfacttrap = {
            PARENT: [exports.genericTank],
            LABEL: 'SpawnTrap',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.trapminion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };
exports.autolilfact = makeAuto(exports.lilfact, 'Auto Spawner');
    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.automachine = makeAuto(exports.machine, 'Auto Machine Gun');
exports.machineceptionist = makeAutoM(exports.machine, 'Machine Ception');
    exports.machinedrive = {
        PARENT: [exports.genericTank],
        LABEL: 'Machinedrive',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.autobullet,
            }, },
        ],
        TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.driveindicator,
          }, 
        ], 
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
       exports.flamethrower = {
        PARENT: [exports.genericTank],
        LABEL: 'Flamethrower',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flamethrower]),
                TYPE: exports.flame,
            }, }, {
              POSITION: [    12,     11.5,     1.7,     8,      0,      0,      0,   ], 
},
        ],
    };
       exports.lancer = {
        PARENT: [exports.genericTank],
        SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
        LABEL: 'Lancer',
        STAT_NAMES: statnames.lancer,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                AUTOFIRE: true,
                TYPE: exports.lancerbullet,
            }, },
        ],
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      270,     360,  0,], 
                    TYPE: exports.lanceBody,
                    },
      ],
    };
    exports.autolancer = makeAuto(exports.lancer, 'Auto Lancer'); 

       exports.fence = {
        PARENT: [exports.genericTank],
        SKILL_CAP: [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,],
        LABEL: 'Fencer',
        STAT_NAMES: statnames.lancer,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                AUTOFIRE: true,
                TYPE: exports.lancerbullet,
            }, },
        ],
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      270,     360,  0,], 
                    TYPE: exports.fenceBody,
                    },
      ],
    };
       exports.sword = {
        PARENT: [exports.genericTank],
        SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
        LABEL: 'Sword',
        STAT_NAMES: statnames.lancer,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sword]),
                AUTOFIRE: true,
                TYPE: exports.lancerbullet,
            }, },
        ],
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      270,     360,  0,], 
                    TYPE: exports.swordBody,
                    },
      ],
    };
       exports.inject = {
        PARENT: [exports.genericTank],
        SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
        LABEL: 'Injector',
        STAT_NAMES: statnames.lancer,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                AUTOFIRE: true,
                TYPE: exports.injectbullet,
            }, },
        ],
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      270,     360,  0,], 
                    TYPE: exports.injectBody,
                    },
      ],
    };
       exports.wildfire = {
        PARENT: [exports.genericTank],
        LABEL: 'Wildfire',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flamethrower]),
                TYPE: exports.flame,
            }, },{    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    22,     18,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, {
              POSITION: [    12,     11.5,     1.7,     8,      0,      180,      0,   ], 
},
        ],
    };
       exports.dualflamethrower = {
        PARENT: [exports.genericTank],
        LABEL: 'Baker',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flamethrower]),
                TYPE: exports.flame,
            }, }, {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    3,     4,     1,     0,      -4,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flamethrower]),
                TYPE: exports.flame,
            }, }, {
              POSITION: [    12,     11.5,     1.7,     8,      0,      0,      0,   ], 
},{
              POSITION: [    12,     11.5,     1.7,     4,      0,      0,      0,   ], 
},
        ],
    };
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.automini = makeAuto(exports.mini, 'Auto Mini'); 
        exports.minibee = {
            PARENT: [exports.genericTank],
            LABEL: 'Minibee',
            DANGER: 6,
            BODY: {
                FOV: 1.8,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bee,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bee,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bee,
                    }, },
            ],
        };
        exports.minilazer = {
            PARENT: [exports.genericTank],
            LABEL: 'Lazergun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.morereload]),
                        TYPE: exports.lazerbeam,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.morereload]),
                        TYPE: exports.lazerbeam,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.morereload]),
                        TYPE: exports.lazerbeam,
                    }, },
            ],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.rainbowdrive,
    }, ],
        };
        exports.minilazertest = {
            PARENT: [exports.genericTank],
            LABEL: 'Lazergun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.morereload]),
                        TYPE: exports.lazerbeam,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.morereload]),
                        TYPE: exports.lazerbeam,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.morereload]),
                        TYPE: exports.lazerbeam,
                    }, },
            ],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 20, 0, 0, 0, 1],
        TYPE: exports.rainbowdrive,
    }, ],
        };
exports.beeop = {
            PARENT: [exports.genericTank],
            LABEL: 'MInIbEeHeAlInGfAsTeRtHiNgY',
            DANGER: 6,
            BODY: {
                FOV: 1.8,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.brr,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.brr,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.brr,
                    }, },
            ],
        };
        exports.SleamS = {
            PARENT: [exports.genericTank],
            LABEL: 'SleamShot',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  19,     8,      1.5,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.mach]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  17,     8,      2,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.spray, g.mach]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.realtrap = {
    PARENT: [exports.genericTank],
    LABEL: "Trapper",
    SIZE: 12,
    SHAPE: 0,
            GUNS: [ {
                POSITION: [  13,     8,      1,      0,      0,     0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
};
exports.autorealtrap = makeAuto(exports.realtrap, 'Auto Trapper');
exports.traphybrid = makeHybrid(exports.realtrap, 'Traprid');
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "cropduster");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.autopound = makeAuto(exports.pound, 'Auto Pounder');
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
             ],
        };
        exports.scan = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Scanner',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.morereload, g.halfdamage]),
                    TYPE: exports.homingbullet,
                }, }, {
                POSITION: [  16,    13,      1.1,      0,      0,      0,      0,   ], 
                },
             ],
        };
        exports.autodestroy = makeAuto(exports.destroy, 'Auto Destoyer'); 
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Cartographer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
                             TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.decoTurretBee
    }, ],
            };
           exports.Cascal = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Cascadial',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.TSB,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
                            TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.decoTurretTrap
    }, ],
            };
           exports.Gunto = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Guntolium',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.BSB,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
               TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.decoTurretBullet
    }, ],
            };
exports.autogunto = makeAuto(exports.Gunto, 'Auto Gunto');
           exports.Catalyst = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Catalystial',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.SSB,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
                            TURRETS: [
    {
        POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.decoTurretSwarm
    }, ],
            };
           exports.Cescav = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Cescavas',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.ASB,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
                   TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [7, 15, 0, 0, 360, 0],
      TYPE: exports.aswdindicator
    }, {     /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.decoTurretAswd
    },
  ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
        exports.trip = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Tripwire',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  15,     13,      1.2,      0,      0,     0,     1   ],
                  }, {
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ],
                  }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.lessreload, g.lessreload]),
                          TYPE: exports.tripblock,
                    }, },
            ],
        };
       exports.autobuilder = makeAuto(exports.builder, 'Auto Builder');
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };

            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Conquerer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
exports.OOF = {
    PARENT: [exports.genericTank],
    LABEL: "OOF",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
        POSITION: [18, 6.4, 1, 0, 0, 0, 1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([
                g.fast, g.basic, g.stream, g.mini, g.doublereload, g.morereload, g.op, g.revix
            ]),
            TYPE: exports.bullet
        },
    }, ],
  };
exports.OOF2 = {
    PARENT: [exports.genericTank],
    LABEL: "OOF2",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
        POSITION: [18, 6.4, 1, 0, 0, 0, 1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([
                g.fast, g.basic, g.stream, g.mini, g.doublereload, g.morereload, g.op, g.revix
            ]),
            TYPE: exports.hive
        },
    }, ],
};
exports.Pelleter = {
    PARENT: [exports.genericTank],
    LABEL: "Pelleter",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
        POSITION: [19.385, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([
                [10, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 5, 1, 0.00001, 1]
            ]),
            TYPE: exports.bullet
        },
    }, ],
};
exports.railgun = {
  PARENT: [exports.genericTank],
  LABEL: "Railgun",
  DANGER: 7,
  BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.7,
            },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [1, 7.5, 0, 30, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [1, 7.5, 0, 15, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [1, 7.5, 0, 20, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.bullet
      }
      },
    {
      POSITION: [1, 7.5, 0, 25, 0, 0, 0],

      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [30, 1, 0, 10, 5, 0, 0]
    },
    {
      POSITION: [30, 1, 0, 10, -5, 0, 0]
    }
  ]
};
exports.uzisrailgun = {
  PARENT: [exports.genericTank],
  LABEL: "UZI's Railgun",
  DANGER: 7,
  BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.7,
            },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [1, 7.5, 0, 30, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.oplazerbeam
      }
    },
    {
      POSITION: [1, 7.5, 0, 15, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.op, g.morereload, g.morereload, g.morereload, g.morereload, g.morereload, g.morereload, g.morereload]),
        TYPE: exports.oplazerbeam
      }
    },
    {
      POSITION: [1, 7.5, 0, 20, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.oplazerbeam
      }
      },
    {
      POSITION: [1, 7.5, 0, 25, 0, 0, 0],

      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.oplazerbeam
      }
    },
    {
      POSITION: [30, 1, 0, 10, 5, 0, 0]
    },
    {
      POSITION: [30, 1, 0, 10, -5, 0, 0]
    }
  ],
  TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.rainbowdrive,
    }, ],
};
exports.uzisoprailgun = {
  PARENT: [exports.genericTank],
  LABEL: "UZI's OP Railgun",
  DANGER: 7,
  LEVEL: 9999999999999999999999,
  SCORE: 9999999999999999999999,
  BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 3,
            },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [1, 7.5, 0, 30, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.operlazerbeam
      }
    },
    {
      POSITION: [1, 7.5, 0, 15, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.op, g.morereload, g.morereload, g.morereload, g.morereload, g.morereload, g.morereload, g.morereload]),
        TYPE: exports.operlazerbeam
      }
    },
    {
      POSITION: [1, 7.5, 0, 20, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.operlazerbeam
      }
      },
    {
      POSITION: [1, 7.5, 0, 25, 0, 0, 0],

      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.fake]),
        TYPE: exports.operlazerbeam
      }
    },
    {
      POSITION: [30, 1, 0, 10, 5, 0, 0]
    },
    {
      POSITION: [30, 1, 0, 10, -5, 0, 0]
    }
  ],
  TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.rainbowdrive,
    }, ],
};
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'QuadTrapper',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.autoartillery = makeAuto(exports.artillery, 'Auto Artillery'); 
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };   
exports.MiniHunt = {
    PARENT: [exports.genericTank],
    LABEL: "Boxer",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [12.462, 11.2, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 2.5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.twister = {
  PARENT: [exports.genericTank],
  BODY: {
    FOV: base.FOV * 1.15
  },
  LABEL: "Twister",
  DANGER: 7,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [10, 10.5, -0.5, 9, 0, 0, 0]
    },
    {
      POSITION: [17, 15, 0.75, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.twist]),
        TYPE: exports.twistmissile,
        STAT_CALCULATOR: gunCalcNames.sustained
      }
    }
  ]
};
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread, g.og]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.flankdrive = {
        PARENT: [exports.genericTank],
        LABEL: 'Flankdrive',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.autobullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.autobullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.autobullet,
                }, },
        ],
        TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.driveindicator,
          }, 
        ], 
    };
        exports.autoflank = makeAuto(exports.flank, 'Auto Flank');
exports.hurricane = {
  PARENT: [exports.genericTank],
  LABEL: "Cyclone",
  DANGER: 7,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [15, 3.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 30, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 60, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 90, 0.75],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 150, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 180, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 210, 0.75],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 270, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 300, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 3.5, 1, 0, 0, 330, 0.75],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.puregunner,
          g.hurricane
        ]),
        TYPE: exports.bullet
      }
    }
  ]
};
exports.septatrap = (() => {
  let a = 360 / 7,
    d = 1 / 7;
  return {
    PARENT: [exports.genericTank],
    LABEL: "Septa-Trapper",
    DANGER: 7,
    BODY: {
      SPEED: base.SPEED * 0.8
    },
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
    GUNS: [
      {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 7, 1, 0, 0, 0, 0]
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap
        }
      },
      {
        POSITION: [15, 7, 1, 0, 0, a, 4 * d]
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, a, 4 * d],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap
        }
      },
      {
        POSITION: [15, 7, 1, 0, 0, 2 * a, 1 * d]
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 2 * a, 1 * d],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap
        }
      },
      {
        POSITION: [15, 7, 1, 0, 0, 3 * a, 5 * d]
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 3 * a, 5 * d],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap
        }
      },
      {
        POSITION: [15, 7, 1, 0, 0, 4 * a, 2 * d]
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 4 * a, 2 * d],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap
        }
      },
      {
        POSITION: [15, 7, 1, 0, 0, 5 * a, 6 * d]
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 5 * a, 6 * d],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap
        }
      },
      {
        POSITION: [15, 7, 1, 0, 0, 6 * a, 3 * d]
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 6 * a, 3 * d],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap
        }
      }
    ]
  };
})();
exports.tritrap = {
  PARENT: [exports.genericTank],
  LABEL: "Tri-Trapper",
  DANGER: 7,
  BODY: {
    SPEED: base.SPEED * 0.8
  },
  STAT_NAMES: statnames.trap,
  HAS_NO_RECOIL: true,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [15, 7, 1, 0, 0, 0, 0]
    },
    {
      POSITION: [3, 7, 1.7, 15, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
        TYPE: exports.trap
      }
    },
    {
      POSITION: [15, 7, 1, 0, 0, 120, 0]
    },
    {
      POSITION: [3, 7, 1.7, 15, 0, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
        TYPE: exports.trap
      }
    },
    {
      POSITION: [15, 7, 1, 0, 0, 240, 0]
    },
    {
      POSITION: [3, 7, 1.7, 15, 0, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
        TYPE: exports.trap
      }
    }
  ]
};
    exports.autotritrap = makeAuto(exports.tritrap, 'Auto Tri-Trapper'); 

        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'HexaTank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
              
            ],
        };
exports.autohexa = makeAuto(exports.hexa, 'Auto HexaTank'); 
exports.MachineShot = {
    PARENT: [exports.genericTank],
    LABEL: "MachineShot",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [18, 8, 1, 0, 0, 345, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 352.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 5, 1, 3000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 7.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 5, 1, 3000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [0.277, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [10, 0, 0.001, 1, 1, 0.75, 1, 5.4, 1, 5, 1, 360000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
exports.speedbent2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Speed-Triple',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil, g.speedbenttag]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.speedbenttag]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.speedbenttag]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
      TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.switchindicator,
    }, ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.crayon = {
    PARENT: [exports.genericTank],
    LABEL: "Crayon",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [16.615, 6.4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 2.5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [16.615, 6.4, 1, 0, -5.538, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 2.5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [16.615, 6.4, 1, 0, 5.538, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 2.5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.autocrayon = makeAuto(exports.crayon, 'Auto Crayon'); 
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: 'Brutalizer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.surfer = {
    PARENT: [exports.genericTank],
    LABEL: 'Surfer',
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -1, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 1, -90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.eagle = {
  PARENT: [exports.genericTank],
  LABEL: "Eagle",
  DANGER: 7,
  BODY: {
    ACCELERATION: base.ACCEL * 0.8
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 12, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
        TYPE: exports.bullet,
        LABEL: "Pounder",
        ALT_FIRE: true
      }
    },
    {
      POSITION: [16, 8, 1, 0, 0, 150, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flank,
          g.tri,
          g.thruster,
          g.halfrecoil
        ]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }
    },
    {
      POSITION: [16, 8, 1, 0, 0, 210, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flank,
          g.tri,
          g.thruster,
          g.halfrecoil
        ]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }
    },
    {
      POSITION: [18, 8, 1, 0, 0, 180, 0.6],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flank,
          g.tri,
          g.thruster,
          g.halfrecoil
        ]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }
    }
  ]
};
        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
        exports.autoauto3 = makeAuto(exports.auto3, 'Auto Auto3'); 
        exports.Mascallenus = { 
            PARENT: [exports.genericTank],
            LABEL: 'Mascallenus',
            DANGER: 6,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
        exports.Mascallenus2 = { 
            PARENT: [exports.genericTank],
            LABEL: 'FTB to Arras',
            DANGER: 6,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
exports.Clicker = {
    PARENT: [exports.genericTank],
    LABEL: "Clicker",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [18, 9.6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20.769, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 6.4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 6.4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [24, 1, 0.001, 1, 1, 0.75, 1, 2.25, 1, 5, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
            exports.arch = {
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Sniper-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                                 },
                ],
            };
exports.interceptioner = {
    PARENT: [exports.genericTank],
    LABEL: 'Interceptioner',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.autobullet,
          }
       }
    ],
    TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.driveindicator,
         }
        ]
      };

exports.twindrive = {
        PARENT: [exports.genericTank],
        LABEL: 'Twindrive',
        DANGER: 6,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.autobullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.autobullet,
            }, 
          }, 
        ],
  TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.driveindicator,
          }, 
        ], 
      };
exports.bentdrive = {
            PARENT: [exports.genericTank],
            LABEL: 'Bentdrive',
            DANGER: 7,
            BODY: {
                SPEED:  base.SPEED * 0.9,
                HEALTH: base.HEALTH * 0.95,
                SHIELD: base.SHIELD * 0.8,
                DAMAGE: base.DAMAGE * 0.85,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.autobullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.autobullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.autobullet,
                    }, },
            ],
        TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.driveindicator,
          }, 
        ], 
      };
         exports.doubletwindrive = {
        PARENT: [exports.genericTank],
        LABEL: 'Double Twindrive',
        DANGER: 7,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.autobullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.autobullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    5.5,     180,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.autobullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.autobullet,
            }, 
          }, 
        ],
  TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.driveindicator,
          }, 
        ], 
      };

exports.ceptionist = {
    PARENT: [exports.genericTank],
    LABEL: 'Ceptionist',
    DANGER: 6,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,    ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.ceptionistBullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,      0,  1], 
            TYPE: exports.ceptionistMarking,
      },
    ],
};
    exports.twinceptionist = {
        PARENT: [exports.genericTank],
        LABEL: 'Twinceptionist',
        DANGER: 7,
        BODY: {
        HEALTH: base.HEALTH * 0.95,
        SHIELD: base.SHIELD * 0.8,
        DAMAGE: base.DAMAGE * 0.85,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.ceptionistBullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.ceptionistBullet,
            }, }, 
        ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,      0,  1], 
            TYPE: exports.ceptionistMarking,
        },
    ],
};
exports.doubletwinceptionist = {
        PARENT: [exports.genericTank],
        LABEL: 'Double Twinceptionist',
        DANGER: 7,
        BODY: {
        HEALTH: base.HEALTH * 0.95,
        SHIELD: base.SHIELD * 0.8,
        DAMAGE: base.DAMAGE * 0.85,
        SPEED: base.SPEED * 0.9,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.ceptionistBullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.ceptionistBullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    5.5,     180,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.ceptionistBullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.ceptionistBullet,
            }, }, 
        ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,      0,  1], 
            TYPE: exports.ceptionistMarking,
        },
    ],
};
exports.bentceptionist = {
            PARENT: [exports.genericTank],
            LABEL: 'Bentceptionist',
            DANGER: 7,
            BODY: {
            HEALTH: base.HEALTH * 0.95,
            SHIELD: base.SHIELD * 0.8,
            DAMAGE: base.DAMAGE * 0.85,
            SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.ceptionistBullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.ceptionistBullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.ceptionistBullet,
                    }, },
            ],
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,      0,  1], 
            TYPE: exports.ceptionistMarking,
        },
    ],
};

exports.HellTank = {
    PARENT: [exports.genericTank],
    LABEL: 'HellTank',
    GUNS: [{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 0.7408524093893902, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -3, 20, 359.76896988310455, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -3, -20, 1.278711307049889, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, 0, 0, 0.32928246384653903, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: undefined,
        },
    },{
      POSITION: [18.571428571428573, 7.142857142857143, 1, -20, 0, 177.57150038964483, 0],
      PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
        }, },
    ],
};
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
      exports.propel = {
       PARENT: [exports.genericTank],
       LABEL: 'Propeller',
       GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
               PROPERTIES: {
                   SHOOT_SETTINGS: combineStats([g.basic, g.propel, g.trifront, g.tonsmorrecoil]),
                   TYPE: exports.bullet,
                   LABEL: 'Front',
               }, }, {   
           POSITION: [  16,     6,      1,      0,      0,    150,   0.1,  ], 
               PROPERTIES: {
                   SHOOT_SETTINGS: combineStats([g.basic, g.propel, g.thruster]),
                   TYPE: exports.bullet,
                   LABEL: gunCalcNames.thruster,
               }, }, {   
           POSITION: [  16,     6,      1,      0,      0,    210,   0.1,  ], 
               PROPERTIES
                 : {
                   SHOOT_SETTINGS: combineStats([g.basic, g.propel, g.thruster]),
                   TYPE: exports.bullet,
                   LABEL: gunCalcNames.thruster,
               }, },
       ],
   }; 
exports.autopropel = makeAuto(exports.propel, 'Auto Propel');
exports.autopropelH = makeAutoH(exports.propel, 'Homing-Auto Propel'); 

exports.bulwark = {
  PARENT: [exports.genericTank],
  LABEL: "Bulwark",
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 8, 1, 0, 5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
        TYPE: exports.bullet
      }
    },
    {
      /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [10, 8, 1, 0, 5.5, 190, 0]
    },
    {
      POSITION: [4, 8, 1.7, 10, 5.5, 190, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap]),
        TYPE: exports.trap,
        STAT_CALCULATOR: gunCalcNames.trap
      }
    },
    {
      POSITION: [10, 8, 1, 0, -5.5, 170, 0]
    },
    {
      POSITION: [4, 8, 1.7, 10, -5.5, 170, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap]),
        TYPE: exports.trap,
        STAT_CALCULATOR: gunCalcNames.trap
      }
    }
  ]
};
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
          exports.autoflanktrap = makeAuto(exports.flanktrap, 'Auto Flanktrap'); 
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.Marker = {
    PARENT: [exports.genericTank],
    LABEL: "Marker",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [17.723, 7.04, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [50, 0, 0.001, 1, 1, 0.75, 1, 5.76, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [16.062, 7.04, 1, 0, -2.769, 0, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [100, 0, 0.001, 1, 1, 0.75, 1, 5.22, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 7.04, 1, 0, -5.538, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [100, 0, 0.001, 1, 1, 0.75, 1, 4.05, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [16.062, 7.04, 1, 0, 2.769, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [100, 0, 0.001, 1, 1, 0.75, 1, 5.22, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 7.04, 1, 0, 5.538, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [100, 0, 0.001, 1, 1, 0.75, 1, 4.05, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.BallzyOP = {
    PARENT: [exports.genericTank],
    LABEL: "Ballzy OP",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
        POSITION: [27.692, 22.4, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([ g.op,
                [10, 0.4, 0.001, 1, 1, 0.75, 1, 2.7, 1, 7.5, 1, 0.00001, 1]
            ]),
            TYPE: exports.bullet
        },
    }, ],
};
exports.Brush = {
    PARENT: [exports.genericTank],
    LABEL: "Paintbrush",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.40, 1, 5.85, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 8, 1, 0, -5.538, 22.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.40, 1, 4.05, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 8, 1, 0, 5.538, 337.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.40, 1, 4.05, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [14.954, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0.1, 0.001, 1, 1, 0.40, 1, 4.86, 1, 3, 1, 10000, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};exports.Pastel = {
    PARENT: [exports.genericTank],
    LABEL: 'Pastel',
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [17.723, 7.04, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [30, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17.723, 7.04, 1, 0, -5.538, 0, 0.167],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17.723, 7.04, 1, 0, 5.538, 0, 0.833],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17.723, 7.04, 1, 0, 2.769, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17.723, 7.04, 1, 0, -2.769, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.Highlighter = {
    PARENT: [exports.genericTank],
    LABEL: 'Highlighter',
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [17.723, 7.04, 1, 0, -3.877, 0, 0.167],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17.723, 7.04, 1, 0, 3.877, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 7.04, 1, 0, 3.877, 0, 0.833],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 7.04, 1, 0, -3.877, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [60, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [13.292, 7.04, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [30, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};exports.Pen = {
    PARENT: [exports.genericTank],
    LABEL: 'Pen',
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [19.108, 7.04, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.75, 1, 4.05, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17.723, 6.4, 1, 0, -4.154, 352.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 1, 1, 0.75, 1, 3.15, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17.723, 6.4, 1, 0, 4.154, 7.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [20, 0, 0.001, 1, 1, 0.75, 1, 3.15, 1, 4, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    exports.sniperhybrid = makeHybrid(exports.sniper, 'Snigrav');
    exports.autosniperhybrid = makeHybrid(exports.autosniper, 'Auto Snigrav');
    exports.aswdwsahybrid = makeHybrid(exports.aswdwsa, 'AsWdragafora'); 
    exports.assassinhybrid = makeHybrid(exports.assassin, 'Assasolak');
    exports.builderhybrid = makeHybrid(exports.builder, 'Builifacate'); 
    exports.autorealtraphybrid = makeHybrid(exports.autorealtrap, 'Auto Traprid');
    exports.flamethrowerhybrid = makeHybrid(exports.flamethrower, 'Emberack');
    exports.autoflamethrower = makeAuto(exports.flamethrower, 'Auto Flamethrower');
    exports.lancerhybrid = makeHybrid(exports.lancer, 'Laciate'); 
// UPGRADE PATHS /upgrades
exports.testbed.UPGRADES_TIER_1 = [
    exports.basic,
    exports.Mascallenus,
    exports.Beta,
    exports.AIT,
    exports.minion
];

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.realtrap, exports.autobasic, exports.basichybrid, exports.propel, exports.armour];
exports.basic.UPGRADES_TIER_2 = [exports.cloner];
exports.basic.UPGRADES_TIER_3 = [exports.single];

    exports.armour.UPGRADES_TIER_2 = [exports.smash, exports.lancer, exports.autoarmour];
    exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.weirdspike, exports.landmine, exports.jumpsmash];
    exports.lancer.UPGRADES_TIER_3 = [exports.sword, exports.inject, exports.fence, exports.lancerhybrid, exports.autolancer];

    exports.cloner.UPGRADES_TIER_3 = [exports.hivemind, exports.splitter, exports.autocloner];

    exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.builder, exports.artillery, exports.autopound, exports.Gunto];
    exports.pound.UPGRADES_TIER_3 = [exports.eagle];
    exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.construct, exports.shotgun2, exports.Cescav, exports.autodestroy, exports.conq, exports.scan];

    exports.realtrap.UPGRADES_TIER_2 = [exports.flanktrap, exports.builder, exports.tritrap, exports.autorealtrap, exports.traphybrid];
    exports.realtrap.UPGRADES_TIER_3 = [exports.minitrap];
    exports.tritrap.UPGRADES_TIER_3 = [exports.fortress, exports.hexatrap, exports.septatrap, exports.arch, exports.autotritrap];

    exports.propel.UPGRADES_TIER_2 = [exports.tri, exports.autopropel];

    exports.basichybrid.UPGRADES_TIER_2 = [exports.traphybrid, exports.sniperhybrid, exports.autobasichybrid];
        exports.basichybrid.UPGRADES_TIER_3 = [exports.hybrid, exports.overgunner];
        exports.sniperhybrid.UPGRADES_TIER_3 = [exports.aswdwsahybrid, exports.riflehybrid, exports.assassinhybrid, exports.poach, exports.builderhybrid, exports.autosniperhybrid]
        exports.traphybrid.UPGRADES_TIER_3 = [exports.overtrap, exports.autorealtraphybrid];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.crayon, exports.gunner, exports.hexa, exports.autotwin];
        exports.twin.UPGRADES_TIER_3 = [exports.dual, exports.twindrive, exports.musket, exports.bulwark, exports.lazertwin];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble, exports.Oliver];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple, exports.Oliver, exports.Pen, exports.autobent, exports.speedbent1];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machinegunner, exports.hurricane, exports.Pastel];
        exports.crayon.UPGRADES_TIER_3 = [exports.Marker, exports.Brush, exports.Pastel, exports.Highlighter, exports.Pen, exports.autocrayon];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.aswdwsa, exports.autosniper, exports.rifle, exports.sniperhybrid];
        exports.aswdwsa.UPGRADES_TIER_3 = [exports.PoisonCannon, exports.FreezeCannon, exports.StunCannon, exports.Primordial, exports.Zoom, exports.autoaswdwsa, exports.Cescav, exports.aswdwsahybrid];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack, exports.sniperdrive];
        exports.rifle.UPGRADES_TIER_3 = [exports.infantry, exports.musket, exports. riflehybrid, exports.autorifle];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.autoass, exports.railgun, exports.stalker, exports.infantry, exports.assassinhybrid];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.Clicker, exports.poach, exports.dual, exports.infantry, exports.autohunter];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer, exports.arch, exports.trip, exports.builderhybrid];

    exports.machine.UPGRADES_TIER_2 = [exports.artillery, exports.mini, exports.gunner, exports.automachine, exports.flamethrower];
        exports.machine.UPGRADES_TIER_3 = [exports.spray, exports.SleamS, exports.machinedrive];
        exports.Gunto.UPGRADES_TIER_3 = [exports.Cascal, exports.hiveshooter, exports.Catalyst, exports.Cescav, exports.autogunto];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer, exports.twister, exports.sidewind, exports.autoartillery];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.minibee, exports.nailgun, exports.minitrap, exports.hybridmini, exports.SleamS, exports.automini, exports.minilazer];
        exports.flamethrower.UPGRADES_TIER_3 = [exports.dualflamethrower, exports.wildfire, exports.flamethrowerhybrid, exports.autoflamethrower];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.autoflank];
        exports.flank.UPGRADES_TIER_3 = [exports.flankdrive];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.eagle, exports.autotri, exports.DeltaCannon, exports.brutalizer, exports.wildfire, exports.speedbent2];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap, exports.hurricane, exports.autohexa];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.sniper3, exports.autoauto3, exports.autosmash];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber, exports.Oliver, exports.bulwark, exports.hybridmini, exports.autoflanktrap];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact, exports.autodirector];
        exports.director.UPGRADES_TIER_3 = [exports.manage, exports.dictator];
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory, exports.autolilfact, exports.lilfacttrap];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.master, exports.autoover, exports.overdrive, exports.manage];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.autounderseer, exports.mal];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.revix, exports.autocruiser, exports.UNLOCKED, exports.Catalyst];

    exports.autobasic.UPGRADES_TIER_2 = [exports.autotwin, exports.autosniper, exports.automachine, exports.autoflank, exports.autodirector, exports.autopound, exports.autorealtrap, exports.auto3, exports.autobasichybrid, exports.autopropel, exports.autoarmour, exports.interceptioner, exports.revolutionist];
          exports.autobasic.UPGRADES_TIER_3 = [exports.autocloner, exports.twin, exports.flank, exports.venus];
          exports.interceptioner.UPGRADES_TIER_3 = [exports.twindrive, exports.flankdrive, exports.machinedrive, exports.sniperdrive, exports.overdrive, exports.hadoken];
          exports.automachine.UPGRADES_TIER_3 = [exports.autogunner, exports.automini, exports.autoartillery, exports.autodestroy, exports.autogunto, exports.autoflamethrower, exports.machineceptionist,];
          exports.autosniper.UPGRADES_TIER_3 = [exports.autoass, exports.autohunter, exports.automini, exports.autoaswdwsa, exports.autoover, exports.autorifle, exports.autosniperhybrid];
          exports.autoflank.UPGRADES_TIER_3 = [exports.autotri, exports.autohexa, exports.autoauto3, exports.autoflanktrap];
          exports.autotwin.UPGRADES_TIER_3 = [exports.autogunner, exports.autodouble, exports.autobent, exports.autohexa, exports.autocrayon];
          exports.autodirector.UPGRADES_TIER_3 = [exports.autoover, exports.autocruiser, exports.autounderseer];
          exports.autorealtrap.UPGRADES_TIER_3 = [exports.autoflanktrap, exports.autobuilder, exports.autotritrap, exports.autorealtraphybrid];
          exports.autopound.UPGRADES_TIER_3 = [exports.autodestroy, exports.autobuilder, exports.autoartillery, exports.autogunto];
          exports.autobasichybrid.UPGRADES_TIER_3 = [exports.autoflanktrap];
          exports.autopropel.UPGRADES_TIER_3 = [exports.autotri, exports.autopropelH];
          exports.autohomingbasic.UPGRADES_TIER_3 = [exports.autopropelH];
          exports.revolutionist.UPGRADES_TIER_3 = [exports.mercury, exports.venus, exports.earth, exports.mars, exports.jupiter, exports.saturn, exports.uranus, exports.neptune, exports.autorevolutionist];


    /*exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa, DeltaCannon];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.autoass];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri, exports.DeltaCannon];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        exports.elite_gunner = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        };
    exports.solario = {
        PARENT: [exports.miniboss],
        LABEL: 'Solario',
        COLOR: 13,
        SHAPE: 0,
        SIZE: 25,
        VARIES_IN_SIZE: true,
        VALUE: 250000,
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 1,
            HEALTH: base.HEALTH * 0.6,
            SHIELD: base.SHIELD * 0.6,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
                FACING_TYPE: 'autospin',
                //CONTROLLERS: ['nearestDifferentMaster'],
                  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 25, 0, 0, 360, 0],
      TYPE: [exports.autoTurret, {COLOR: 13}],
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -25, 0, 0, 360, 0],
      TYPE: [exports.autoTurret, {COLOR: 13}],
    }, {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 15, 15, 0, 360, 0],
      TYPE: [exports.sniper3gun, {COLOR: 13}],
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 15, -15, 0, 360, 0],
      TYPE: [exports.heavy3gun, {COLOR: 13}],
    },{
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [12, 0, 0, 0, 360, 0],
      TYPE: [exports.revolutionistring, {COLOR: 13}],
    }, {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 0, 25, 0, 360, 0],
      TYPE: [exports.autoTurret, {COLOR: 13}],
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 0, -25, 0, 360, 0],
      TYPE: [exports.autoTurret, {COLOR: 13}],
    }, {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -15, 15, 0, 360, 0],
      TYPE: [exports.auto4gun, {COLOR: 13}],
    },     {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, -15, -15, 0, 360, 0],
      TYPE: [exports.machine3gun, {COLOR: 13}],
    },{
            /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 0, 0, 0, 360, 0],
      TYPE: [exports.reverserevolutionistring, {COLOR: 13}],
    } ],
            };
    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();
exports.bot = {
    AUTO_UPGRADE: 'random',
    VALUE: 30000,
    FACING_TYPE: 'looseToTarget',
    HITS_OWN_TYPE: 'hard',
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.5, 
        pen: 0.5,
        str: 0.5,
        spd: 0.2,
        atk: 0.2,
        hlt: 0.2,
        shi: 0.2,
        rgn: 0.2,
        mob: 0.3,       
    }),
    BODY: {
        SIZE: 15,
    },
    COLOR: 1,
    NAME: "Ai_",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
};

// exports.testbed.UPGRADES_TIER_1.push(exports.elite_sprayer); //

exports.Mascallenus.UPGRADES_TIER_1 = [
    exports.testbed,
    exports.Mascallenus2,
    exports.OOF,
    exports.OOF2,
    exports.AngelCannon,
    exports.Steeder,
    exports.urmum,
    exports.beeop,
    exports.uzisrailgun,
    exports.uzisoprailgun,
    exports.BallzyOP,
    exports.lucas
];
exports.Mascallenus2.UPGRADES_TIER_1 = [
      exports.testbed,
      exports.Mascallenus,
      exports.MiniHunt,
      exports.HellTank,
      exports.NAUTULUS,
      exports.Rocketer,
      exports.Lottery,
      exports.HELLBLAZER,
      exports.TrapHard,
      exports.FlameKilla,
      exports.MachineShot
];
exports.Beta.UPGRADES_TIER_1 = [
  exports.testbed,
  exports.minilazertest,
  exports.singletest,
  exports.cyanide,
  exports.snipertest
];
exports.AIT.UPGRADES_TIER_1 = [
  exports.testbed,
  exports.sentry,
  exports.trapTurret,
  exports.arenacloser,
  exports.AIT2
];
exports.sentry.UPGRADES_TIER_1 = [
  exports.sentryTrap,
  exports.sentryGun,
];
/*/ exports.optanks.UPGRADES_TIER_1 = [ 
exports.BallzyOP,
exports.lucas
]; /*/
  exports.speedbent1.UPGRADES_TIER_1 = [
  exports.speedbent2
];
  exports.speedbent2.UPGRADES_TIER_1 = [
  exports.speedbent1
];
exports.AIT2.UPGRADES_TIER_1 = [
  exports.testbed,
  exports.AIT,
  exports.palisade,
  exports.elite_gunner,
  exports.elite_destroyer,
  exports.elite_sprayer,
  exports.elite,
  exports.solario
];
/*/exports.OOF.UPGRADES_TIER_3 = [
  exports.elite,
  exports.elite_destroyer,
  exports.elite_gunner,
  exports.elite_sprayer
]; /*/

/*/ AAAAAAAAAAAAAa
exports.lucastank1 = {
  PARENT: [exports.genericTank],
  LABEL: 'lucastank1.0',
   GUNS: [{ /*  SIZE     X       Y     ANGLE    ARC
                POSITION: [   5,    10,      0,      30,    110, 0, 0], 
                  PROPERTIES: {
                      SHOOT_SETTINGS: combineStats([g.basic, g.single, g.op, g.morereload, g.mini]),
                      TYPE: exports.lazerbeam,
                    },  }, {
                POSITION: [   5,    10,      0,      90,    110, 0, 0], 
                  PROPERTIES: {
                      SHOOT_SETTINGS: combineStats([g.basic, g.single, g.op, g.morereload, g.mini]),
                      TYPE: exports.lazerbeam,
                    },  }, {
                POSITION: [   5,    10,      0,     150,    110, 0, 0], 
                  PROPERTIES: {
                      SHOOT_SETTINGS: combineStats([g.basic, g.single, g.op, g.morereload, g.mini]),
                      TYPE: exports.lazerbeam,
                    },  }, {
                POSITION: [   5,    10,      0,     210,    110, 0, 0], 
                  PROPERTIES: {
                      SHOOT_SETTINGS: combineStats([g.basic, g.single, g.op, g.morereload, g.mini]),
                      TYPE: exports.lazerbeam,
                    },  }, 
    ],
}; /*/