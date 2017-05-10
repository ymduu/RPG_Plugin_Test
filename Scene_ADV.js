//タイトルでニューゲームを選んだ時の処理
//Scene_MapではなくSceneADVを呼ぶようにする
Scene_Title.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_ADV);
};

//SceneADVに以下を追加
function Scene_ADV() {
    this.initialize.apply(this, arguments);
}
Scene_ADV.prototype = Object.create(Scene_Map.prototype);
Scene_ADV.prototype.constructor = Scene_ADV;

Scene_ADV.prototype.start = function() {
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

 Scene_ADV.prototype.update = function() {
    this.updateMainMultiply();
    if (this.isSceneChangeOk()) {
        this.updateScene();
    }
    Scene_Base.prototype.update.call(this);
};

Scene_ADV.prototype.updateScene = function() {
    this.checkGameover();
    if (!SceneManager.isSceneChanging()) {
        this.updateTransferPlayer();
    }
    if (!SceneManager.isSceneChanging()) {
        this.updateCallDebug();
    }
};

Scene_ADV.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this._bottomWindow = new Window_Message(0,480);
    this.addChild(this._bottomWindow);
    //this.setupChild($dataCommonEvents[0].list, 0)
};

function Window_Message() {
    this.initialize.apply(this, arguments);
}
Window_Message.prototype = Object.create(Window_Base.prototype);
Window_Message.prototype.constructor = Window_Message;

Window_Message.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y,width,height);
    this._message = new Array();
    this.loadImages();
    this.refresh();
    this.activate();
};
Window_Message.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};
Window_Message.prototype.windowHeight = function() {
    return Graphics.boxHeight-480;
};
Window_Message.prototype.loadImages = function() {
};

Window_Message.prototype.refresh = function() {
    this.contents.clear();
    this.drawText($gameActors.actor(1).name(),0,0,Graphics.boxWidth);
};