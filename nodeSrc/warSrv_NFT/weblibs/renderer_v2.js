//This file just deals with drawing things.
//It is probably cludgy as, don't look in here for good coding advice! :)s

var stage;
var gfxResources = {};

var towerBitmaps = [];

var agentId = 1;
var agentBitmaps = [];

var targetShape;
var obstaclesShape;
var weightsAndFieldShape;
var ste = new cr.MyWorld();
var agentForceLines = {};
var actSelect = "";

$("#hr1").click(function() {
    console.log("hr1");
    actSelect = "hr1";
});
$("#hr2").click(function() {
    console.log("hr2");
    actSelect = "hr2";
});
$("#lr2").click(function() {
    console.log("lr2");
    actSelect = "lr2";
});
$("#ske1").click(function() {
    console.log("ske1");
    actSelect = "ske1";
});
$("#ske2").click(function() {
    console.log("ske2");
    actSelect = "ske2";
});
$("#goat1").click(function() {
    console.log("goat1");
    actSelect = "goat1";
});
$("#gi1").click(function() {
    console.log("gi1");
    actSelect = "gi1";
});
$("#gi2").click(function() {
    console.log("gi2");
    actSelect = "gi2";
});
$("#flies1").click(function() {
    console.log("flies1");
    actSelect = "flies1";
});
$("#bomb1").click(function() {
    console.log("bomb1");
    actSelect = "bomb1";
});
$("#bomb2").click(function() {
    console.log("bomb2");
    actSelect = "bomb2";
});
$("#log1").click(function() {
    console.log("log1");
    actSelect = "log1";
});
$("#log2").click(function() {
    console.log("log2");
    actSelect = "log2";
});
$("#hammer2").click(function() {
    console.log("hammer2");
    actSelect = "hammer2";
});

$("#tick").click(function() {
    console.log("tick");
    ste.gameTick(createjs.Ticker.getInterval() / 1000);
});




function init() {
    stage = new createjs.Stage('canvas');
    createjs.DisplayObject.suppressCrossDomainErrors = true;

    var queue = new createjs.LoadQueue(false);
    queue.addEventListener('complete', loadingComplete);
    queue.addEventListener('fileload', function (event) {

        //remove path and extension
        var filename = event.item.id.substring('./weblibs/images/'.length);
        filename = filename.substr(0, filename.lastIndexOf('.'));

        gfxResources[filename] = event.result;
    });

    queue.loadFile('./weblibs/images/tower.png');
    queue.loadFile('./weblibs/images/turret.png');

    queue.loadFile('./weblibs/images/agent.png');
    queue.loadFile('./weblibs/images/agentBig.png');
    queue.loadFile('./weblibs/images/bullet.png');

    queue.load();
}

function createCenteredBitmap(filename) {
    var sprite = new createjs.Bitmap(gfxResources[filename]);
    sprite.regX = sprite.image.width / 2;
    sprite.regY = sprite.image.height / 2;
    return sprite;
}

function loadingComplete() {
    ste.startGame();
    var x, y;
    var fences = ste.fences;
    var obstacles = ste.obstacles;

    //Draw a grid
    var gridShape = new createjs.Shape();
    gridShape.x = 0.5;
    gridShape.y = 0.5;
    gridShape.graphics.beginStroke('#bbb').setStrokeStyle(1);

    console.log("canvas size:" + const_gridWidthPx +":"+ const_gridHeightPx);

    //base grids
    for (x = 0; x < const_gridWidthPx; x += const_gridPx) {
        gridShape.graphics.moveTo(x, 0);
        gridShape.graphics.lineTo(x, const_gridHeightPx);
    }
    for (y = 0; y < const_gridHeightPx ; y += const_gridPx) {
        gridShape.graphics.moveTo(0, y);
        gridShape.graphics.lineTo(const_gridWidthPx, y);
    }
    stage.addChild(gridShape);

/*
    targetShape = new createjs.Shape();
    targetShape.graphics.beginStroke('#00f');
    targetShape.graphics.drawCircle(0, 0, 5);
    stage.addChild(targetShape);
*/

    //surrounding fence and middle river objects
    obstaclesShape = new createjs.Shape();
    obstaclesShape.graphics.beginFill('#f0f0f0');
    for (var i = 0; i < fences.length; i++) {
        var o = fences[i];
        obstaclesShape.graphics.rect(o.x * const_gridPx, o.y * const_gridPx, const_gridPx, const_gridPx);
    }
    stage.addChild(obstaclesShape);

/*
    //surrounding fence and middle river objects
    logShape = new createjs.Shape();
    logShape.graphics.beginFill('#f00');
    logShape.graphics.rect(3 * const_gridPx, 12 * const_gridPx, 6*const_gridPx, 1*const_gridPx);
    stage.addChild(logShape);
*/

    //for bases
    bases = ste.bases;
    var mx,my;
    var baseShape;
    for (var baseObj of bases) {
        baseShape = new createjs.Shape();
        baseShape.graphics.beginFill('#f0f0f0');
        var bPos = baseObj.corePosition();

        mx = bPos.x-(baseObj.size-1)/2;
        my = bPos.y-(baseObj.size-1)/2;
        //baseShape.graphics.rect(mx * const_gridPx, my * const_gridPx, baseObj.size*const_gridPx, baseObj.size*const_gridPx);
        baseShape.graphics.arc((bPos.x+0.5) * const_gridPx, (bPos.y+0.5) * const_gridPx,baseObj.size/2*const_gridPx,0,360);
        baseObj.dispObj = baseShape;
        stage.addChild(baseShape);
    }

    // for test fort obstacle
    forts = ste.forts;
    var fortShape;
    for (var fortObj of forts) {
        fortShape = new createjs.Shape();
        fortShape.graphics.beginFill('#f00');
        //fortShape.graphics.rect(fortObj.x * const_gridPx, fortObj.y * const_gridPx, fortObj.size*const_gridPx, fortObj.size*const_gridPx);
        fortShape.graphics.arc((fortObj.x+1) * const_gridPx, (fortObj.y+1) * const_gridPx,fortObj.size/2*const_gridPx,0,360);
        fortObj.dispObj = fortShape;
        stage.addChild(fortShape);
    }

    weightsAndFieldShape = new createjs.Container();
    stage.addChild(weightsAndFieldShape);

    updateWeightsAndFieldVisuals();

    createjs.Ticker.setFPS(30);

    console.log(createjs.Ticker.getInterval());

    createjs.Ticker.addEventListener("tick", function () {
        if(ste.isStart) {

ste.gameTick(createjs.Ticker.getInterval() / 1000);
            
            rendererTick();
            stage.update();            
        }
    });
}

function updateWeightsAndFieldVisuals() {
    flowField = ste.reverseFlowField;
//    flowField = ste.flowField;

    console.log("---flow field----");
    console.log(flowField);

    weightsAndFieldShape.removeAllChildren();

/*
    //Draw the weights
    for (x = 0; x < const_gridWidth; x++) {
        for (y = 0; y < const_gridHeight; y++) {
            var d = dijkstraGrid[x][y];
            if (d == 0 || d === Number.MAX_VALUE) {
                continue;
            }
            var text = new createjs.Text('' + d, '16px Arial', '#000');
            text.x = (x + 0.5) * gridPx;
            text.y = (y + 0.5) * gridPx;
            text.textBaseline = 'middle';
            text.textAlign = 'center';
            weightsAndFieldShape.addChild(text);
        }
    }
*/

    //Visualise the flow field
    var flowFieldShape = new createjs.Shape();
    flowFieldShape.x = const_gridPx / 2 + 0.5;
    flowFieldShape.y = const_gridPx / 2 + 0.5;
    flowFieldShape.graphics.beginStroke('#00f');
    for (x = 0; x < const_gridWidth; x++) {
        for (y = 0; y < const_gridHeight; y++) {
            if (flowField[x][y]) {
                var f = flowField[x][y];

                if(f.x == 0 && f.y == -1) {
                    flowFieldShape.graphics.beginStroke('#f5f');
                }
                else if(f.x == 0.7071067811865475 && f.y == -0.7071067811865475) {
                    flowFieldShape.graphics.beginStroke('#f5f');
                }
                else if(f.x == -0.7071067811865475 && f.y == -0.7071067811865475) {
                    flowFieldShape.graphics.beginStroke('#f5f');
                }

                else if(f.x == 0 && f.y == 1) {
                    flowFieldShape.graphics.beginStroke('#00f');
                }
                else if(f.x == 0.7071067811865475 && f.y == 0.7071067811865475) {
                    flowFieldShape.graphics.beginStroke('#00f');
                }
                else if(f.x == -0.7071067811865475 && f.y == 0.7071067811865475) {
                    flowFieldShape.graphics.beginStroke('#00f');
                }
                else if(f.x == -1 && f.y == 0) {
                    flowFieldShape.graphics.beginStroke('#f5f');
                }

                flowFieldShape.graphics.moveTo(x * const_gridPx, y * const_gridPx);
                flowFieldShape.graphics.lineTo((x + 0.5 * f.x) * const_gridPx, (y + 0.5 * f.y) * const_gridPx);
            }
        }
    }



    weightsAndFieldShape.addChild(flowFieldShape);
}

function rendererTick() {
    //targetShape.x = (enemyDestination.x + 0.5) * gridPx;
    //targetShape.y = (enemyDestination.y + 0.5) * gridPx;

    //Create new enemy bitmaps as required
    //Update enemy positions
    //Mark bitmaps as alive

    agents = ste.agents;
    bullets = ste.bullets;
    bases = ste.bases;
    forts = ste.forts;
    logs = ste.rollLogs;

    for (var i = 0; i < logs.length; i++) {
        var e = logs[i];
        if (!e._id) {
            e._id = (agentId++);
        }
        var logShape = agentBitmaps[e._id];

        if(!logShape) {
            logBody = e.body;
         
            logShape = new createjs.Shape();
            logShape._pr = e;
            logShape.graphics.beginFill('#f00');
            logShape.graphics.rect((logBody.GetPosition().x-2.5) * const_gridPx, (logBody.GetPosition().y) * const_gridPx, 6*const_gridPx, 1*const_gridPx);
            stage.addChild(logShape);
            agentBitmaps[e._id] = logShape;
        } else {
            stage.removeChild(logShape);
            logShape = new createjs.Shape();
            logShape._pr = e;
            logShape.graphics.beginFill('#f00');
            logShape.graphics.rect((logBody.GetPosition().x-2.5) * const_gridPx, (logBody.GetPosition().y) * const_gridPx, 6*const_gridPx, 1*const_gridPx);
            stage.addChild(logShape);
            agentBitmaps[e._id] = logShape;
        }
    }
 


    // agents
    for (var i = 0; i < agents.length; i++) {
        var e = agents[i];

//console.log("----------");
//console.log(e.rotation);
//console.log(e.baseDestination);


        if(e.enemyDestination) {
            var e_target = e.enemyDestination;

            var ep = e_target.corePosition();
            if(e.status == "attack") {
                ep = e.attackToPos?e.attackToPos:ep;
            }

            //console.log(ep);
            var ap = e.corePosition();
            var ax = (ep.x - ap.x)*const_gridPx;
            var ay = (ep.y - ap.y)*const_gridPx;
        }

        if (!e._id) {
            e._id = (agentId++);
        }

        var bitmap = agentBitmaps[e._id];
        var forceLine = agentForceLines[e._id];
        var lineColor = '#0f0';

        if (!bitmap) {
            if(e.bodySize == 1)
                   bitmap = agentBitmaps[e._id] = createCenteredBitmap('agent');
            else if(e.bodySize == 2)
                   bitmap = agentBitmaps[e._id] = createCenteredBitmap('agentBig');
            else if(e.bodySize == 0.5)
                   bitmap = agentBitmaps[e._id] = createCenteredBitmap('bullet');

            bitmap._pr = e;

            stage.addChild(bitmap);

            forceLine = agentForceLines[e._id] = new createjs.Shape();
            stage.addChild(forceLine);
        }

        if(e.getLife() <= 0) {
            stage.removeChild(bitmap);
            stage.removeChild(forceLine);
        } else {
            bitmap.x = const_gridPx * (e.corePosition().x + 0.5);
            bitmap.y = const_gridPx * (e.corePosition().y + 0.5);
            bitmap.rotation = e.rotation;  

            forceLine.x = bitmap.x;
            forceLine.y = bitmap.y;

            lineColor = e.isHero?"#0f0":"#f00";
                
            if(e.enemyDestination) {
                forceLine.graphics.clear().beginStroke(lineColor).moveTo(0, 0).lineTo(ax, ay);
            }
        }
    }

    //remove the log which is alreay destroyed in physic engine.
    for(var i=0;i<agentBitmaps.length;i++) {
        //console.log("###!!!$$$");
        if(agentBitmaps[i] && agentBitmaps[i]._pr !== undefined) {
            if(agentBitmaps[i]._pr.getLife() <= 0) {
                stage.removeChild(agentBitmaps[i]);
            }
        }
    }





    //new bullets
    // agents
    for (var i = 0; i < bullets.length; i++) {
        var e = bullets[i];

        if (!e._id) {
            e._id = (agentId++);
        }

        var bitmap = agentBitmaps[e._id];

        if (!bitmap) {
            if(e.bodySize == 1)
                   bitmap = agentBitmaps[e._id] = createCenteredBitmap('agent');
            else if(e.bodySize == 2)
                   bitmap = agentBitmaps[e._id] = createCenteredBitmap('agentBig');
            else if(e.bodySize == 0.5)
                   bitmap = agentBitmaps[e._id] = createCenteredBitmap('bullet');

            bitmap._pr = e;

            stage.addChild(bitmap);
        }

        if(e.getLife() <= 0) {
            stage.removeChild(bitmap);
            stage.removeChild(forceLine);
        } else {
            bitmap.x = const_gridPx * (e.corePosition().x + 0.5);
            bitmap.y = const_gridPx * (e.corePosition().y + 0.5);
            bitmap.rotation = e.rotation;  
        }
    }

    //the core of base
    for (var i = 0; i < bases.length; i++) {
        var e = bases[i];
        var e_target = e.enemyDestination;

        if(e_target) {
            var ep = e_target.corePosition();
            //console.log(ep);
            var ap = e.corePosition();
            var ax = (ep.x - ap.x)*const_gridPx;
            var ay = (ep.y - ap.y)*const_gridPx;            
        }

        if (!e._id) {
            e._id = (agentId++);
        }

        var bitmap = agentBitmaps[e._id];
        var forceLine = agentForceLines[e._id];
        var lineColor = '#0f0';

        if (!bitmap) {
            bitmap = agentBitmaps[e._id] = createCenteredBitmap('agent');
            stage.addChild(bitmap);

            forceLine = agentForceLines[e._id] = new createjs.Shape();
            stage.addChild(forceLine);
        }
        if(e.getLife() <= 0) {
            stage.removeChild(bitmap);    
            stage.removeChild(e.dispObj);
            stage.removeChild(forceLine);
        } else {
            bitmap.x = const_gridPx * (e.corePosition().x + 0.5);
            bitmap.y = const_gridPx * (e.corePosition().y + 0.5);

            forceLine.x = bitmap.x;
            forceLine.y = bitmap.y;

            lineColor = e.isHero?"#0f0":"#f00";
            if(e_target) {
                forceLine.graphics.clear().beginStroke(lineColor).moveTo(0, 0).lineTo(ax, ay);
            }
        }
    }

    //the core of fort
    for (var i = 0; i < forts.length; i++) {
        var e = forts[i];
        var e_target = e.enemyDestination;

        if(e_target) {
            var ep = e_target.corePosition();
            //console.log(ep);
            var ap = e.corePosition();
            var ax = (ep.x - ap.x)*const_gridPx;
            var ay = (ep.y - ap.y)*const_gridPx;            
        }

        if (!e._id) {
            e._id = (agentId++);
        }

        var bitmap = agentBitmaps[e._id];
        var forceLine = agentForceLines[e._id];
        var lineColor = '#0f0';

        if (!bitmap) {
            bitmap = agentBitmaps[e._id] = createCenteredBitmap('agent');
            stage.addChild(bitmap);

            forceLine = agentForceLines[e._id] = new createjs.Shape();
            stage.addChild(forceLine);
        }
        if(e.getLife() <= 0) {
            stage.removeChild(bitmap);    
            stage.removeChild(e.dispObj);
            stage.removeChild(forceLine);
        } else {
            bitmap.x = const_gridPx * (e.corePosition().x + 0.5);
            bitmap.y = const_gridPx * (e.corePosition().y + 0.5);

            forceLine.x = bitmap.x;
            forceLine.y = bitmap.y;

            lineColor = e.isHero?"#0f0":"#f00";
            if(e_target) {
                forceLine.graphics.clear().beginStroke(lineColor).moveTo(0, 0).lineTo(ax, ay);
            }
        }
    }

/*
    var shape=new createjs.Shape();
    var graphics=shape.graphics;

    graphics.s("#f00").ss(1);


    //graphics.setStrokeStyle(2);
    //graphics.beginFill("blue");
    //graphics.drawCircle(100,100,17.5);
    graphics.arc(100,100,17.5,0,360);
    stage.addChild(shape);
*/

}