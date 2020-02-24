const REGEX_REPLACE_RULES = [
    {
        input: 'ou',
        replace: '(ou|ō)'
    },
    {
        input: 'oo',
        replace: '(oo|ō)'
    },
    {
        input: 'o',
        replace: '[oōóòöôøΦ]'
    },
    {
        input: 'uu',
        replace: '(uu|ū)'
    },
    {
        input: 'u',
        replace: '[uūûúùüǖ]'
    },
    {
        input: 'a',
        replace: '[aä@âàáạåæā]'
    },
    {
        input: 'c',
        replace: '[cč]'
    },
    {
        input: ' ',
        replace: '([★☆\\/\\*=\\+·♥∽・〜†×♪→␣:;]* |(☆|★|\\/|\\*|=|\\+|·|♥|∽|・|〜|†|×|♪|→|␣|:|;)+)'
    },
    {
        input: 'e',
        replace: '[eéêëèæ]'
    },
    {
        input: '\'',
        replace: '[\'’]'
    },
    {
        input: 'n',
        replace: '[nñ]'
    },
    {
        input: '2',
        replace: '[2²]'
    },
    {
        input: 'i',
        replace: '[ií]'
    },
    {
        input: '3',
        replace: '[3³]'
    },
    {
        input: 'x',
        replace: '[x×]'
    },
    {
        input: 'b',
        replace: '[bß]'
    },
    {
        input: '\\\\-',
        replace: '[\\-–]'
    }
];

function escapeRegExp(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function createRegExp(query) {
    let escapedQuery = escapeRegExp(query);
    REGEX_REPLACE_RULES.forEach((rule) => {
        escapedQuery = escapedQuery.replace(new RegExp(rule.input, "gi"), rule.replace);
    });
    return new RegExp(escapedQuery, "i");
}

function testRegex(value, query) {
    return createRegExp(query).test(value);
}

function updateRow(row) {
    if (row.find(".rowHidden").length === 0 || row.hasClass("rowHidden")) {
        row.show();
    }
    else {
        row.hide();
    }
}

function searchSongName(query) {
    $(".songData .songName").each((index, elem) => {
        if (testRegex($(elem).text(), query)) {
            $(elem).removeClass("rowHidden");
        }
        else {
            $(elem).addClass("rowHidden");
        }
        updateRow($(elem).parent());
    });
}

function searchArtist(query) {
    $(".songData .songArtist").each((index, elem) => {
        if (testRegex($(elem).text(), query)) {
            $(elem).removeClass("rowHidden");
        }
        else {
            $(elem).addClass("rowHidden");
        }
        updateRow($(elem).parent());
    });
}

function searchAnime(query) {
    $(".songData .animeNameRomaji").each((index, elem) => {
        if (testRegex($(elem).text(), query)) {
            $(elem).removeClass("rowHidden");
            $(elem).parent().find(".animeNameEnglish").removeClass("rowHidden");
        }
        else {
            if (testRegex($(elem).parent().find(".animeNameEnglish").text(), query)) {
                $(elem).removeClass("rowHidden");
                $(elem).parent().find(".animeNameEnglish").removeClass("rowHidden");
            }
            else {
                $(elem).parent().find(".animeNameEnglish").addClass("rowHidden");
                $(elem).addClass("rowHidden");
            }
        }
        updateRow($(elem).parent());
    });
}

function updateTypes() {
    $(".songData .songType").each((index, elem) => {
        if ($(elem).text().includes("Opening") && $("#slTypeOpenings").hasClass("unchecked")) {
            $(elem).addClass("rowHidden");
        }
        else if ($(elem).text().includes("Opening") && !$("#slTypeOpenings").hasClass("unchecked")) {
            $(elem).removeClass("rowHidden");
        }
        else if ($(elem).text().includes("Ending") && $("#slTypeEndings").hasClass("unchecked")) {
            $(elem).addClass("rowHidden");
        }
        else if ($(elem).text().includes("Ending") && !$("#slTypeEndings").hasClass("unchecked")) {
            $(elem).removeClass("rowHidden");
        }
        else if ($(elem).text().includes("Insert") && $("#slTypeInserts").hasClass("unchecked")) {
            $(elem).addClass("rowHidden");
        }
        else {
            $(elem).removeClass("rowHidden");
        }
        updateRow($(elem).parent())
    })
}