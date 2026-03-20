const storyTree = {
    intro: {
        file: "assets/intro.svg",
        buttons: [
            { id: "start!", next: "intro2" }
        ]
    },
    intro2: {
        file: "assets/intro2.svg",
        buttons: [
            { id: "next", next: "intro3" }
        ]
    },
    intro3: {
        file: "assets/intro3.svg",
        buttons: [
            { id: "next", next: "intro4" }
        ]
    },
    intro4: {
        file: "assets/intro4.svg",
        buttons: [
            { id: "next", next: "intro5" }
        ]
    },
    intro5: {
        file: "assets/intro5.svg",
        buttons: [
            { id: "next", next: "intro6" }
        ]
    },
    intro6: {
        file: "assets/intro6.svg",
        buttons: [
            { id: "next", next: "intro7" }
        ]
    },
    intro7: {
        file: "assets/intro7.svg",
        buttons: [
            { id: "next", next: "intro8" }
        ]
    },
    intro8: {
        file: "assets/intro8.svg",
        buttons: [
            { id: "next", next: "intro9" }
        ]
    },
    intro9: {
        file: "assets/intro9.svg",
        buttons: [
            { next: "intro10" }
        ]
    },
    intro10: {
        file: "assets/intro10.svg",
        buttons: [
            { next: "intro11" }
        ]
    },
    intro11: {
        file: "assets/intro11.svg",
        buttons: [
            { next: "intro12" }
        ]
    },
    intro12: {
        file: "assets/intro12.svg",
        buttons: [
            { next: "intro13" }
        ]
    },
    intro13: {
        file: "assets/intro13.svg",
        buttons: [
            { next: "intro14" }
        ]
    },
    intro14: {
        file: "assets/intro14.svg",
        buttons: [
            { next: "intro15" }
        ]
    },
    intro15: {
        file: "assets/intro15.svg",
        buttons: [
            { id: "next", next: "scene16" }
        ]
    },
    scene16: {
        file: "assets/16.svg",
        buttons: [
            { id: "next", next: "run" }
        ]
    },
    run: {
        file: "assets/run.svg",
        buttons: [
            { id: "yes", next: "run1-yes" },
            { id: "no", next: "run1-no" }
        ]
    },
    "run1-yes": {
        file: "assets/run1-yes.svg",
        buttons: [
            { next: "run-yes-split" }
        ]
    },
    "run1-no": {
        file: "assets/run1-no.svg",
        buttons: [
            { next: "run2-no" }
        ]
    },
    "run2-no": {
        file: "assets/run2-no.svg",
        buttons: [
            { next: "run3-no" }
        ]
    },
    "run3-no": {
        file: "assets/run3-no.svg",
        buttons: [
            { next: "run4-no" }
        ]
    },
    "run4-no": {
        file: "assets/run4-no.svg",
        buttons: [
            { next: "run5-no-end" }
        ]
    },
    "run5-no-end": {
        file: "assets/run5-no-end.svg",
        buttons: []
    },
    "run-yes-split": {
        file: "assets/run-yes-split.svg",
        buttons: [
            { id: "yes", next: "split1-yes-enterrocket-no" },
            { id: "no", next: "split1-no" }
        ]
    },
    "split1-no": {
        file: "assets/split1-no.svg",
        buttons: [
            { id: "next", next: "split2-no" }
        ]
    },
    "split2-no": {
        file: "assets/split2-no.svg",
        buttons: [
            { id: "next", next: "split-no-listen" }
        ]
    },
    "split-no-listen": {
        file: "assets/split-no-listen.svg",
        buttons: [
            { id: "yes", next: "listen-enterrocket" },
            { id: "no", next: "listen1-no" }
        ]
    },
    "listen-enterrocket": {
        file: "assets/listen-enterrocket.svg",
        buttons: [
            { id: "yes", next: "enterrocket1-yes" },
            { id: "no", next: "split1-yes-enterrocket-no" }
        ]
    },
    "enterrocket1-yes": {
        file: "assets/enterrocket1-yes.svg",
        buttons: [
            { next: "enterrocket2-yes" }
        ]
    },
    "enterrocket2-yes": {
        file: "assets/enterrocket2-yes.svg",
        buttons: [
            { next: "enterrocket3-yes-end" }
        ]
    },
    "enterrocket3-yes-end": {
        file: "assets/enterrocket3-yes-end.svg",
        buttons: []
    },
    "listen1-no": {
        file: "assets/listen1-no.svg",
        buttons: [
            { id: "next", next: "listen2-no" }
        ]
    },
    "listen2-no": {
        file: "assets/listen2-no.svg",
        buttons: [
            { id: "next", next: "listen3-no-planning-no" }
        ]
    },
    "listen3-no-planning-no": {
        file: "assets/listen3-no-planning-no.svg",
        buttons: [
            { next: "listen4-no" }
        ]
    },
    "listen4-no": {
        file: "assets/listen4-no.svg",
        buttons: [
            { id: "next", next: "listen-enterrocket" }
        ]
    },
    "listen-laborweapon": {
        file: "assets/listen-laborweapon.svg",
        buttons: [
            { id: "no", next: "laborweapon1-no" },
            { id: "yes", next: "laborweapon-recognize" }
        ]
    },
    "laborweapon1-no": {
        file: "assets/laborweapon1-no.svg",
        buttons: [
            { id: "next", next: "laborweapon-recognize" }
        ]
    },
    "laborweapon-recognize": {
        file: "assets/laborweapon-recognize.svg",
        buttons: [
            { id: "yes", next: "recognize1-yes" },
            { id: "no", next: "recognize1-no" }
        ]
    },
    "recognize1-yes": {
        file: "assets/recognize1-yes.svg",
        buttons: [
            { id: "next", next: "recognize2-yes" }
        ]
    },
    "recognize2-yes": {
        file: "assets/recognize2-yes.svg",
        buttons: [
            { id: "next", next: "recognize3-yes" }
        ]
    },
    "recognize3-yes": {
        file: "assets/recognize3-yes.svg",
        buttons: [
            { id: "next", next: "recognize4-yes" }
        ]
    },
    "recognize4-yes": {
        file: "assets/recognize4-yes.svg",
        buttons: [
            { id: "next", next: "recognize5-yes" }
        ]
    },
    "recognize5-yes": {
        file: "assets/recognize5-yes.svg",
        buttons: [
            { id: "next", next: "recognize6-yes" }
        ]
    },
    "recognize6-yes": {
        file: "assets/recognize6-yes.svg",
        buttons: [
            { id: "next", next: "recognize7-end" }
        ]
    },
    "recognize7-end": {
        file: "assets/recognize7-end.svg",
        buttons: []
    },
    "recognize1-no": {
        file: "assets/recognize1-no.svg",
        buttons: [
            { id: "next", next: "recognize2-no" }
        ]
    },
    "recognize2-no": {
        file: "assets/recognize2-no.svg",
        buttons: [
            { id: "next", next: "recognize3-no" }
        ]
    },
    "recognize3-no": {
        file: "assets/recognize3-no.svg",
        buttons: [
            { id: "next", next: "recognize4-no" }
        ]
    },
    "recognize4-no": {
        file: "assets/recognize4-no.svg",
        buttons: [
            { id: "next", next: "recognize5-no" }
        ]
    },
    "recognize5-no": {
        file: "assets/recognize5-no.svg",
        buttons: [
            { id: "next", next: "recognize6-no" }
        ]
    },
    "recognize6-no": {
        file: "assets/recognize6-no.svg",
        buttons: [
            { id: "next", next: "recognize7-no" }
        ]
    },
    "recognize7-no": {
        file: "assets/recognize7-no.svg",
        buttons: [
            { id: "next", next: "recognize8-no" }
        ]
    },
    "recognize8-no": {
        file: "assets/recognize8-no.svg",
        buttons: [
            { id: "next", next: "recognize9-no-end" }
        ]
    },
    "recognize9-no-end": {
        file: "assets/recognize9-no-end.svg",
        buttons: []
    },
    "split1-yes-enterrocket-no": {
        file: "assets/split1-yes-enterrocket-no.svg",
        buttons: [
            { id: "next", next: "split-yes-planning" }
        ]
    },
    "split-yes-planning": {
        file: "assets/split-yes-planning.svg",
        buttons: [
            { id: "yes", next: "planning1-yes" },
            { id: "no", next: "planning1-no" }
        ]
    },
    "planning1-yes": {
        file: "assets/planning1-yes.svg",
        buttons: [
            { id: "next", next: "planning-yes-focus" }
        ]
    },
    "planning-yes-focus": {
        file: "assets/planning-yes-focus.svg",
        buttons: [
            { id: "yes", next: "focus-yes-device" },
            { id: "no", next: "focus1-no" }
        ]
    },
    "focus1-no": {
        file: "assets/focus1-no.svg",
        buttons: [
            { next: "focus2-no-device-no" }
        ]
    },
    "focus2-no-device-no": {
        file: "assets/focus2-no-device-no.svg",
        buttons: [
            { id: "next", next: "focus3-no" }
        ]
    },
    "focus3-no": {
        file: "assets/focus3-no.svg",
        buttons: [
            { id: "next", next: "focus-no-trick" }
        ]
    },
    "focus-no-trick": {
        file: "assets/focus-no-trick.svg",
        buttons: [
            { id: "yes", next: "trick1-yes" },
            { id: "no", next: "trick1-no" }
        ]
    },
    "trick1-yes": {
        file: "assets/trick1-yes.svg",
        buttons: [
            { next: "trick2-yes" }
        ]
    },
    "trick2-yes": {
        file: "assets/trick2-yes.svg",
        buttons: [
            { next: "trick3-yes" }
        ]
    },
    "trick3-yes": {
        file: "assets/trick3-yes.svg",
        buttons: [
            { next: "trick4-yes" }
        ]
    },
    "trick4-yes": {
        file: "assets/trick4-yes.svg",
        buttons: [
            { next: "trick5-yes" }
        ]
    },
    "trick5-yes": {
        file: "assets/trick5-yes.svg",
        buttons: [
            { next: "trick6-yes-end" }
        ]
    },
    "trick6-yes-end": {
        file: "assets/trick6-yes-end.svg",
        buttons: []
    },
    "trick1-no": {
        file: "assets/trick1-no.svg",
        buttons: [
            { next: "trick2-no" }
        ]
    },
    "trick2-no": {
        file: "assets/trick2-no.svg",
        buttons: [
            { next: "trick3-no" }
        ]
    },
    "trick3-no": {
        file: "assets/trick3-no.svg",
        buttons: [
            { next: "trick4-no-end" }
        ]
    },
    "trick4-no-end": {
        file: "assets/trick4-no-end.svg",
        buttons: []
    },
    "focus-yes-device": {
        file: "assets/focus-yes-device.svg",
        buttons: [
            { id: "yes", next: "device1-yes" },
            { id: "no", next: "device1-no" }
        ]
    },
    "device1-yes": {
        file: "assets/device1-yes.svg",
        buttons: [
            { id: "next", next: "device2-yes" }
        ]
    },
    "device2-yes": {
        file: "assets/device2-yes.svg",
        buttons: [
            { id: "next", next: "device3-yes" }
        ]
    },
    "device3-yes": {
        file: "assets/device3-yes.svg",
        buttons: [
            { id: "next", next: "device4-yes" }
        ]
    },
    "device4-yes": {
        file: "assets/device4-yes.svg",
        buttons: [
            { id: "next", next: "device5-yes" }
        ]
    },
    "device5-yes": {
        file: "assets/device5-yes.svg",
        buttons: []
    },
    "device1-no": {
        file: "assets/device1-no.svg",
        buttons: [
            { next: "device2-no" }
        ]
    },
    "device2-no": {
        file: "assets/device2-no.svg",
        buttons: [
            { next: "device3-no" }
        ]
    },
    "device3-no": {
        file: "assets/device3-no.svg",
        buttons: [
            { id: "next", next: "device4-no" }
        ]
    },
    "device4-no": {
        file: "assets/device4-no.svg",
        buttons: [
            { id: "next", next: "focus2-no-device-no" }
        ]
    },
    "planning1-no": {
        file: "assets/planning1-no.svg",
        buttons: [
            { id: "next", next: "planning2-no" }
        ]
    },
    "planning2-no": {
        file: "assets/planning2-no.svg",
        buttons: [
            { id: "next", next: "listen3-no-planning-no" }
        ]
    }
};
