
// various 'css' params we use in overlay based on game/style chosen



const overlayParams = {
    "Default": {
        style1: {
            teamBoxWidth: "685px",
            teamBoxHeight: "46px",
            teamTopPosition: "13px",
            teamSideOffset: "0px",
            middleTopPosition: "8px",
            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",
        }
    },

    "Marvel Rivals": {
        style1: {
            //   --teamBoxHeight: 50px;
            //   --middleTopPosition: 17px;
            //   --skew-angle-positive: 15deg;
            //   --skew-angle-negative: -15deg;

            teamBoxWidth: "510px",
            teamTopPosition: "31px",
            teamSideOffset: "15px",
            teamBoxHeight: "50px",
            middleTopPosition: "3px",
            "skew-angle-positive": "15deg",
            "skew-angle-negative": "-15deg",
            teamLeftOuterPadding: "8px",
            teamRightOuterPadding: "8px",
            teamNameInnerPadding: "20px",
            teamGroupTopPosition: "40px",
            teamGroupSideOffset: "400px",

        }
    },

    "Overwatch": {
        style1: {
            teamBoxWidth: "685px",
            teamBoxHeight: "46px",
            teamTopPosition: "13px",
            teamSideOffset: "0px",
            middleTopPosition: "8px",
            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",
            teamGroupTopPosition: "20px",
            teamGroupSideOffset: "685px"
        }
    },

    "Valorant": {
        default: {
            middleWidth: "120px",
            scoreSize: "2.5em",

            teamBoxWidth: "430px",
            teamBoxHeight: "40px",

            teamTopPosition: "30px",
            teamSideOffset: "-0px",
            middleTopPosition: "95px",
            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",

            teamLeftClipPath: "var(--arrowRightClipPath)",
            teamRightClipPath: "var(--arrowLeftClipPath)",

            teamLeftInnerPadding: "15px",
            teamRightInnerPadding: "15px",

            teamLeftBorderLeft: "7px solid #27AAE1",
            teamLeftBorderRight: "0px solid #C80013",

            teamRightBorderLeft: "0px solid #27AAE1",
            teamRightBorderRight: "7px solid #C80013",
        },
        style1: {
            teamLogoSize: "25px",
            teamNameSize: "1.1em",
            scoreSize: "1.4em",

            teamBoxWidth: "400px",
            teamBoxHeight: "20px",

            teamTopPosition: "7px",
            teamSideOffset: "-425px",

            middleHeight: "25px",
            middleWidth: "120px",
            middleTopPosition: "95px",

            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",

            middleTextSize: "1.1em",

            teamLeftClipPath: "polygon(0 0, 93% 0, 94% 1%, 95% 2%, 100% 50%, 95% 98%, 94% 99%, 93% 100%, 0 100%, 0 98%, 0 52%, 0 50%)",
            teamRightClipPath: "polygon(100% 0, 100% 49%, 100% 100%, 7% 100%, 6% 99%, 5% 98%, 0 50%, 5% 2%, 6% 1%, 7% 0)",

            teamLeftBorderLeft: "4px solid #27AAE1",
            teamLeftBorderRight: "0px solid #C80013",

            teamRightBorderLeft: "0px solid #27AAE1",
            teamRightBorderRight: "4px solid #C80013"
        },
        style2: {
            middleWidth: "120px",
            scoreSize: "2.0em",

            teamBoxWidth: "350px",
            teamBoxHeight: "40px",

            teamTopPosition: "90px",
            teamSideOffset: "-490px",

            middleTopPosition: "95px",
            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",

            teamLeftBorderLeft: "7px solid #27AAE1",
            teamLeftBorderRight: "0px solid #C80013",

            teamRightBorderLeft: "0px solid #27AAE1",
            teamRightBorderRight: "7px solid #C80013"
        },
        style3: {
            middleWidth: "120px",
            scoreSize: "2.0em",

            teamBoxWidth: "430px",
            teamBoxHeight: "40px",

            teamTopPosition: "90px",
            teamSideOffset: "-500px",

            middleHeight: "25px",
            middleTopPosition: "98px",
            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",

            teamLeftClipPath: "polygon(100% 0, 100% 49%, 100% 100%, 7% 100%, 0 50%, 7% 0)",
            teamRightClipPath: "polygon(93% 0, 100% 50%, 93% 100%, 0 100%, 0 50%, 0 0)",

            teamLeftInnerPadding: "20px",
            teamRightInnerPadding: "20px",

            teamLeftBorderLeft: "7px solid #27AAE1",
            teamLeftBorderRight: "0px solid #C80013",

            teamRightBorderLeft: "0px solid #27AAE1",
            teamRightBorderRight: "7px solid #C80013"
        },
        style4: {
            middleWidth: "120px",
            scoreSize: "2.5em",

            teamBoxWidth: "430px",
            teamBoxHeight: "40px",

            teamTopPosition: "30px",
            teamSideOffset: "-0px",
            middleTopPosition: "95px",
            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",

            teamLeftClipPath: "var(--arrowRightClipPath)",
            teamRightClipPath: "var(--arrowLeftClipPath)",

            teamLeftInnerPadding: "15px",
            teamRightInnerPadding: "15px",

            teamLeftBorderLeft: "7px solid #27AAE1",
            teamLeftBorderRight: "0px solid #C80013",

            teamRightBorderLeft: "0px solid #27AAE1",
            teamRightBorderRight: "7px solid #C80013",

        }
    },

    "Call of Duty": {
        style1: {
            teamLogoSize: "0px", // this is simply making the default logo size not visible in a terrible way..
            teamBoxWidth: "610px",
            teamBoxHeight: "55px",
            teamTopPosition: "13px",
            teamSideOffset: "-43px",

            scoreSize: "2.5em",
            teamNameSize: "1.3em",



            middleTopPosition: "15px",
            middleHeight: "30px",
            middleWidth: "475px",

            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",
            teamGroupTopPosition: "20px",
            teamGroupSideOffset: "685px",

            teamRightBorderLeft: "0px solidrgba(39, 169, 225, 0)",
            teamRightBorderRight: "0px solidrgba(200, 0, 20, 0)",
            teamLeftBorderLeft: "0px solidrgba(39, 169, 225, 0)",
            teamLeftBorderRight: "0px solidrgba(200, 0, 20, 0)",

            teamLeftClipPath: "none",
            teamRightClipPath: "none",
        }
    },
    "League of Legends": {
        style1: {
            teamLogoSize: "0px",
            teamBoxWidth: "200px",
            teamBoxHeight: "60px",
            teamTopPosition: "2px",
            teamSideOffset: "-220px",
            teamRightSideOffset: "-6px",
            // teamLeftSideOffset: "0px",

            scoreSize: "2em",
            teamNameSize: "1.3em",

            middleTopPosition: "115px",
            middleHeight: "35px",
            middleWidth: "200px",

            "skew-angle-positive": "0deg",
            "skew-angle-negative": "0deg",

            teamGroupTopPosition: "-220px", // assuring its off screen at all times 
            teamGroupSideOffset: "-685px", // although html should do this considering no side is set

            // teamRightBorderLeft: "3px solid #27AAE1",
            teamRightBorderRight: "3px solid #C80013",
            teamLeftBorderLeft: "3px solid #27AAE1",
            teamRightBorderLeft: "0px solidrgba(39, 169, 225, 0)",
            teamLeftBorderRight: "0px solidrgba(200, 0, 20, 0)",

            teamRightClipPath: "polygon(100% 0, 100% 100%, 0 100%, 10% 0)",
            teamLeftClipPath: "polygon(0 0, 0 100%, 100% 100%, 90% 0)"
        }
    }
}

