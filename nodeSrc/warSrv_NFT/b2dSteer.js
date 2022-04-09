var cr = cr || {};

if(typeof(browserVer) === "undefined") {
    var Box2D = require('box2dweb');
    var B2Vec2 = Box2D.Common.Math.b2Vec2;
    B2Vec2.Zero = Box2D.Common.Math.b2Math.b2Vec2_zero;

    //Methods on box2d stuff start with capitals, so yeah...
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
}

cr.b2dSteer = function () {
    this.dijkstraGrid = null;
    this.flowField = null;
    this.reverseFlowField = null;
    this.gridWidth = 0;
    this.gridHeight = 0;
    this.agents = [];
};

cr.b2dSteer.prototype.setAgents = function(val) {
    this.agents = val;
};

cr.b2dSteer.prototype.setGridWidth = function(val) {
    this.gridWidth = val;
};

cr.b2dSteer.prototype.setGridHeight = function(val) {
    this.gridHeight = val;
};

cr.b2dSteer.prototype.getDijkstraGrid = function() {
    return this.dijkstraGrid;
};

cr.b2dSteer.prototype.setFlowField = function(val) {
    this.flowField = val;
};

cr.b2dSteer.prototype.setReverseFlowField = function(val) {
    this.reverseFlowField = val;
};

cr.b2dSteer.prototype.getFlowField = function() {
    return this.flowField;
};

cr.b2dSteer.prototype.getReverseFlowField = function() {
    return this.reverseFlowField;
};

cr.b2dSteer.prototype.steeringBehaviourFlowField = function(agent) {
    //Work out the force to apply to us based on the flow field grid squares we are on.
    //we apply bilinear interpolation on the 4 grid squares nearest to us to work out our force.
    // http://en.wikipedia.org/wiki/Bilinear_interpolation#Nonlinear

    //Top left Coordinate of the 4




    var floor = agent.corePosition().Copy().Floor();
    var agentFlowField;

    if(agent.isHero) {
        agentFlowField = this.reverseFlowField;
    } else {
        agentFlowField = this.flowField;
    }

    //to avoid no agentFlowField arr data in Y scale
    if(floor.y >= agentFlowField[0].length - 1) {
        floor.y = agentFlowField[0].length - 2;
    }

    //The 4 weights we'll interpolate, see http://en.wikipedia.org/wiki/File:Bilininterp.png for the coordinates
    var f00 = (this.isValid(floor.x, floor.y) ? agentFlowField[floor.x][floor.y] : B2Vec2.Zero).Copy();
    var f01 = (this.isValid(floor.x, floor.y + 1) ? agentFlowField[floor.x][floor.y + 1] : B2Vec2.Zero).Copy();
    var f10 = (this.isValid(floor.x + 1, floor.y) ? agentFlowField[floor.x + 1][floor.y] : B2Vec2.Zero).Copy();
    var f11 = (this.isValid(floor.x + 1, floor.y + 1) ? agentFlowField[floor.x + 1][floor.y + 1] : B2Vec2.Zero).Copy();

    //Do the x interpolations
    var xWeight = agent.corePosition().x - floor.x;

    var top = f00.Multiply(1 - xWeight).Add(f10.Multiply(xWeight));
    var bottom = f01.Multiply(1 - xWeight).Add(f11.Multiply(xWeight));

    //Do the y interpolation
    var yWeight = agent.corePosition().y - floor.y;

    //This is now the direction we want to be travelling in (needs to be normalized)
    var desiredDirection = top.Multiply(1 - yWeight).Add(bottom.Multiply(yWeight));
    desiredDirection.Normalize();

    //If we are centered on a grid square with no vector this will happen
    if (isNaN(desiredDirection.LengthSquared())) {
        return desiredDirection.SetZero();
    }

    return this.steerTowards(agent, desiredDirection);
};

cr.b2dSteer.prototype.steeringBehaviourSeek = function(agent, dest) {
    if (dest.x == agent.corePosition().x && dest.y == agent.corePosition().y) {
        return new B2Vec2();
    }

    //Desired change of location
    var desired = dest.Copy().Subtract(agent.corePosition());
    //Desired velocity (move there at maximum speed)
    desired.Multiply(agent.maxSpeed / desired.Length());
    //The velocity change we want
    var velocityChange = desired.Subtract(agent.velocity());
    //Convert to a force
    return velocityChange.Multiply(agent.maxForce / agent.maxSpeed);
};

//Helper method. Returns true if this grid location is on the grid and not impassable
cr.b2dSteer.prototype.isValid = function(x, y) {
    //return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight && dijkstraGrid[x][y] != Number.MAX_VALUE;
    return x >= 0 && y >= 0 && x < this.gridWidth && y < this.gridHeight;
};

cr.b2dSteer.prototype.steerTowards = function(agent, desiredDirection) {
    //Multiply our direction by speed for our desired speed
    var desiredVelocity = desiredDirection.Multiply(agent.maxSpeed);

    //The velocity change we want
    var velocityChange = desiredVelocity.Subtract(agent.velocity());
    //Convert to a force
    return velocityChange.Multiply(agent.maxForce / agent.maxSpeed);
};

cr.b2dSteer.prototype.steeringBehaviourSeparation = function(agent) {
    var totalForce = new B2Vec2();
    var neighboursCount = 0;

    for (var i = 0; i < this.agents.length; i++) {
        var a = this.agents[i];
        if (a != agent) {
            var distance = agent.corePosition().DistanceTo(a.corePosition());
            if (distance < agent.minSeparation && distance > 0) {
                //Vector to other agent
                var pushForce = agent.corePosition().Copy().Subtract(a.corePosition());
                totalForce.Add(pushForce.Divide(agent.radius));
                neighboursCount++;
            }
        }
    }

    if (neighboursCount == 0) {
        return totalForce; //Zero
    }

    return totalForce.Multiply(agent.maxForce / neighboursCount);
};

cr.b2dSteer.prototype.steeringBehaviourCohesion = function(agent) {
    //Start with just our position
    var centerOfMass = agent.corePosition().Copy();
    var neighboursCount = 1;

    for (var i = 0; i < this.agents.length; i++) {
        var a = this.agents[i];
        if (a != agent) {
            var distance = agent.corePosition().DistanceTo(a.corePosition());
            if (distance < agent.maxCohesion) {
                //sum up the position of our neighbours
                centerOfMass.Add(a.corePosition());
                neighboursCount++;
            }
        }
    }

    if (neighboursCount == 1) {
        return new B2Vec2();
    }

    //Get the average position of ourself and our neighbours
    centerOfMass.Divide(neighboursCount);

    //seek that position
    return this.steeringBehaviourSeek(agent, centerOfMass);
};

cr.b2dSteer.prototype.steeringBehaviourAlignment = function(agent) {
    var averageHeading = new B2Vec2();
    var neighboursCount = 0;

    //for each of our neighbours (including ourself)
    for (var i = 0; i < this.agents.length; i++) {
        var a = this.agents[i];
        var distance = agent.corePosition().DistanceTo(a.corePosition());
        //That are within the max distance and are moving
        if (distance < agent.maxCohesion && a.velocity().Length() > 0) {
            //Sum up our headings
            var head = a.velocity().Copy();
            head.Normalize();
            averageHeading.Add(head);
            neighboursCount++;
        }
    }

    if (neighboursCount == 0) {
        return averageHeading; //Zero
    }

    //Divide to get the average heading
    averageHeading.Divide(neighboursCount);

    //Steer towards that heading
    return this.steerTowards(agent, averageHeading);
};

cr.b2dSteer.prototype.genDestinationException = function(obstacle) {
    var destinationObj = towerObj[targetTower];

    for(var i=0;i<destinationObj.length;i++) {
        if(obstacle.x == destinationObj[i][0] && obstacle.y == destinationObj[i][1]) {
            return true;
        }
    }

    return false; 
};

/*
cr.b2dSteer.prototype.generateDijkstraGrid = function() {
    //Generate an empty grid, set all places as weight null, which will stand for unvisited
    this.dijkstraGrid = new Array(this.gridWidth);
    for (var x = 0; x < this.gridWidth; x++) {
        var arr = new Array(this.gridHeight);
        for (var y = 0; y < this.gridHeight; y++) {
            arr[y] = null;
        }
        this.dijkstraGrid[x] = arr;
    }


    //Set all places where obstacles are as being weight MAXINT, which will stand for not able to go here
    for (var i = 0; i < this.obstacles.length; i++) {
        var t = this.obstacles[i];
        if(!this.genDestinationException(t))
            this.dijkstraGrid[t.x][t.y] = Number.MAX_VALUE;
    }

    //flood fill out from the end point
    var pathEnd = enemyDestination.Copy();
    pathEnd.Round();

    pathEnd.distance = 0;
    this.dijkstraGrid[pathEnd.x][pathEnd.y] = 0;

    var toVisit = [pathEnd];

    //for each node we need to visit, starting with the pathEnd
    for (i = 0; i < toVisit.length; i++) {
        var neighbours = this.straightNeighboursOf(toVisit[i]);

        //for each neighbour of this node (only straight line neighbours, not diagonals)
        for (var j = 0; j < neighbours.length; j++) {
            var n = neighbours[j];

            //We will only ever visit every node once as we are always visiting nodes in the most efficient order
            if (this.dijkstraGrid[n.x][n.y] === null) {
                n.distance = toVisit[i].distance + 1;
                this.dijkstraGrid[n.x][n.y] = n.distance;
                toVisit.push(n);
            }
        }
    }
};

cr.b2dSteer.prototype.generateFlowField = function() {
    var x, y;

    //Generate an empty grid, set all places as Vector2.zero, which will stand for no good direction
    var flowFieldTmp = new Array(this.gridWidth);

    for (x = 0; x < this.gridWidth; x++) {
        var arr = new Array(this.gridHeight);
        for (y = 0; y < this.gridHeight; y++) {
            arr[y] = B2Vec2.Zero;
        }
        flowFieldTmp[x] = arr;
    }

    //for each grid square
    for (x = 0; x < this.gridWidth; x++) {
        for (y = 0; y < this.gridHeight; y++) {

            //Obstacles have no flow value
            if (this.dijkstraGrid[x][y] == Number.MAX_VALUE) {
                continue;
            }

            var pos = new B2Vec2(x, y);
            var neighbours = this.allNeighboursOf(pos);

            //Go through all neighbours and find the one with the lowest distance
            var min = null;
            var minDist = 0;
            for (var i = 0; i < neighbours.length; i++) {
                var n = neighbours[i];
                var dist = this.dijkstraGrid[n.x][n.y] - this.dijkstraGrid[pos.x][pos.y];

                if (dist < minDist) {
                    min = n;
                    minDist = dist;
                }
            }

            //If we found a valid neighbour, point in its direction
            if (min != null) {
                var v = min.Copy().Subtract(pos);
                v.Normalize();
                flowFieldTmp[x][y] = v;
            }
        }
    }

    return flowFieldTmp;
};
*/

cr.b2dSteer.prototype.straightNeighboursOf = function(v) {
    var res = [];
    if (v.x > 0) {
        res.push(new B2Vec2(v.x - 1, v.y));
    }
    if (v.y > 0) {
        res.push(new B2Vec2(v.x, v.y - 1));
    }

    if (v.x < this.gridWidth - 1) {
        res.push(new B2Vec2(v.x + 1, v.y));
    }
    if (v.y < this.gridHeight - 1) {
        res.push(new B2Vec2(v.x, v.y + 1));
    }

    return res;
};


//Returns the non-obstructed neighbours of the given grid location.
//Diagonals are only included if their neighbours are also not obstructed
cr.b2dSteer.prototype.allNeighboursOf = function(v) {
    var res = [],
        x = v.x,
        y = v.y;

    var up = this.isValid(x, y - 1),
        down = this.isValid(x, y + 1),
        left = this.isValid(x - 1, y),
        right = this.isValid(x + 1, y);

    //We test each straight direction, then subtest the next one clockwise

    if (left) {
        res.push(new B2Vec2(x - 1, y));

        //left up
        if (up && this.isValid(x - 1, y - 1)) {
            res.push(new B2Vec2(x - 1, y - 1));
        }
    }

    if (up) {
        res.push(new B2Vec2(x, y - 1));

        //up right
        if (right && this.isValid(x + 1, y - 1)) {
            res.push(new B2Vec2(x + 1, y - 1));
        }
    }

    if (right) {
        res.push(new B2Vec2(x + 1, y));

        //right down
        if (down && this.isValid(x + 1, y + 1)) {
            res.push(new B2Vec2(x + 1, y + 1));
        }
    }

    if (down) {
        res.push(new B2Vec2(x, y + 1));

        //down left
        if (left && this.isValid(x - 1, y + 1)) {
            res.push(new B2Vec2(x - 1, y + 1));
        }
    }

    return res;
};

module.exports = cr.b2dSteer;