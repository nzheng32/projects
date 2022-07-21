// polygon mesh routines that you should write
//1.
let vertexList = [];
//2.
let polys = [];

function init_polys()
{
    vertexList = [];
    polys = [];
}

function new_vertex (x, y, z, nx, ny, nz)
{
    let vertexcoor = createVector(x,y,z);
    let normal = createVector(nx, ny, nz);
    vertexList.push([vertexcoor, normal])
}

function new_quad (i1, i2, i3, i4)
{
    polys.push([i1, i2, i3, i4])
}

function draw_polys() {
    if (normal_flag == 1) {
        normalMaterial();
        for (let i = 0; i < polys.length; i++){
            poly = polys[i];
            beginShape();
            for (let j = 0; j < poly.length; j++){
                let vertexInfo = vertexList[poly[j]];
                let vertexcoor = vertexInfo[0];
                let normal = vertexInfo[1];
                vertexNormal(normal.x, normal.y,normal.z);
                vertex(vertexcoor.x, vertexcoor.y,vertexcoor.z);
            }
            endShape ();
        }
    } else if(show_vertices_flag == 1) {
        for (let i = 0; i < vertexList.length; i++){
            let vertexInfo = vertexList[i];
            let vertexcoor = vertexInfo[0];
            let normal = vertexInfo[1];
            beginShape();
            push();
            translate(vertexcoor.x,vertexcoor.y,vertexcoor.z);
            sphere(0.7)
            pop();
            endShape ();
        }
    } else {
        for (let i = 0; i < polys.length; i++){
            poly = polys[i];
            beginShape();
            for (let j = 0; j < poly.length; j++){
                let vertexInfo = vertexList[poly[j]];
                let vertexcoor = vertexInfo[0];
                let normal = vertexInfo[1];
                vertexNormal(normal.x, normal.y,normal.z);
                vertex(vertexcoor.x, vertexcoor.y,vertexcoor.z);
            }
            endShape ();
        }
    }
}

function create_cylinder(rad,x1,y1,z1,x2,y2,z2)
{
    let p1 = createVector(x1,y1,z1);
    let p2 = createVector(x2,y2,z2);
    let t = p5.Vector.sub(p1, p2);
    let norm = Math.sqrt((t.x * t.x) + (t.y * t.y) + (t.z *t.z));
    let n = createVector(t.x/norm, t.y/norm, t.z/norm);
    if (n.x == 0) {
        tp = createVector(1,0,0);
    }else {
        tp = createVector(0,1,0);
    }
    let normp = Math.sqrt((tp.x * tp.x) + (tp.y * tp.y) + (tp.z *tp.z));
    let np = createVector(tp.x/normp, tp.y/normp, tp.z/normp);
    let u = p5.Vector.cross(n, np);
    let v = p5.Vector.cross(u, n);
    let angle = 0;
    let k = vertexList.length;
    for (let i = 0; i < 16; i ++) {
        let q = p5.Vector.add(p1, p5.Vector.add(p5.Vector.mult(u, rad * cos(angle)),p5.Vector.mult(v, rad * sin(angle))));
        let normal = p5.Vector.add(p5.Vector.add(p5.Vector.mult(u, rad * cos(angle)),p5.Vector.mult(v, rad * sin(angle))), p5.Vector.cross(u,v));
        new_vertex (q.x, q.y, q.z, normal.x, normal.y, normal.z);
        angle = angle + 2*PI/16.0;
    }
    angle = 0;
    for (let i = 0; i < 16; i ++) {
        let q = p5.Vector.add(p2, p5.Vector.add(p5.Vector.mult(u, rad * cos(angle)),p5.Vector.mult(v, rad * sin(angle))));
        let normal = p5.Vector.add(p5.Vector.add(p5.Vector.mult(u, rad * cos(angle)),p5.Vector.mult(v, rad * sin(angle))), p5.Vector.cross(u,v));
        new_vertex (q.x, q.y, q.z, normal.x, normal.y, normal.z);
        angle = angle + 2*PI/16.0;
    }
    for (let j = 0; j < 15; j++) {
        new_quad(j+ k, j + k + 16, j+k+17, j+k+1);
    }
    new_quad(15+ k, 15 + k + 16, 16 +k, k);



}

function bezier_tube(x1,y1,z1, x2,y2,z2, x3,y3,z3, x4,y4,z4, rad, num_around, num_length, nx, ny, nz)
{
    let central = [];
    let us = [];
    let vs =[];
    let tangent = [];
    let u = createVector(nx, ny, nz);
    for (let i = 0; i < num_length + 1; i++) {
        let t = 1.0* i / num_length;
        let x_bt = x1 * ((1-t)**3) + x2 * 3* ((1-t)**2)*t + x3 * 3*(t**2)*(1-t) + x4 * (t**3);
        let y_bt = y1 * ((1-t)**3) + y2 * 3* ((1-t)**2)*t + y3 * 3*(t**2)*(1-t) + y4 * (t**3);
        let z_bt = z1 * ((1-t)**3) + z2 * 3* ((1-t)**2)*t + z3 * 3*(t**2)*(1-t) + z4 * (t**3);
        Bt = createVector(x_bt, y_bt, z_bt);
        central.push(Bt)
    }
    let k = vertexList.length;


    for (let i = 0; i < central.length; i++) {
        let t = 1.0* (i) / num_length;
        let tx =  -3*(1-t)**2 * x1 + 3*(1-t)**2 * x2 - 6*t*(1-t) * x2 - 3*t**2 * x3 + 6*t*(1-t) * x3 + 3*t**2 * x4;
        let ty =  -3*(1-t)**2 * y1 + 3*(1-t)**2 * y2 - 6*t*(1-t) * y2 - 3*t**2 * y3 + 6*t*(1-t) * y3 + 3*t**2 * y4;
        let tz =  -3*(1-t)**2 * z1 + 3*(1-t)**2 * z2 - 6*t*(1-t) * z2 - 3*t**2 * z3 + 6*t*(1-t) * z3 + 3*t**2 * z4;
        let tp = createVector(tx, ty, tz);
        let vp = p5.Vector.cross(tp, u);
        let vi = p5.Vector.mult(vp, 1/p5.Vector.mag(vp));
        let up = p5.Vector.cross(vi, tp);
        u = p5.Vector.mult(up, 1/p5.Vector.mag(up));
        let p = central[i];
        let angle2 = 0;
        for (let o = 0; o < num_around; o ++) {
            let q2 = p5.Vector.add(p, p5.Vector.add(p5.Vector.mult(u, rad * cos(angle2)),p5.Vector.mult(vi, rad * sin(angle2))));
            normal2 = p5.Vector.add(p5.Vector.add(p5.Vector.mult(u, rad * cos(angle2)),p5.Vector.mult(vi, rad * sin(angle2))), p5.Vector.cross(u,vi));
            new_vertex (q2.x, q2.y, q2.z, normal2.x, normal2.y, normal2.z);
            angle2 = angle2 + 2*PI/num_around;
        }
    }
    for (let j = 0; j < central.length - 1; j++) {
        for (let m = 0; m < num_around - 1; m++) {
            new_quad(m+ k, m + k + num_around, m+k+num_around + 1, m+k+1);
        }

        new_quad(num_around - 1+ k, num_around - 1 + k + num_around, num_around +k, k);
        k = k + num_around;
    }

    return u;
}
