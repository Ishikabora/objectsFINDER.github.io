Status = "";
objects = [];

function preload()
{

}

function setup()
{
    canvas = createCanvas(350, 250);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("object_name").value;
}

function modalLoaded()
{
    console.log("Modal Loaded!");
    Status = true;
}

function draw()
{
    image(video, 0, 0, 350, 250);
    if(Status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            fill("# FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == input)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status: Object Detected";
                document.getElementById("found").innerHTML = "Found";
                var synth = window.speechSynthesis;
                speak_data = input+"Detected";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("status").innerHTML = "Status : Detecting Objects";
                document.getElementById("found").innerHTML =  "not found";
            }
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;

}