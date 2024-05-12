onload = function(){
    let canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 500;
    let engine = new MyEngine(canvas);
    engine.initialize();
    engine.run();
}