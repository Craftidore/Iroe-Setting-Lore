import os
from os.path import join, isfile
import json
import re

class dirList:
    def __init__(self):
        self.dirs = []
    def add(self, item, number):
        self.dirs.append(dir(item, number))
    def export(self):
        pass
    def __srt__(self):
        return str(self.dirs)
    def __repr__(self):
        return str(self.dirs)
    def toJson(self):
        return json.dumps(self.dirs, default=lambda o: o.__dict__)
class dir:
    def __init__(self, number, item):
        self.item = item
        self.number = number
    def __str__(self):
        return "(\"" + self.item + "\", \"" + self.number + "\")"
    def __repr__(self):
        return "(\"" + str(self.item) + "\", \"" + self.number + "\")"


def main():
    # Get directories in vault
    mainDirs = os.listdir(path="vault")
    # Index by number order
    exportMainDirs = exportDirs(mainDirs)
    # Repeat operation on subdirs
    exportSubDir = []
    exportFiles = []
    for item in exportMainDirs.dirs:
        num = item.number
        subDir = item.item
        path = join("vault", subDir)
        subDirs = os.listdir(path)

        exportSubDir += exportDirs(subDirs).dirs
        for subSubDirs in subDirs:
            subPath = join(path, subSubDirs)
            files = [f for f in os.listdir(subPath) if isfile(join(subPath, f))]
            for file in files:
                if getFNum(file) != "ERROR":
                    exportFiles.append(dir(getFNum(file), file))
                    

    print("Export Main Dirs")
    print(exportMainDirs)
    print("Export Sub Dirs")
    print(exportSubDir)
    print("Export Files")
    print(exportFiles)
    # Push the main list to JSON file
    f = open(join("json", "D.json"), "w")
    f.write(exportMainDirs.toJson())
    f.close()
    
    # Push sublists to JSON files
    f = open(join("json", "SD.json"), "w")
    f.write(json.dumps(exportSubDir, default=lambda o:o.__dict__))
    f.close()

    f = open(join("json", "F.json"), "w")
    f.write(json.dumps(exportFiles, default=lambda o:o.__dict__))
    f.close()
    return
    
def exportDirs(listOfDirs):
    exportedDirs = dirList()
    for directory in listOfDirs:
        exportedDirs.add(getNum(directory), directory)
    return exportedDirs

def getNum(dirName):
    match = re.compile("[0-9]{2}").match(dirName)
    if match:
        return match.group(0)
    return "ERROR"

def getFNum(fileName):
    match = re.compile("[0-9]{2}\.[0-9]{2}").match(fileName)
    if match:
        return match.group(0)
    return "ERROR"


if __name__ == "__main__":
    main()
