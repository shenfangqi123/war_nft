var cr = cr || {};

var Box2D = require('box2dweb');

var B2Math = Box2D.Common.Math.b2Math;
var B2Vec2 = Box2D.Common.Math.b2Vec2;
var B2BodyDef = Box2D.Dynamics.b2BodyDef;
var B2Body = Box2D.Dynamics.b2Body;
var B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var B2Fixture = Box2D.Dynamics.b2Fixture;
var B2World = Box2D.Dynamics.b2World;
var B2MassData = Box2D.Collision.Shapes.b2MassData;
var B2Shape = Box2D.Collision.Shapes.b2Shape;
var B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

B2Vec2.Zero = Box2D.Common.Math.b2Math.b2Vec2_zero;
//Methods on box2d stuff start with capitals, so yeah...

console.log("######");

B2Vec2.prototype.Round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
};

B2Vec2.prototype.Floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
};

B2Vec2.prototype.Angle = function () {
    return Math.atan2(this.x, -this.y) * 180 / Math.PI;
};

B2Vec2.prototype.DistanceTo = function (target) {
    return this.Copy().Subtract(target).Length();
};


B2Vec2.prototype.Divide = function (a) {
    if (a === undefined) a = 0;
    this.x /= a;
    this.y /= a;

    return this;
};


//math.js
Vector2 = function (x, y) {
    this.x = x;
    this.y = y;
};
Vector2.zero = new Vector2(0, 0);
Vector2.one = new Vector2(1, 1);

Vector2.prototype.length = function () {
    return this.distanceTo(Vector2.zero);
};

Vector2.prototype.distanceTo = function (target) {
    var xDif = this.x - target.x;
    var yDif = this.y - target.y;

    return Math.sqrt((xDif * xDif) + (yDif * yDif));
};

Vector2.prototype.normalize = function () {
    var length = this.length();

    return new Vector2(this.x / length, this.y / length);
};
Vector2.prototype.round = function () {
    return new Vector2(Math.round(this.x), Math.round(this.y));
};
Vector2.prototype.floor = function () {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
};

Vector2.prototype.minus = function (other) {
    return new Vector2(this.x - other.x, this.y - other.y);
};
Vector2.prototype.plus = function (other) {
    return new Vector2(this.x + other.x, this.y + other.y);
};
Vector2.prototype.mul = function (scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
};
Vector2.prototype.div = function (scalar) {
    return new Vector2(this.x / scalar, this.y / scalar);
};

Vector2.prototype.angle = function () {
    return Math.atan2(this.x, -this.y) * 180 / Math.PI;
};


//Factory method
vector2 = function (x, y) {
    if (x.length) { //array
        return new Vector2(x[0], x[1]);
    } /*else if (y !== undefined) {
        return new Vector2(x, y);
    }*/

    //Debug only
    if (!(x instanceof Vector2)) {
        throw "x is not a Vector2";
    }

    return x;
};


LineSegment = function (start, end) {
    this.start = vector2(start);
    this.end = vector2(end);

    this.length = this.start.distanceTo(this.end);
};

LineSegment.prototype.interpolatedPoint = function (percent) {
    var invPercent = (1 - percent);
    return new Vector2(this.start.x * invPercent + this.end.x * percent, this.start.y * invPercent + this.end.y * percent);
};


LineString = function (points) {
    var pointsSafe = [],
        i;

    this.segments = [];
    this.length = 0;

    for (i = 0; i < points.length; i++) {
        pointsSafe.push(vector2(points[i]));
    }

    for (i = 1; i < points.length; i++) {
        var segment = new LineSegment(pointsSafe[i - 1], pointsSafe[i]);
        this.segments.push(segment);
        this.length += segment.length;
    }
}
//--end of math.js----


//Defines an agent that moves
Agent = function (world, pos, categoryBits, maskBits) {
    this.agentId = 
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);  
            return v.toString(16);  
        });
    this.rotation = 0;

    this.maxForce = 5; //rate of acceleration
    this.maxSpeed = 2; //grid squares / second
    this.actType = "move";

    this.radius = 0.4;
    this.minSeparation = 1.2; // We'll move away from anyone nearer than this

    this.maxCohesion = 4; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    //Create a physics body for the agent
    var fixDef = new B2FixtureDef();
    var bodyDef = new B2BodyDef();

    fixDef.density = 10.0;
    fixDef.friction = 0.0;
    fixDef.restitution = 0.0;
    fixDef.shape = new B2CircleShape(this.radius * 0.5);

    fixDef.filter.categoryBits = 0x3;
    fixDef.filter.maskBits = 0x2;
    fixDef.filter.groupIndex = 1;

    bodyDef.type = B2Body.b2_dynamicBody;
    bodyDef.position.SetV(pos);

    this.body = world.CreateBody(bodyDef);
    this.fixture = this.body.CreateFixture(fixDef);
};

Agent.prototype.position = function () {
    return this.body.GetPosition();
};

Agent.prototype.velocity = function () {
    return this.body.GetLinearVelocity();
};