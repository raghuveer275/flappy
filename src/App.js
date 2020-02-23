import React from 'react';
import './App.scss';
import * as Matter from 'matter-js'

function App() {
  React.useEffect(() => {
    /**
 *
 * Flappy Bird Game
 * 
 * Use spacebar or click to jump and avoid walls
 * Source : J Scott Smith
 *
 */

    /* ===================================================== 
     * Setup Matter Engine
     * ================================================== */

    // Aliases
    let World = Matter.World;
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let Bodies = Matter.Bodies;
    let Body = Matter.Body;
    let Events = Matter.Events;

    let engine;
    let render;
    let element;
    let pixelRatio;
    let width;
    let height;

    function setupMatter() {
      element = document.getElementById('main');
      pixelRatio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      engine = Engine.create();

      // set the gravity to zero before the game starts
      engine.world.gravity.y = 0;

      // create the renderer with options
      render = Render.create({
        element: element,
        engine: engine,
        options: {
          width: width,
          height: height,
          pixelRatio: pixelRatio,
          background: 'orange',
          hasBounds: false,
          enabled: false,
          wireframes: false,
          showSleeping: false,
          showDebug: false,
          showBroadphase: false,
          showBounds: false,
          showVelocity: false,
          showCollisions: false,
          showSeparations: false,
          showAxes: false,
          showPositions: false,
          showAngleIndicator: false,
          showIds: false,
          showShadows: false,
          showVertexNumbers: false,
          showConvexHulls: false,
          showInternalEdges: false,
          showMousePosition: false
        }
      });
    }

    /* ===================================================== 
     * Event Listener and Handlers
     * ================================================== */

    function addEventListeners() {
      window.addEventListener('click', handleClick, false);
      window.addEventListener('touchstart', handleTouchstart, false);
      window.addEventListener('keydown', handleKeydown, false);
      window.addEventListener('resize', handleResize, false);
    }

    function handleResize() {
      window.location.reload()
    }

    function handleKeydown(event) {
      // spacebar
      if (event.keyCode === 32) {
        bumpBird();
      }
    }

    function handleTouchstart(event) {
      bumpBird();
    }

    function handleClick(event) {
      event.preventDefault();
      bumpBird();
    }

    /* ===================================================== 
     * The Bird Class
     * ================================================== */

    let Bird = function () {
      this.x = 200;
      this.y = 200;
      this.w = 30;
      this.static = true;
      this.body = Bodies.circle(this.x, this.y, this.w, this.static);
      this.body.render.sprite.texture = 'https://www.stickpng.com/assets/thumbs/584c69846e7d5809d2fa6366.png'
      this.body.render.sprite.xScale = .2
      this.body.render.sprite.yScale = .2
      this.body.restitution = .1;
    };

    Bird.prototype.addBird = function () {
      World.add(engine.world, this.body);
    };

    Bird.prototype.removeBird = function () {
      World.remove(engine.world, this.body);
    };

    Bird.prototype.setHit = function () {
      this.body.render.fillStyle = 'tomato';
      this.body.render.strokeStyle = 'red';
    }

    Bird.prototype.sad = function () {
      this.body.render.sprite.xScale = 1
      this.body.render.sprite.yScale = 1
      this.body.render.sprite.texture = 'https://vignette.wikia.nocookie.net/angry-birds-fanon/images/e/e2/ABGO_Sad_Red.png/revision/latest/scale-to-width-down/340?cb=20160624181829'
    }

    /* ===================================================== 
     * The Walls
     * ================================================== */

    function createWall() {

      let w = 60;
      let x = width + w / 2;
      // let maxH = height - 60 * 4; // height minus ground and then some

      let cut = getRandomIntInclusive(60, height - 120);
      let hole = getRandomIntInclusive(120, 160);

      let h1 = height - 60 - cut - hole;
      let h2 = cut - hole;

      let y1 = h1 / 2;
      let y2 = height - h2 / 2 - 20;

      let wall = {
        top: Bodies.rectangle(x, y1, w, h1, { isStatic: true }),
        bottom: Bodies.rectangle(x, y2, w, h2, { isStatic: true }),
      };

      // add body to walls array so the wall's position will be updated on each loop
      walls.push(wall);

      World.add(engine.world, [wall.top, wall.bottom]);
    }

    function removeWall(wall) {
      World.remove(engine.world, [wall.top, wall.bottom]);
      walls.shift();
    }

    function moveWalls() {
      if (collision || !start) return;

      walls.forEach((wall, i) => {
        // remove the wall when it's out of view
        if (wall.top.position.x < -30) {
          removeWall(wall);
          var x = document.getElementById("myScore");
          x.play();
          increaseScore(1);
          createWall();
        }

        // point to translate the wall 
        let t = { x: -6, y: 0 };
        Body.translate(wall.top, t);
        Body.translate(wall.bottom, t);
      });
    }

    /* ===================================================== 
     * The Game Bodies
     * ================================================== */

    let bird;
    let walls = [];
    let score = 0;
    let start = false;
    let collision = false;

    function createBird() {
      // Adds the bird to the world
      bird = new Bird();
      bird.addBird();
    }

    function createGround() {
      let h = 20;
      let x = width / 2;
      let y = height - h / 2;
      let w = width;

      let ceil = Bodies.rectangle(x, y - height, w, h, { isStatic: true });
      let floor = Bodies.rectangle(x, y, w, h, { isStatic: true });

      World.add(engine.world, [ceil, floor]);
    }




    function bumpBird() {
      var x = document.getElementById("myAudio");
      x.play(); 
      // Applies an upward force to the bird
      // TODO: need to limit the height, check if   
      // the body is on screen before bumping again
      // or alternatively have a ceiling that you hit
      if (collision || !start) return;

      // Body to apply force to
      let b = bird.body;

      // Position to apply Force is at  
      // the birds current position
      let p = bird.body.position;

      // Force vector to be applied
      let f = {
        x: 0,
        y: -0.1
      };

      Body.applyForce(b, p, f);
    }

    /* ===================================================== 
     * The Game
     * ================================================== */

    function runMatter() {
      // init the engine and renderer
      Engine.run(engine);
      Render.run(render);

      // Listeners for the game

      // Update the walls when the engine updates
      Events.on(engine, 'tick', moveWalls);

      // Collision Event ends the game :-(
      Events.on(engine, 'collisionStart', endGame);
    }

    function startGame() {
      start = true;
      engine.world.gravity.y = 1.5;
      // set the bird to static at first
      startButton.style.display = 'none';
    }

    function endGame() {
      var x = document.getElementById("sad");
      x.play(); 
      collision = true;
      bird.setHit();

      bird.sad()
      fail.style.display = 'block';
    }

    function resetGame() {
      startButton.style.display = 'block';
      fail.style.display = 'none';

      resetScore();
      start = false;
      collision = false;
      engine.world.gravity.y = 0;

      // remove bodies
      bird.removeBird();
      walls.forEach((wall) => {
        removeWall(wall);
      });

      walls = [];

      // add new bodies
      createBird();
      createWall();
    }


    /* ===================================================== 
     * The GUI
     * ================================================== */

    let scoreDisplay;
    let gui;
    let startButton;
    let resetButton;
    let fail;

    function setupGUI() {
      scoreDisplay = document.getElementById('score');
      scoreDisplay.innerText = score;

      gui = document.getElementById('gui');

      startButton = document.getElementById('start');
      resetButton = document.getElementById('reset');
      fail = document.getElementById('fail');
      fail.style.display = 'none';

      // Button listeners
      startButton.addEventListener('click', startGame, false);
      resetButton.addEventListener('click', resetGame, false);
    }

    function resetScore() {
      score = 0;
      scoreDisplay.innerText = score;
    }

    function increaseScore(points) {
      score += points;
      scoreDisplay.innerText = score;
    }

    /* ===================================================== 
     * Utilities
     * ================================================== */

    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* ===================================================== 
     * Kickoff
     * ================================================== */

    window.onload = init();

    // Initializes the game
    function init() {

      // Setup the Matter engine and renderer
      setupMatter();

      // Add event listeners
      addEventListeners();

      // Add the necessary Matter bodies to the world
      createBird();
      createWall();
      createGround();

      // GUI 
      setupGUI();

      // Runs the engine and renderer
      runMatter();
    }

  })
  return (
    <div id="main">
      <div id="gui">
        <audio id="myAudio">
          <source src="http://s1download-universal-soundbank.com/mp3/sounds/22372.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sad">
          <source src="http://shing.mobile9.com/download/media/702/angrybirds_oaw366ij.mp3" type="audio/mpeg" />
        </audio>
        <audio id="myScore">
          <source src="http://plantsvszombies.clan.su/publfiles/downloads/soundspvz/points.mp3" type="audio/mpeg" />
        </audio>
        <span id="score"></span>
        <button id="start">Start</button>
        <div id="fail" style={{display: "none"}}>
          <h2>GAME OVER</h2>
          <button id="reset">Restart</button>
        </div>
      </div>
    </div>
  );
}

export default App;
