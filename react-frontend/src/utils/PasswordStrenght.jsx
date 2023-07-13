import {useState, useEffect} from "react";

const HAS_UPPERCASE = /[A-Z]+/;
const HAS_LOWERCASE = /[a-z]+/;
const HAS_DIGIT = /[0-9]+/;
const HAS_SPECIAL_CHAR = /[^A-Za-z0-9]+/;

const LOW_LENGTH = 6;
const STRONG_LENGTH = 14;

const WEAK_COLOR = "#FF0054";
const MEDIUM_COLOR = "#FEBD01";
const STRONG_COLOR = "#8BC926";
const DEFAULT_COLOR = "#D3D3D3";

const handlePasswordStrength = (password) => {
    const strengthCheck = {
        lengthLow: false,
        lengthStrong: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasDigit: false,
        hasSpecialChar: false,
    };
    strengthCheck.lengthLow = password.length >= LOW_LENGTH;
    strengthCheck.lengthStrong = password.length >= STRONG_LENGTH
    strengthCheck.hasUpperCase = HAS_UPPERCASE.test(password);
    strengthCheck.hasLowerCase = HAS_LOWERCASE.test(password);
    strengthCheck.hasDigit = HAS_DIGIT.test(password);
    strengthCheck.hasSpecialChar = HAS_SPECIAL_CHAR.test(password);

    let points = Object.values(strengthCheck).filter((value) => value).length;
    let strength = points > 4 ? "Strong"
        : points > 2 ? "Medium" : "Weak";

    return {
        points,
        strength,
        activeColor: getActiveColor(strength)
    }
};

const getActiveColor = (strength) => {
    return strength === "Strong" ? STRONG_COLOR
        : strength === "Medium" ? MEDIUM_COLOR
            : WEAK_COLOR;
};


const PasswordStrengthIndicator = ({password}) => {
    if (!password) {
        return null;
    }
    let stats = handlePasswordStrength(password)

    const element = (color) =>
        <hr
            style={{
                flex: 1,
                border: "none",
                borderTop: "8px solid",
                borderRadius: "2px",
                margin: "0 5px",
                marginTop: "8px",
                color: color
            }}
        />;
    const barElement = [];

    for (let i = 0; i < stats.points; i++) {
        barElement.push(element(stats.activeColor));
    }
    for (let i = 0; i < 6 - stats.points; i++) {
        barElement.push(element(DEFAULT_COLOR));
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
                {barElement}

            </div>
            <p style={{color: stats.activeColor, fontSize: "smaller"}}>
                Your password is {stats.strength.toLowerCase()}
            </p>
        </>
    );
};

export {PasswordStrengthIndicator};