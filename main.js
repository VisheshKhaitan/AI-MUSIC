song = "";
song2 = ""; 

leftWristx = 0;
leftWristy = 0;

rightWristx = 0;
rightWristy = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

song_status = "";
song_status2 = "";

function preload()
{
song = loadSound("music.mp3");
song2 = loadSond("https://youtu.be/BhMuR3ed-Ko");
}


function setup()
{
canvas = createCanvas(600,500);
canvas.center(); 

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}


function modelLoaded()
{
    console.log("poseNet is Initiallized");
}


function draw()
{
    image(video, 0, 0, 600, 500);

    song_status = song.isPlaying();
    song_status2 = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristx, rightWristy, 20);
        song2.stop();

    if(song_status == false)
    {
        song.play();
        document.getElementById("song").innerHTML = "now playing HARRY POTTER THEME SONG";
    }
    }


    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristx, leftWristy, 20);
        song1.stop();

    if(song2_status == false)
    {
        song2.play();
        document.getElementById("song").innerHTML ="now playing FADED";
    }
    }
}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;

    console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

    leftWristx = results[0].pose.leftWrist.x;
    leftWristy = results[0].pose.leftWrist.y;

    console.log("leftWristx =" + leftWristx + "leftwristy =" + leftWristy);
    
    rightWristx = results[0].pose.rightWrist.x;
    rightWristy = results[0].pose.rightWrist.y;
    
    console.log("rightWristx =" + rightWristx + "rightWristy =" + rightWristy);
}
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function stop()
{
    song.stop();
}