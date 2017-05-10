(function () {
    'use strict';
    var bitmap
    var g_point_y=640;
    let updateCanvasDemo = function (y){
        var context=bitmap._context
        
        context.clearRect(0,0,1280,960);
        bitmap.drawCircle(100, y, 100, 'rgba(0,255,255,0.5)');
        //_setDirty()を呼ぶことで画像を更新できる模様？
        //drawCircleの中でも呼ばれているので複数回呼んで問題なさそう（重くはなりそう）
        //https://github.com/yamachan/jgss-hack/blob/master/memo.ja/201401-jgss134.md
        bitmap._setDirty();
        context.beginPath();
        context.moveTo(0,0);
        //context.lineTo(Graphics.boxWidth / 2, Graphics.boxHeight);
        context.lineTo(Graphics.boxWidth / 2, y);
        console.log(y)
        context.lineTo(Graphics.boxWidth, Graphics.boxHeight / 2);
        context.lineTo(0, 0);
        context.stroke();
    }
    var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function() {
		
        _Scene_Map_updateMain.call(this);
        if(Graphics.frameCount % 2 === 0){
            g_point_y-=1;
            updateCanvasDemo(g_point_y);
            //Spriteset_Map.createDrawSprite();
            //console.log(g_point_y)
        }
	};
    var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
    Spriteset_Base.prototype.createUpperLayer = function() {
        _Spriteset_Base_createUpperLayer.apply(this, arguments);
        if (this instanceof Spriteset_Map) {
            this.createDrawSprite();
        }
    };

    Spriteset_Map.prototype.createDrawSprite = function() {
        var sprite = new Sprite();
        sprite.bitmap = this.makeDrawBitmap();
        bitmap=sprite.bitmap;
        this.addChild(sprite);
    };

    Spriteset_Map.prototype.makeDrawBitmap = function() {
        bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        // 円を描きます。Bitmapクラスのメソッドはツクールのcore.jsで定義されています。
        bitmap.drawCircle(100, 100, 100, 'rgba(255,255,255,0.5)');
        // 線を描きます。こちらはHTML5のCanvasのメソッドを直接使用しています。
        var context = bitmap._context;
        context.beginPath();
        context.moveTo(0,0);
        //context.lineTo(Graphics.boxWidth / 2, Graphics.boxHeight);
        context.lineTo(Graphics.boxWidth / 2, g_point_y);
        console.log(g_point_y)
        context.lineTo(Graphics.boxWidth, Graphics.boxHeight / 2);
        context.lineTo(0, 0);
        context.stroke();
        return bitmap;
    };
})();