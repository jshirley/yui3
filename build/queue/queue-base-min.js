YUI.add("queue-base",function(B){function A(){var C=this instanceof A?this:new A();return C._init(arguments);}A.defaults={};A.prototype={_defaults:null,_tId:0,active:false,_init:function(D){D=B.Array(D,0,true);var C=D.shift();this._q=[];this._defaults=B.merge(A.defaults,{context:this},(B.Lang.isObject(C)?C:{}));this.publish("executeCallback",{defaultFn:this._defExecFn});return this.add.apply(this,D);},run:function(){var C=this._q[0];if(C&&this.isReady()){this._processCallback(C);}else{if(!C){this.active=false;this.fire("complete");}}return this;},isReady:function(){return !this._tId;},_processCallback:function(C){this.active=true;this._tId=-1;this._defExecFn(C);this._shift();this._tId=0;this.run();},_defExecFn:function(C){if(B.Lang.isFunction(C.fn)){C.fn.apply(C.context,B.Array(C.args));}},_shift:function(){this.fire("shiftCallback",this._q.shift());},add:function(){var F=B.Array(arguments,0,true),D,C,G,E=[];for(D=0,C=F.length;D<C;++D){G=this._prepareCallback(F[D]);if(B.Lang.isObject(G)){this._q.push(G);E.push(G);}}this.fire("addCallback",E);return this;},_prepareCallback:function(C){if(B.Lang.isFunction(C)){C={fn:C};}if(B.Lang.isObject(C)){C=B.merge(this._defaults,C);}return C;},pause:function(){clearTimeout(this._tId);this._tId=0;this.active=false;this.fire("pause");return this;},stop:function(){clearTimeout(this._tId);this._tId=0;this.active=false;this._q=[];this.fire("stop");return this;},size:function(){return this._q.length;},publish:function(){},fire:function(){}};B.Queue=A;},"@VERSION@");