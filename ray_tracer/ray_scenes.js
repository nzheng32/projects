// routines for creating a ray tracing scene
//nan zheng
//1. create a shape object (triangle/sphere) storing array
let shape = [];
//2. create a lightsource object storing array
let lightsource = [];
//3. create a ambient light object storing array
let ambient = [];
//4. array storing ray objects
let rays = []
//5.array storing background information - set_background
let background = [];
//6. d
let fl = 0;
// 7. create a eye_position  array - e
eye_pos  = [];
//8. camera's  viewing direction
cam_dir  = [];
//9. hit
hit = []
//10.
closestHit = []


// clear out all scene contents
function reset_scene() {
  shape = [];
  lightsource = [];
  ambient = [];
  rays = [];
  background = [];
  fl = 0;
  eye_pos  = [];
  cam_dir  = [];
}

// create a new point light source
function new_light (r, g, b, x, y, z) {
  l =  [r,g,b,x,y,z];
  lightsource.push(l);
}

// set value of ambient light source
function ambient_light (r, g, b) {
  l = [r,g,b];
  ambient.push(l);
}

// set the background color for the scene
function set_background (r, g, b) {
  background = [r,g,b];
}

// set the field of view
function set_fov (theta) {
    theta = (theta/180) * PI;
    fl = 1 / Math.tan(theta / 2);
}

// set the position of the virtual camera/eye
function set_eye_position (x, y, z) {
  eye_pos = [x, y,z];
}

// set the virtual camera's viewing direction
function set_uvw(x1,y1, z1, x2, y2, z2, x3, y3, z3) {
  cam_dir = [x1,y1, z1, x2, y2, z2, x3, y3, z3];
}

// create a new sphere
function new_sphere (x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
  let l = [x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow];
  shape.push(l);
}

// create an eye ray based on the current pixel's position
function eye_ray_uvw (i, j) {
    z3 = cam_dir[8];
    y3 = cam_dir[7];
    x3 = cam_dir[6];
    z2 = cam_dir[5];
    y2 = cam_dir[4];
    x2 = cam_dir[3];
    z1 = cam_dir[2];
    y1 = cam_dir[1];
    x1 = cam_dir[0];
    us = ((2*i) / width) - 1;
    vs = ((2*j) / height) - 1;
    dx = -fl*x3 +us*x1+vs*x2;
    dy = -fl*y3 +us*y1+vs*y2;
    dy =  -dy;
    dz = -fl*z3 +us*z1+vs*z2;
    dir = [dx,dy,dz];
    origin = [eye_pos[0],eye_pos[1],eye_pos[2]];
    ray = [dir,origin];
    return ray;

}

// this is the main routine for drawing your ray traced scene
function draw_scene() {

  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        let ray = eye_ray_uvw (x, y);

      // create eye ray


      // maybe print debug information
        debug_flag = 0;
        if (x == width / 2 && y == height / 2) { debug_flag = 1;  }  // un-comment to debug center pixel

        if (debug_flag) {
            console.log ("debug at: " + x + " " + y);
        }

        // Figure out the pixel's color here (FOR YOU TO WRITE!!!)
        // hit  = [hitpoint,object,t]
        castRay(ray);
        let r,g,b;  // placeholders to store the pixel's color
        if (closestHit.length == 0) {
            r = background[0];
            g = background[1];
            b = background[2];
        } else{
            r = 0;
            g = 0;
            b = 0;
            obj = closestHit[1];
            centerx = obj[0];
            centery = obj[1];
            centerz = obj[2];
            radius = obj[3];
            dr = obj[4];
            dg = obj[5];
            db = obj[6];
            //hitpoint = closestHit[0];
            hitpoint = createVector(closestHit[0][0],closestHit[0][1],closestHit[0][2]);
            //centers = [centerx, centery, centerz];
            centers = createVector(centerx, centery, centerz);
            //N = [hitpoint[0] - centers[0], hitpoint[1] - centers[1], hitpoint[2] - centers[2]]
            N = p5.Vector.sub(hitpoint, centers);
            //norm = Math.sqrt(Math.pow(N[0], 2) + Math.pow(N[1],2) + Math.pow(N[2],2));
            //N = [N[0]/norm, N[1]/norm, N[2]/norm];
            N.normalize();
            for (i = 0; i < lightsource.length; i++) {
                light = lightsource[i];
                //loc = [light[3],light[4], light[5]];
                loc = createVector(light[3],light[4], light[5]);
                //l = [loc[0] - hitpoint[0],loc[1] - hitpoint[1],loc[2] - hitpoint[2]];
                let l = p5.Vector.sub(loc,hitpoint);
                //norm = Math.sqrt(Math.pow(l[0], 2) + Math.pow(l[1],2) + Math.pow(l[2],2));
                //l = [l[0]/norm, l[1]/norm, l[2]/norm];
                l.normalize();
                //dotproduct = N[0] * l[0] + N[1] * l[1] + N[2] * l[2];
                //dotproduct = Math.max(0, dotproduct);
                dotproduct = max(0, p5.Vector.dot(N,l));

                r = r + dr * light[0] * dotproduct;
                g = g + dg * light[1] * dotproduct;
                b = b + db * light[2] * dotproduct;

            }


        }

        // set the pixel color, converting values from [0,1] into [0,255]
        fill (255 * r, 255 * g, 255 * b);

        rect (x, y, 1, 1);   // make a little rectangle to fill in the pixel
        }
    }

}
function castRay(ray){
    closestHit = [];
    for (i = 0; i< shape.length; i++){
        object = shape[i];
        // hit  = [hitpoint,object,t]
        let hit = intersectswith(object, ray);
        if (hit.length > 0) {
            if (closestHit.length > 0) {
                if (closestHit[2] > hit[2]) {
                    closestHit = hit;
                }
            } else {
                closestHit = hit;
            }
        }
    }
    return closestHit;
}

function intersectswith(object, ray) {
    origin =  ray[1];
    direction = ray[0];
    dx = direction[0];
    dy = direction[1];
    dz = direction[2];
    xo = eye_pos[0];
    yo = eye_pos[1];
    zo = eye_pos[2];
    xc = object[0];
    yc = object[1];
    zc = object[2];
    radius = object[3];
    a = Math.pow(dx,2) + Math.pow(dy,2) + Math.pow(dz,2);
    b = 2* xo * dx -2 * dx * xc + 2 * yo * dy -2 * dy * yc + 2 * zo * dz - 2 * dz * zc;
    c = Math.pow(xo,2) +Math.pow(xc,2) - 2*xo*xc - Math.pow(radius,2) +Math.pow(yo,2) +Math.pow(yc,2) - 2*yo*yc +  Math.pow(zo,2) +Math.pow(zc,2) - 2*zo*zc;
    discriminant = Math.pow(b,2) - 4*a*c;
    if (discriminant < 0) {
        return [];
    }
    t1 = (-b - Math.sqrt(discriminant))/(2*a);
    t2 = (-b + Math.sqrt(discriminant))/(2*a);
    t  = Math.min(t1,t2);
    hitpoint = [(xo + t * dx), (yo + t * dy),(zo + t * dz)];
    return [hitpoint, object, t];

}

