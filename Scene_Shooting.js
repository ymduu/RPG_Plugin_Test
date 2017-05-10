//タイトルでニューゲームを選んだ時の処理
//Scene_MapではなくSceneShootingを呼ぶようにする
Scene_Title.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Shooting);
};

//SceneShootingに以下を追加
function Scene_Shooting() {
    this.initialize.apply(this, arguments);
}
Scene_Shooting.prototype = Object.create(Scene_Map.prototype);
Scene_Shooting.prototype.constructor = Scene_Shooting;

Scene_Shooting.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if (this._transfer) {
        this.fadeInForTransfer();
        $gameMap.autoplay();
    } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
    }
    this.menuCalling = false;
};

 Scene_Shooting.prototype.update = function() {
    this.updateMainMultiply();
    if (this.isSceneChangeOk()) {
        this.updateScene();
    }
    Scene_Base.prototype.update.call(this);
};

Scene_Shooting.prototype.updateScene = function() {
    this.checkGameover();
    if (!SceneManager.isSceneChanging()) {
        this.updateTransferPlayer();
    }
    if (!SceneManager.isSceneChanging()) {
        this.updateCallDebug();
    }
};

Scene_Shooting.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    //this._sideWindow = new Window_SideMenu(620,0);
    //this.addChild(this._sideWindow);
};

function Window_SideMenu() {
    this.initialize.apply(this, arguments);
}
Window_SideMenu.prototype = Object.create(Window_Base.prototype);
Window_SideMenu.prototype.constructor = Window_SideMenu;

Window_SideMenu.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y,width,height);
    this._message = new Array();
    this.loadImages();
    this.refresh();
    this.activate();
};
Window_SideMenu.prototype.windowWidth = function() {
    return Graphics.boxWidth-620;           //boxWidth:ウィンドウサイズ
};
Window_SideMenu.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};
Window_SideMenu.prototype.loadImages = function() {
};

Window_SideMenu.prototype.refresh = function() {
    this.contents.clear();
    this.drawText("てすと",0,0,Graphics.boxWidth);
};