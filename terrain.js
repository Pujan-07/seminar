//canvas variable selects the element canvas
var canvas = document.querySelector("canvas");

//Here we resize the canvas to our needs
resizeCanvas();

//ctx gets the context for you to draw on it
var ctx = canvas.getContext("2d");

//points array holds the points of the terrain
var points = [];

//HEIGHT_MAX is the height of the canvas
var HEIGHT_MAX = canvas.height;

function resizeCanvas(){
  var body = document.querySelector("body");
  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;
}

//function to draw terrain using the points generated by generate_terrain
function draw_terrain(){

  for(var i = 0; i < canvas.width; i++)
  {
      ctx.beginPath();
      ctx.moveTo(points[i].x, HEIGHT_MAX);
      ctx.lineTo(points[i].x, points[i].y);
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'green';
      ctx.stroke();

      //we draw the line second time for the light green terrain effect
      ctx.beginPath();
      ctx.moveTo(points[i].x, HEIGHT_MAX);
      ctx.lineTo(points[i].x, points[i].y + 190);
      ctx.strokeStyle = 'rgba(0,180,0,0.4)';
      ctx.stroke();
  }
}

//function to generate terrain points
function generate_terrain_pts()
{
  //these below variables are for generating our terrain points
  var STEP_MAX = 0.6;
  var STEP_CHANGE = 0.03;

  // starting conditions
  var height = (Math.random() * HEIGHT_MAX/3) + (2*HEIGHT_MAX/3);
  var slope = (Math.random() * STEP_MAX) * 2 - STEP_MAX;

  // creating the landscape
  for (var i = 0; i < canvas.width; i++) 
  {
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

    // clip height and slope to maximum
    if (slope > STEP_MAX) { slope = STEP_MAX };
    if (slope < -STEP_MAX) { slope = -STEP_MAX };

    if (height > 0.75*HEIGHT_MAX) { 
        height = 0.75*HEIGHT_MAX;
        slope *= -1;
    }
    if (height < 0.4*HEIGHT_MAX) { 
        height = 0.4*HEIGHT_MAX;
        slope *= -1;
    }

    var temp = {x: i, y: height};
    points.push(temp);
  }
}