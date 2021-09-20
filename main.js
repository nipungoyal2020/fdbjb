var song_1 = "";
var song_2 = "";

var leftWristX = "" ;
var leftWristY = "" ;

var scoreLeftWrist = 0 ;
var scoreRightWrist = 0 ;

var rightWristX = "" ;
var rightWristY = "" ;

function preload() {
    song_1 = loadSound("theme_music.mp3");
    song_2 = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    console.log(results);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill();
    stroke();
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song_1.stop();
        song_2.play();
        document.getElementById("song_name").innerHTML = "Music Tune";
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
        song_1.play();
        document.getElementById("song_name").innerHTML = "Music Tune";
    }

}
