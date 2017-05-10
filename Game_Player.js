//動きの更新を行う　ざっくりと削る
Game_Player.prototype.update = function(sceneActive) {
    if (sceneActive) {
        this.moveByInput();
    }
};
//入力方向の取得を4方向から8方向に増やす
Game_Player.prototype.getInputDirection = function() {
    return Input.dir8;
};
//進行方向のマスの確認などを行っていた部分をざっくり削る
Game_Player.prototype.moveByInput = function() {
    var direction = this.getInputDirection();
    if (direction > 0) {
        this.executeMove(direction);//moveSttaightを読んでるだけの関数
    }
};

Game_Player.prototype.xWithDirection = function(x, d) {
    if(d===4){
        return x+-1/10;
    }
    if(d===1 || d===7){
        return x+-1/14;
    }
    if(d===6){
        return x+1/10;
    }
    if(d===3 || d===9){
        return x+1/14;
    }
    return x;
};

Game_Player.prototype.yWithDirection = function(y, d) {
    if(d===8){
        return y+-1/10;
    }
    if(d===7 || d===9){
        return y+-1/14;
    }
    if(d===2){
        return y+1/10;
    }
    if(d===1 || d===3){
        return y+1/14;
    }
    return y;
};

Game_Player.prototype.moveStraight = function(d) {
    this._realX = this.xWithDirection(this._realX, d);
    this._realY = this.yWithDirection(this._realY, d);
    this._x = this._realX;
    this._y = this._realY;
    if(this._realX<0.2) this._realX=0.2;
    if(this._realX>11.8) this._realX=11.8;
    if(this._realY<0.2) this._realY=0.2;
    if(this._realY>11.8) this._realY=11.8;
    this.increaseSteps();
};

(function () {
var oldInitMember = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    oldInitMember.call(this);
    this._direction=8;
};
}());