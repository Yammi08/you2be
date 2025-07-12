changeFormat=(pathFile, type)=> {
    let lastPathFile = pathFile.substring(0, pathFile.lastIndexOf('.'))
    lastPathFile += type;
    return lastPathFile;
}

module.exports = changeFormat;