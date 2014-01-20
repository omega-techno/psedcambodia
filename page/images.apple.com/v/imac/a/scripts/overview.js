var HeroResize=AC.Class({initialize:function(b){this._height=null;this._hero=$(b);
AC.Object.synthesize(this);this.__boundResizeHero=this.resizeHero.bindAsEventListener(this);
if(typeof window.ontouchstart==="undefined"){this.resizeHero();Event.observe(window,"resize",this.__boundResizeHero)
}},resizeHero:function(){this._height=parseInt(window.innerHeight||(window.document.documentElement.clientHeight||window.document.body.clientHeight),10);
if(this._height>=740&&this._height<=1200){this.setHeight(this._height);this.hero().style.height=this.height()-80+"px"
}}});Event.onDOMReady(function(){var b=new HeroResize("hero")});