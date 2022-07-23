class Music{
    constructor(title,singer,img,file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music('Affettim','Sefo','1.jpg','1.mp3'),
    new Music('Yangın Var','Buray','2.jpg','2.mp3'),
    new Music('Marlon Bronda','Zeynep Bastık','3.jpg','3.mp3')
]