console.log("Welcome to Spotify");
//Intialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/3.mp3");
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));



//Create array for list of songs
let songs = [
    {songName : "Tumhe Kitna Pyaar Karte", songPath : "songs/1.mp3", coverPath : 'covers/1.jpg'},
    {songName : "What Jumkha ?", songPath : "songs/2.mp3", coverPath : 'covers/2.jpg'},
    {songName : "Tere Vaste", songPath : "songs/3.mp3", coverPath : 'covers/3.jpg'},
    {songName : "Phir Aur Kya Chaiye", songPath : "songs/4.mp3", coverPath : 'covers/4.jpg'},
    {songName : "Param Sundari", songPath : "songs/5.mp3", coverPath : 'covers/5.jpg'},
    {songName : "Naach Meri Raani", songPath : "songs/6.mp3", coverPath : 'covers/6.jpg'},
    {songName : "Show Me The Thumka", songPath : "songs/7.mp3", coverPath : 'covers/7.jpg'},
    {songName : "Pyaar Hota Kayi Baar Hai", songPath : "songs/8.mp3", coverPath : 'covers/8.jpg'},
    {songName : "Dholida", songPath : "songs/9.mp3", coverPath : 'covers/9.jpg'},
    {songName : "Jhume Re Gori", songPath : "songs/10.mp3", coverPath :'covers/10.jpg'}

]

songItem.forEach((element, i) =>{
     element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
//audioElement.play();

//Handle play/pause event
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
       // masterSongName.innerHTML = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

//List of Events
audioElement.addEventListener('timeupdate', () =>{
    //Update Seek Bar
    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    myProgressBar.value = progress;

});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime =  myProgressBar.value * audioElement.duration/ 100;
});


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

//loop to play all songs
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused){
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerHTML = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
        
    });
});

//For Next Song
document.getElementById('next').addEventListener('click' ,() =>{
    if(songIndex >= 9 )
    {
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
});

//For Previous Song
document.getElementById('previous').addEventListener('click' ,() =>{
    if(songIndex <= 0 )
    {
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
});