document.addEventListener("DOMContentLoaded", function () {
    const music = document.querySelector("audio");
    const img = document.querySelector("img");
    const play = document.getElementById("play");
    const artist = document.getElementById("artist");
    const title = document.getElementById("title");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    const progress=document.getElementById("progress");
    let bar=document.getElementById("bar");
    const songs = [
        {
            name: "Main Shiv Ka Shiv Mere(PagalWorld.cm)",
            title: "Main Shiv Ka",
            artist: "Hansraj Raghuwanshi",
            image:"Main-Shiv-Ka-Shiv-Mere",
        },
        {
            name: "Shiv-Tandav-Stotram-Shankar-Mahadevan",
            title: "Shiv Tandav Stotram",
            artist: "Shankar Mahadevan",
            image:"Shiv-Tandav-Stotram",
        },
        {
            name: "Shiv Sama Rahe Mujhme",
            title: "Shiv Sama Rahe",
            artist: "Hansraj Raghuwanshi",
            image:"Shiv-Sama-Rahe",
        },
        {
            name: "Har-Har-Mahadev-(OMG-2)(PagalWorld.Social)",
            title: "Har Har Mahadev",
            artist: "Kailash Kher",
            image:"har-har-mahadev",
        },
        {
            name: "Unchi Unchi Vaadi Mein Baste Hai Bhole Shankar(audiosong.in)",
            title: "Unchi Unchi Vaadi",
            artist: "Hansraj Raghuwanshi",
            image:"Oonchi-Oonchi-Waadi",
        }
    ]

    let isPlaying = false;
    const playMusic = () => {
        isPlaying = true;
        music.play();
        play.classList.replace("fa-play", "fa-pause");
        img.classList.add("anime");
    };
    const pauseMusic = () => {
        isPlaying = false;
        music.pause();
        play.classList.replace("fa-pause", "fa-play");
        img.classList.remove("anime");
    };
    play.addEventListener("click", () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    })
    const loadSong=(songs)=>{
        title.textContent=songs.title;
        artist.textContent=songs.artist;
        music.src="songs/"+songs.name+".mp3";
        img.src="images/"+songs.image+".jpg";
        music.load();
        music.addEventListener("error", (event) => {
            console.error("Error loading audio:", event);
          });
    };
    songIndex=0;
    const nextSong=()=>{
        songIndex=(songIndex+1)%songs.length;
        loadSong(songs[songIndex]);
        playMusic();
    };
    const prevSong=()=>{
        songIndex=(songIndex-1+songs.length)%songs.length;
        loadSong(songs[songIndex]);
        playMusic();
    };

    music.addEventListener("timeupdate",(event)=>{
        const{currentTime,duration}=event.target;
        let time=(currentTime/duration)*100;
        bar.style.width=`${time}%`;
    });
    progress.addEventListener("click",(event)=>{
        const {duration}=music;
        let move=(event.offsetX/event.srcElement.clientWidth)*duration;
        music.currentTime=move;
    });
     music.addEventListener("ended",nextSong);
    next.addEventListener("click",nextSong);
    prev.addEventListener("click",prevSong);

});
