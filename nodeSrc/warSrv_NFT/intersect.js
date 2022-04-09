//-----client start--------------------
var cr = cr || {};

//line to rect intersect check
cr.intersect = function () {
};

cr.intersect.prototype.cross = function(p1,p2,p3) {
    var x1,x2,y1,y2;
    x1=p2[0]-p1[0];
    y1=p2[1]-p1[1];
    x2=p3[0]-p1[0];
    y2=p3[1]-p1[1];
    return x1*y2-x2*y1;  
};

cr.intersect.prototype.segment = function(p1,p2,p3,p4) {
    var D=0;
    if (Math.max(p1[0],p2[0]) >= Math.min(p3[0],p4[0]) && Math.max(p3[0],p4[0]) >= Math.min(p1[0],p2[0]) && Math.max(p1[1],p2[1]) >= Math.min(p3[1],p4[1]) && Math.max(p3[1],p4[1]) >= Math.min(p1[1],p2[1])) {
        if(this.cross(p1,p2,p3)*this.cross(p1,p2,p4)<=0 && this.cross(p3,p4,p1)*this.cross(p3,p4,p2)<=0) {
            D=1;
        } else {
            D=0;    
        }
    } else {
      D=0;
    } 
    return D;
};

//sq=[x_leftdown,y_leftdown,x_rightup,y_rightup]
cr.intersect.prototype.check = function(l1,l2,sq) {
    if((l1[0]>=sq[0] && l1[1]>=sq[1] && l1[0]<=sq[2] && l1[1]<=sq[3]) || (l2[0]>=sq[0] && l2[1]>=sq[1] && l2[0] <= sq[2] && l2[1]<=sq[3])) {
        return 1;
    } else {
        p1 = [sq[0],sq[1]];
        p2 = [sq[2],sq[3]];
        p3 = [sq[2],sq[1]];
        p4 = [sq[0],sq[3]];               
    }
    
    if(this.segment(l1,l2,p1,p2) || this.segment(l1,l2,p3,p4)) {
      return 1;
    } else {
      return 0;
    }
}

module.exports = cr.intersect;
//-----client end--------------------
