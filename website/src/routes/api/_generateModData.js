export default (data) => {
    const songs = [];

    data.songs.forEach((song) => {
        const diffs = [];

        song.diffs.forEach((diff) => {
            diffs.push({
                name: diff.name,
                internalNumber: diff.internalNumber,
                maxScore: diff.maxScore,
            });
        });

        songs.push({
            name: song.name,
            internalName: song.internalName,
            iconName: song.iconName,
            diffs: { createMany: { data: diffs } },
        });
    });

    const extraInfos = [];

    data.extraInfos.forEach((extraInfo) => {
        extraInfos.push({
            internalName: extraInfo.internalName,
            valueType: extraInfo.valueType,
        });
    });

    const settings = [];

    data.settings.forEach((setting) => {
        settings.push({
            name: setting.name,
            internalName: setting.internalName,
        });
    });

    const globalSettingMaps = [];

    data.globalSettingMaps.forEach((globalSettingMap) => {
        globalSettingMaps.push({
            globalSettingID: globalSettingMap.globalSettingID,
            internalName: globalSettingMap.internalName,
        });
    });

    return {
        modID: data.modID,
        name: data.name,
        songs: { create: songs },
        extraInfos: { createMany: { data: extraInfos } },
        settings: { createMany: { data: settings } },
        globalSettingMaps: { createMany: { data: globalSettingMaps } },
    };
};
