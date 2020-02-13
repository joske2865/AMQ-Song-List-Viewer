function validateJSON(dataJSON) {
    if (!Array.isArray(dataJSON)) return "importData";
    for (let song of dataJSON) {
        if (typeof song !== "object") return "song";
        if (typeof song.gameMode !== "string") return "gameMode";
        if (typeof song.name !== "string") return "songName";
        if (typeof song.artist !== "string") return "artist";
        if (typeof song.anime !== "object") return "anime";
        for (let animeName in song.anime) {
            if (animeName !== "english" && animeName !== "romaji") return "animeName";
            if (typeof song.anime[animeName] !== "string") return "anime[animeName]";
        }
        if (typeof song.songNumber !== "number") return "songNumber";
        if (typeof song.activePlayers !== "number") return "activePlayers";
        if (typeof song.totalPlayers !== "number") return "totalPlayers";
        if (typeof song.type !== "string") return "type";
        if (typeof song.urls !== "object") return "urls";
        for (let host in song.urls) {
            if (host !== "catbox" && host !== "animethemes" && host !== "openingsmoe") return "host";
            if (typeof song.urls[host] !== "object") return "urls[host]";
            for (let res in song.urls[host]) {
                if (res !== "0" && res !== "480" && res !== "720") return "res";
                if (typeof song.urls[host][res] !== "string") return "urls[host][res]";
            }
        }
        if (!Array.isArray(song.players)) return "players";
        for (let player of song.players) {
            if (typeof player !== "object") return "players.player";
            for (let key in player) {
                if (key !== "name" && key !== "score" && key !== "correct" && key !== "active" && key !== "position" && key !== "correctGuesses" && key !== "positionSlot" && key !== "answer") return "player.key";
                if (key === "name" && typeof player[key] !== "string") return "player.name";
                if (key === "score" && typeof player[key] !== "number") return "player.score";
                if (key === "correct" && typeof player[key] !== "boolean") return "player.correct";
                if (key === "correctGuesses" && typeof player[key] !== "number") return "player.correctGuesses";
                if (key === "answer" && typeof player[key] !== "string") return "player.answer"
                if (key === "active" && typeof player[key] !== "boolean") return "player.active";
                if (key === "position" && typeof player[key] !== "number") return "player.position";
                if (key === "positionSlot" && typeof player[key] !== "number") return "player.positionSlot";
            }
        }
        if (!Array.isArray(song.fromList)) return "fromList";
        for (let player of song.fromList) {
            if (typeof player !== "object") return "fromList.player";
            for (let key in player) {
                if (key !== "name" && key !== "listStatus" && key !== "score") return "fromList.key";
                if (key === "name" && typeof player[key] !== "string") return "fromList.name";
                if (key === "listStatus" && typeof player[key] !== "number") return "fromList.listStatus";
                if (key === "score" && typeof player[key] !== "number" && player[key] !== null) return "fromList.score";
            }
        }
    }
    return true;
}