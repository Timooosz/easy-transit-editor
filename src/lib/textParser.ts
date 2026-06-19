/*
    Line Breaks
    Titles
    Subtitles
*/

import { TokenError } from "../types/exceptions"

type tokenized = {
    textType: string,
    newLine: boolean,
    text: string
}

const nextTokenType = (currentTokenType: string, symbol: string) => {
    if (currentTokenType === "Normal") {
        if (symbol === "*") return "Title"
        if (symbol === "_") return "Subtitle"
    }
    if (currentTokenType === "Title") {
        if (symbol === "*") return "Normal"
        if (symbol === "_") throw new TokenError("Invalid Token");
    }
    if (currentTokenType === "Subitle") {
        if (symbol === "_") return "Normal"
        if (symbol === "*") throw new TokenError("Invalid Token");
    }
    return "Normal"
}

export const parseText = (text: string, x: number) => {
    let currentTokenText = "";
    let currentTextType = "Normal";
    let isCurrentLineBreak = false;

    let tokens: tokenized[] = [];

    for (let i = 0; i < text.length; i++) {
        const currentLetter = text[i];

        if (currentLetter === "\n") {
            if (currentTokenText.length > 0) {
                tokens = [...tokens, {
                    textType: currentTextType,
                    newLine: isCurrentLineBreak,
                    text: currentTokenText
                }];
                currentTokenText = "";
            }
            isCurrentLineBreak = true;
            continue;
        }

        if (currentLetter === "*" || currentLetter === "_") {
            if (currentTokenText.length > 0) {
                tokens = [...tokens, {
                    textType: currentTextType,
                    newLine: isCurrentLineBreak,
                    text: currentTokenText
                }];
                currentTokenText = "";
                isCurrentLineBreak = false;
            }
            currentTextType = nextTokenType(currentTextType, currentLetter);
            continue;
        }

        currentTokenText += currentLetter;
    }

    if (currentTokenText.length > 0) {
        tokens = [...tokens, {
            textType: currentTextType,
            newLine: isCurrentLineBreak,
            text: currentTokenText
        }];
    }

    let output = "";
    const newLineTags = `x="${x}" dy="1em"`;

    tokens.forEach(token => {
        output += `<tspan ${token.newLine ? newLineTags : ""} ${token.textType === "Title" ? `font-weight="bold" font-size="26"` : token.textType === "Subtitle" ? `font-style="italic" font-size="16"` : `font-size="20"`}>${token.text}</tspan>` 
    });

    console.log(tokens)
    console.log(output)

    return output;
}