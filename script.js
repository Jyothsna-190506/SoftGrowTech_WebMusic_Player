const songs = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    file: "songs/song1.mp3",
    duration: "4:24",
  },

  {
    title: "Evare",
    artist: "Sid Sriram",
    file: "songs/song2.mp3",
    duration: "3:45",
  },
  {
    title: "Ye tuney kya kiya",
    artist: "Arijit Singh",
    file: "songs/song3.mp3",
    duration: "4:00",
  },
  {
    title: "tujh mein rab dikhta hai",
    artist: "Roop Kumar Rathod",
    file: "songs/song4.mp3",
    duration: "4:30",
  },
  {
    title: "Nuvvuntey chaley",
    artist: "Anirudh Ravichander",
    file: "songs/song5.mp3",
    duration: "4:00",
  },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let currentSong = 0;

function loadPlaylist() {
  songs.forEach((song, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
<td>${song.title}</td>
<td>${song.artist}</td>
<td>${song.duration}</td>
`;

    row.addEventListener("click", () => {
      playSong(index);
    });

    playlist.appendChild(row);
  });
}

function playSong(index) {
  currentSong = index;

  audio.src = songs[index].file;

  audio.play();

  playBtn.innerHTML = "⏸";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();

    playBtn.innerHTML = "⏸";
  } else {
    audio.pause();

    playBtn.innerHTML = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentSong++;

  if (currentSong >= songs.length) currentSong = 0;

  playSong(currentSong);
});

prevBtn.addEventListener("click", () => {
  currentSong--;

  if (currentSong < 0) currentSong = songs.length - 1;

  playSong(currentSong);
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

loadPlaylist();
