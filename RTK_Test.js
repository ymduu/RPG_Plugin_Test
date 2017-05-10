//=============================================================================
// RTK_Test.js	2016/07/30
// The MIT License (MIT)
//=============================================================================

/*:
 * @plugindesc テスト用プラグイン
 * @author Toshio Yamashita (yamachan)
 *
 * @help このプラグインにはプラグインコマンドはありません。
 * テスト用に作成したものなので、実際に利用する場合には適当にリネームしてください
 */

(function(_global) {
    // ここにプラグイン処理を記載
    var N = 'RTK_Test';
  	var param = PluginManager.parameters(N);
  	var show_id = Number(param['アクター名の後にIDを表示'])||1;

    var _Game_Actor_name = Game_Actor.prototype.name;
    Game_Actor.prototype.name = function() {
        var ret = _Game_Actor_name.call(this);
        if (show_id) {
          return ret + ":" + this.actorId();
        } else {
          return ret;          
        }
    };
})(this);