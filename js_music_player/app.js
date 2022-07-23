const container = document.querySelector(".container");
const title = document.querySelector("#music-details #title");
const singer = document.querySelector("#music-details #singer");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#music-file");
const next = document.querySelector("#controls #next");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const progressBar = document.querySelector("#progress-bar");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const volumeBar = document.querySelector("#volume-bar");
const volume = document.querySelector("#volume");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);
window.addEventListener('load',()=>{
    let music = player.getMusic();
    displayMusic(music);
    showMusicList();
    checkPlayingMusic(music)
})

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
    checkPlayingMusic(music);
}

next.addEventListener('click',()=>{
    player.next();
    let music = player.getMusic();
    displayMusic(music);
});

prev.addEventListener('click',()=>{
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
});

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const calculateTime = (totalSecond) => {
    let minute = Math.floor(totalSecond/60);
    let second = Math.floor(totalSecond % 60);
    second = second < 10 ? "0"+second : second;
    return minute + ":" + second;
}

audio.addEventListener('loadedmetadata',()=>{
    progressBar.max = audio.duration;
    duration.innerText = calculateTime(audio.duration);
    currentTime.innerText = calculateTime(audio.currentTime);
})

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.innerText = calculateTime(audio.currentTime);

    if(audio.ended){
        container.classList.remove("playing");
        play.querySelector("i").classList = "fa-solid fa-play";
        next.click();
    }
});

progressBar.addEventListener('input',()=>{
    audio.currentTime=progressBar.value;
})

volumeBar.addEventListener("input",()=>{
    audio.volume = volumeBar.value/100;
    if(volumeBar.value == 0){
        volume.className = "fa-solid fa-volume-xmark";
    }else{
        volume.className = "fa-solid fa-volume-high";
    }
})

let isSoundOpen = true;
volume.addEventListener('click',() => {
    if(isSoundOpen){
        audio.volume = 0;
        volumeBar.value = 0;
        volume.className = "fa-solid fa-volume-xmark";
        isSoundOpen = false;
    }else{
        audio.volume = 1;
        volumeBar.value = 100;
        volume.className = "fa-solid fa-volume-high";
        isSoundOpen = true;
    }
})

function showMusicList(){
    for(let i in musicList){
        let li = `
            <li onClick="changeDisplayMusic(${i})" id="music_${i}" class="list-group-item">${musicList[i].getName()}</li>
        `;
        
        ul.insertAdjacentHTML('beforeend',li);
    }
    
}

function changeDisplayMusic(i){
    player.index = i;
    displayMusic(player.getMusic())
}

function checkPlayingMusic(music){
    for (let li of ul.children) {
        if(li.innerText == music.getName()){
            li.classList.add('active');
        }else{
            li.classList.remove('active');
        }
    }
}


