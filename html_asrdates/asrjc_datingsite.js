document.addEventListener("DOMContentLoaded", function () {

    const card = document.getElementById("profiletinder");
    const likeBtn = document.querySelector(".like");
    const nopeBtn = document.querySelector(".nope");

    const profileImg = card.querySelector("img");
    const nameEl = card.querySelector(".name");
    const houseEl = card.querySelector(".house");
    const bioEl = card.querySelector(".bio");

    // 🎵 Background Music
    const audio = new Audio("music.mp3"); // put your mp3 file in same folder
    audio.loop = true;
    audio.volume = 0.4;

    document.body.addEventListener("click", function startMusic() {
        audio.play();
        document.body.removeEventListener("click", startMusic);
    });

    let currentIndex = 0;

    const profiles = [
        {
            image: "https://i.pinimg.com/474x/d6/7f/8c/d67f8cf632d439d1875216b55445cc4e.jpg",
            name: "Ajesh, JC1",
            house: "Helios 🐴 · 27/15 · CCA",
            bio: "Top 10 most handsome guys in ASR"
        },
        {
            image: "https://i.pinimg.com/736x/3c/df/4a/3cdf4ac444427ee56e44809eb3b91d97.jpg",
            name: "Ethan, JC2",
            house: "Poseidon · 27/23 · Volleyball",
            bio: "Are you from Helios, because goddamn you're making me sweat."
        },
        {
            image: "https://i.pinimg.com/originals/83/27/54/83275450358e040a8aa8c71dcdc4ebb0.jpg",
            name: "Chloe, JC1",
            house: "Artemis · 27/02 · STEM",
            bio: "Looking for a tall, sporty fella. No BCME Boys allowed."
        }
    ];

    // 💾 Load saved likes
    let likedProfiles = JSON.parse(localStorage.getItem("likedProfiles")) || [];

    function loadProfile(index) {
        const profile = profiles[index];
        profileImg.src = profile.image;
        nameEl.textContent = profile.name;
        houseEl.textContent = profile.house;
        bioEl.textContent = profile.bio;
    }

    function swipe(direction) {

        const overlay = document.createElement("div");
        overlay.classList.add("swipe-overlay");

        if (direction === "up") {
            overlay.innerHTML = "💚 MATCHED ENERGY";
            overlay.classList.add("yes-style");

            // 💾 Save liked profile
            likedProfiles.push(profiles[currentIndex]);
            localStorage.setItem("likedProfiles", JSON.stringify(likedProfiles));
        } else {
            overlay.innerHTML = "💔 NOT TODAY";
            overlay.classList.add("no-style");
        }

        card.appendChild(overlay);

        card.style.transition = "0.5s ease";
        card.style.transform = direction === "up"
            ? "translateY(-500px) rotate(-10deg)"
            : "translateY(500px) rotate(10deg)";

        setTimeout(() => {

            card.style.transition = "none";
            card.style.transform = "translateY(0px) rotate(0deg)";
            overlay.remove();

            // 🔄 Always move to next profile now
            currentIndex++;
            if (currentIndex >= profiles.length) {
                currentIndex = 0;
            }

            loadProfile(currentIndex);

        }, 600);
    }

    likeBtn.addEventListener("click", () => swipe("up"));
    nopeBtn.addEventListener("click", () => swipe("down"));

});