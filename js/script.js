let inp = document.getElementById("MP3");
let previous = document.body.querySelectorAll(".controls img")[0];
let playpause = document.body.querySelectorAll(".controls img")[1];
let next = document.body.querySelectorAll(".controls img")[2];
let seekbar = document.body.querySelectorAll("input[type=range]")[0];
let volumeBtn = document.body.querySelectorAll("input[type=range]")[1];
let volumeImg = document.body.querySelector(".volume img");
let timestamp = document.body.querySelector(".timestamp");
let currenttime = document.body.querySelector(".currenttime");
let currentSongName = document.getElementById("currentSongName");
let borAni = document.body.querySelectorAll(".borAni");
let tracks = new Array();
let current_Track;
let index = 0;


/* Functionality for border Animation Remaining */
function addBorderAnimation(flag)
{
    if(flag)
    {
        Array.from(borAni).forEach(element =>
        {
            element.style.animationPlayState = "running";
        });
    }
    else
    {
        Array.from(borAni).forEach(element =>
        {
            element.style.animationPlayState = "paused";
        });
    }
}

function changeSeekbar()
{
    let duration = current_Track.duration;
    let settup = current_Track.currentTime;
    if(duration > 3600)
    {
        let hrs = Math.floor(settup / 3600);
        settup -= hrs * 3600;

        let min = Math.floor(settup / 60);
        settup -= min * 60;
        
        let sec = Math.floor(settup);
        settup -= min * 60;   

        settup = `${hrs}:${min}:${sec}`;
    }
    else if(duration > 60)
    {
        let min = Math.floor(settup / 60);
        settup -= min * 60;
        
        let sec = Math.floor(settup);
        settup -= min * 60; 

        settup = `${min}:${sec}`;
    }
    else
    {
        let sec = Math.floor(settup);
        settup -= min * 60; 

        settup = `${sec}`
    }

    currenttime.innerHTML = settup;
    if(seekbar.value >= 100)
        next.click();

    seekbar.value = (current_Track.currentTime * 100) / current_Track.duration;
}

function playCurrentSong()
{
    current_Track.play();
    document.getElementById('cover').style.animationPlayState = "running";
    playpause.classList.replace("pause", "play");
    playpause.src = "images/play-solid.svg";
    current_Track.addEventListener("timeupdate", changeSeekbar);
    currentSongName.innerHTML = tracks[index].name;
    current_Track.volume = volumeBtn.value / 100;
    addBorderAnimation(true);
    setTimeout(() => 
    {
        let duration = current_Track.duration;
        if(duration > 3600)
        {
            let hrs = Math.floor(duration / 3600);
            duration -= hrs * 3600;

            let min = Math.floor(duration / 60);
            duration -= min * 60;
            
            let sec = Math.floor(duration);
            duration -= min * 60;   

            duration = `${hrs}:${min}:${sec}`;
        }
        else if(duration > 60)
        {
            let min = Math.floor(duration / 60);
            duration -= min * 60;
            
            let sec = Math.floor(duration);
            duration -= min * 60; 

            duration = `${min}:${sec}`;
        }
        else
        {
            let sec = Math.floor(duration);
            duration -= sec * 60; 

            duration = `${sec}`
        }

        timestamp.innerHTML = duration;
    },500);

}

inp.addEventListener('change', () =>
{
    Array.from(inp.files).forEach(element => 
    {
        let audioElement = new Audio(URL.createObjectURL(element));
        let name = element.name;
        tracks.push({audioElement,name});
    });
    console.log(tracks);

    current_Track = tracks[0].audioElement;
    playCurrentSong();
    playpause.parentElement.title = "Pause";
});

playpause.addEventListener('click', () =>
{
    if(tracks.length)
    {
        if(playpause.classList.contains("pause"))
        {
            playpause.classList.replace("pause", "play");
            playpause.parentElement.title = "Pause";
            playpause.src = "images/play-solid.svg";
            current_Track.play();
            addBorderAnimation(true);
            document.getElementById('cover').style.animationPlayState = "running";
        }
        else
        {
            playpause.classList.replace("play", "pause");
            playpause.parentElement.title = "Play"
            playpause.src = "images/pause-solid.svg";
            current_Track.pause();
            addBorderAnimation(false);
            document.getElementById('cover').style.animationPlayState = "paused";
        }
    }
    else
        inp.click();
});

seekbar.addEventListener('input', () =>
{
    if(current_Track)
    {
        current_Track.currentTime = (seekbar.value * current_Track.duration) / 100;
    }

    if(seekbar.value == 100)
        next.click();
});

next.addEventListener('click', () => 
{
    if(tracks.length)
    {
        current_Track.currentTime = 0;
        current_Track.pause();
        index = ++index % tracks.length;
        current_Track = tracks[index].audioElement;
        playCurrentSong();
    }
    else
        inp.click();
});

previous.addEventListener('click', () => 
{
    if(tracks.length)
    {
        current_Track.currentTime = 0;
        current_Track.pause();
        if(--index == -1)
            index = tracks.length - 1;
        current_Track = tracks[index].audioElement;
        playCurrentSong();
    }
    else
        inp.click();
});

volumeBtn.addEventListener('input', (e) =>
{
    if(current_Track)
    {
        current_Track.volume = e.target.value / 100;
    }

    if(e.target.value == 0)
        volumeImg.src = "images/volume-xmark-solid.svg";
    else if(e.target.value > 0 && e.target.value < 50)
        volumeImg.src = "images/volume-low-solid.svg";
    else
        volumeImg.src = "images/volume-high-solid.svg";

})



