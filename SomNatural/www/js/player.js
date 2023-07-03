var audio;
var progressSlider;

function LoadPlayer() {
    audio = document.getElementById("audio_player");
    audio.src = "ex.mp3";
    progressSlider = document.getElementById("progressSlider");
    progressSlider.addEventListener("input", updateAudioTime);

    audio.addEventListener("loadedmetadata", function () {
        progressSlider.min = 0;
        progressSlider.value = 0;
        audio.currentTime = 0;

        // Definir valor máximo (max) após a obtenção da duração do áudio
        progressSlider.max = 100
    });

    audio.addEventListener("timeupdate", function () {
        var progress = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progress;
    });



    $$('#btn_taphold_play').on('taphold', function () {
        playAudio()
        app.dialog.alert('Tap hold fired!');
    });

    

    $(".btn_music").click(function () {
        BtnMusic(this);
    });


}


function BtnMusic(btn) {
    audio.src = $(btn).attr('data-urlMusic');
    $("#name_music").text($(btn).attr('data-musicTitle'))

    playAudio(() => {
        progressSlider.max = audio.duration;
        progressSlider.min = 0;
        progressSlider.value = 0;
        audio.currentTime = 0;
    });

    let i = $(btn).find(".material-icons");
    $('.btn_music i').text('play_arrow')


    $(i).text("pause");

    $(btn).off("click");

    $(btn).on("click", function () {
        playAudio();
        let i = $(btn).find(".material-icons");

        $(i).text("play_arrow");
        $('.btn_music').off("click")

        $(".btn_music").click(function () {
            BtnMusic(this);
        });
    });


}

function playAudio() {
    if (audio.paused) {
        audio.play();
        $("#btn_play span.material-icons").text("pause");
        $("#icon_btn_float").text('pause')
    } else {
        $("#btn_play span.material-icons").text("play_arrow");
        $("#icon_btn_float").text('play_arrow')
        audio.pause();
    }
}

function skipAudio() {
    // Lógica para avançar para a próxima faixa de áudio
    // Exemplo:
    // audio.src = "caminho/do/proximo/audio.mp3";
    // audio.play();
    var nextAudioIndex = getCurrentAudioIndex() + 1;
    if (nextAudioIndex < audioList.length) {
        audio.src = audioList[nextAudioIndex].src;
        audio.play();
    }
}

function previousAudio() {
    // Lógica para voltar para a faixa de áudio anterior
    // Exemplo:
    // audio.src = "caminho/do/audio/anterior.mp3";
    // audio.play();
    var previousAudioIndex = getCurrentAudioIndex() - 1;
    if (previousAudioIndex >= 0) {
        audio.src = audioList[previousAudioIndex].src;
        audio.play();
    }
}

function updateAudioTime() {
    var progress = progressSlider.value;
    var duration = audio.duration;
    var currentTime = (progress * duration) / 100;
    audio.currentTime = currentTime;
}

// Função auxiliar para obter o índice do áudio atual na lista de áudio
function getCurrentAudioIndex() {
    for (var i = 0; i < audioList.length; i++) {
        if (audioList[i].src === audio.src) {
            return i;
        }
    }
    return -1; // Retorna -1 se o áudio atual não for encontrado na lista
}





// Exemplo de lista de áudio
var audioList = [
    { src: "ex.mp3" },
    { src: "ex.mp3" },
    { src: "ex.mp3" }
];
