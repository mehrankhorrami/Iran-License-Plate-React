import {CarPlateDataType, MotorbikePlatesDataType} from "../utils/types.ts";
import {MotorbikePlates, RegularPlates} from "../utils/regexes.ts";


export const letterMapping = {
    "f": "الف", // governmental
    "b": "ب",   // personal("ب")
    "j": "ج",   // personal("ج")
    "d": "د",   // personal("د")
    "s": "س",   // personal("س")
    "c": "ص",   // personal("ص")
    "t": "ط",   // personal("ط")
    "q": "ق",   // personal("ق")
    "l": "ل",   // personal("ل")
    "m": "م",   // personal("م")
    "n": "ن",   // personal("ن")
    "v": "و",   // personal("و")
    "h": "هـ",  // personal("هـ")
    "y": "ی",   // personal("ی")
    "H": "ژ",   // handicapped
    "T": "ت",   // taxi
    "A": "ع",   // publicPlaque
    "P": "پ",   // police
    "C": "ث",   // sepah
    "M": "ش",   // military
    "Z": "ز",   // ministry
    "F": "ف",   // headquarter
    "K": "ک",   // agriculture
    "G": "گ",   // temporary
    "D": "D",   // diplomatic
    "S": "S"    // service
};


function toPersian(letter) {
    return letterMapping[letter] || letter;
}

function toEnglish(letter) {
    return Object.keys(letterMapping).find(key => letterMapping[key] === letter) || letter;
}


const governmental = () => {
    return {
        type: "governmental",
        letter: "الف",
        bg: "#ee161f",
        text: "#ffffff",
    };
};

const personal = (farsiLetter: string) => {
    return {
        type: "personal",
        letter: farsiLetter,
        bg: "#ffffff",
        text: "#000000",
    };
};
const handicapped = () => {
    return {
        type: "handicapped",
        letter: "ژ",
        bg: "#ffffff",
        text: "#000000",
    };
};
const temporary = () => {
    return {
        type: "temporary",
        letter: "گ",
        bg: "#ffffff",
        text: "#000000",
    };
};

const taxi = () => {
    return {
        type: "taxi",
        letter: "ت",
        bg: "#ffca0b",
        text: "#000000",
    };
};
const publicPlaque = () => {
    return {
        type: "public",
        letter: "ع",
        bg: "#ffca0b",
        text: "#000000",
    };
};
const agriculture = () => {
    return {
        type: "agriculture",
        letter: "ک",
        bg: "#ffca0b",
        text: "#000000",
    };
};

const police = () => {
    return {
        type: "police",
        letter: "پ",
        bg: "#005224",
        text: "#ffffff",
    };
};
const sepah = () => {
    return {
        type: "sepah",
        letter: "ث",
        bg: "#005224",
        text: "#ffffff",
    };
};
const military = () => {
    return {
        type: "military",
        letter: "ش",
        bg: "#cfa260",
        text: "#000000",
    };
};

const headquarter = () => {
    return {
        type: "headquarter",
        letter: "ف",
        bg: "#0079c1",
        text: "#ffffff",
    };
};
const ministry = () => {
    return {
        type: "ministry",
        letter: "ز",
        bg: "#0079c1",
        text: "#ffffff",
    };
};

const diplomatic = () => {
    return {
        type: "diplomatic",
        letter: "D",
        bg: "#00a2e8",
        text: "#000000",
    };
};
const service = () => {
    return {
        type: "service",
        letter: "S",
        bg: "#00a2e8",
        text: "#000000",
    };
};

interface PlaqueInfo {
    type:
        | "governmental"
        | "personal"
        | "handicapped"
        | "taxi"
        | "police"
        | "sepah"
        | "military"
        | "ministry"
        | "headquarter"
        | "agriculture"
        | "temporary"
        | "diplomatic"
        | "service";
    letter: string;
    bg: string;
    text: string;
}

export function getPlaqueInfo(letter?: string): PlaqueInfo {
    const AvailibleLetters = {
        f: () => governmental(), //الف
        b: () => personal("ب"), // ب
        j: () => personal("ج"), // ج
        d: () => personal("د"), // د
        s: () => personal("س"), // س
        c: () => personal("ص"), // ص
        t: () => personal("ط"), // ط
        q: () => personal("ق"), // ق
        l: () => personal("ل"), // ل
        m: () => personal("م"), // م
        n: () => personal("ن"), // ن
        v: () => personal("و"), // و
        h: () => personal("هـ"), // ه
        y: () => personal("ی"), // ی
        //
        H: () => handicapped(), // ژ
        //
        T: () => taxi(), // ت
        A: () => publicPlaque(), // ع
        //
        P: () => police(), // پ
        C: () => sepah(), // ث
        M: () => military(), // ش
        //
        Z: () => ministry(), // ز
        F: () => headquarter(), // ف
        //
        K: () => agriculture(), // ک
        G: () => temporary(), // گ
        //
        D: () => diplomatic(), // D
        S: () => service(), // S
    };
    //@ts-ignore
    return AvailibleLetters[letter || "b"]();
}


export const toSerial = (data: CarPlateDataType | MotorbikePlatesDataType) => {
    if ('letter' in data && 'cityNo' in data && 'region' in data) {
        const convertedLetter: string = toEnglish(data.letter);
        return `${data.region}${data.cityNo}-${data.section2}${convertedLetter}${data.section1}`;
    } else {
        // Handle MotorbikePlatesDataType case
        return `${data.section1}-${data.section2}`;
    }
}


export const toPlateObject = (serial: string): CarPlateDataType | MotorbikePlatesDataType | null => {
    if (serial.match(RegularPlates)) {
        const matches = RegularPlates.exec(serial);
        const info = getPlaqueInfo(matches?.groups?.Letter);
        return matches && matches.length ? {
            letter: info.letter,
            section1: matches?.groups?.Section1,
            section2: matches?.groups?.Section2,
            region: matches?.groups?.Region,
            cityNo: matches?.groups?.CityNo,
        } as CarPlateDataType : null;
    }

    if (serial.match(MotorbikePlates)) {
        const matches = MotorbikePlates.exec(serial);
        return matches && matches.length ? {
            section1: matches?.groups?.Section1,
            section2: matches?.groups?.Section2
        } as MotorbikePlatesDataType : null;
    }
}


export const isValidSerial = (serial: string): boolean => {
    return RegularPlates.test(serial) || MotorbikePlates.test(serial);
}