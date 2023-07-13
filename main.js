lwy = "";
lwx = "";
rwx = "";
rwy = "";
lw_score="";
rw_score="";
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose_model = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
    console.log("model loaded successfully");
    pose_model.on("pose", got);
}

function got(r) {
    if (r.length > 0) {
       // console.log(r);
        lwx = r[0].pose.leftWrist.x;
        rwx = r[0].pose.rightWrist.x;
        rwy = r[0].pose.rightWrist.y;
        lwy = r[0].pose.leftWrist.y;
        // console.log(lwx,lwy,rwx,rwy)

        lw_score = r[0].pose.keypoints[9].score;
        rw_score = r[0].pose.keypoints[10].score;

    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    if (lw_score > 0.2) {
       
        circle(lwx, lwy, 50);
        playSong1()
       
    }
    if(rw_score>0.2){
        circle(rwx,rwy,50)
       playSong2();
    }
}
song = "";

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function playSong1() {
    song.play();
    song.setVolume(1);
    
}
function playSong2() {
    song2.play();
    song2.setVolume(1);
    
}