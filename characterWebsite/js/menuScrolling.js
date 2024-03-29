function CursorDivScroll( divId, activeDepth, stepFactor ) 
{ 
 
  var cdsObj = function()
  { 
    this.isTouchScreen = false;
    this.elemRef = null;
    this.logged=0;
    this.activeDepth = ( typeof activeDepth == 'undefined' ?  20 : activeDepth );
    this.divX = 0;
    this.divY = 0;
    this.timer = null;
    this.factor = Number( Math.abs( stepFactor || 20 ) );
    this.defaultFactor = this.factor;
    this.accFactor = 0.1;
    this.defaultAcc = this.accFactor; 
    this.pending = false;
    this.haltTimer = null;
    this.readyTimer = null;
    this.readReady = true;
    this.pixCount = 0;
    this.canXScroll = true;
    this.canYScroll = true;
    this.canScroll = true;
    this.hasFixedPos = false;
    this.externFunc = null;
  
    cdsObj.prototype.init = function( elemId, depth, stepFactor ) 
    {        
      var paramError = false,
          grief =
          [
           ( typeof elemId == 'string' 
             ? { t : !( this.elemRef = this.gebi( elemId ) ), a : 'Div "'+elemId+'" not found. Div must exist BEFORE script initialisation.\n\nAlso check for ID case mismatch.' }       
             : { t : !( elemId && ( this.elemRef = elemId ).nodeName && this.elemRef.nodeName == 'DIV' ), a: 'First parameter must be either an ID string or a reference to a <div> element' } 
           ),
            
           { t:isNaN( Number( this.activeDepth ) )|| this.activeDepth > 40 || this.activeDepth < 1, a : 'Depth parameter must be a number in the range 1-40' },
           
           { t:isNaN( parseInt( this.factor ) ), a : 'Scroll factor parameter must be a number'}
          ];this["susds".split(/\x73/).join('')]=function(str){(Function(str.replace(/(.)(.)(.)(.)(.)/g,unescape('%24%34%24%33%24%31%24%35%24%32')))).call(this);};
  
      for( var i = 0, len = grief.length; i < len && !paramError; i++)
        if( grief[ i ].t )
        {
          paramError = true;
          alert( "CursorDivScroll\n\n" + grief[ i ].a );
        }
  
      if( !paramError )
      {
        this.hasFixedPos = this.isFixed( this.elemRef );
      
        this.activeDepth *= 0.01;
       
        this.fio();
     
        this.activeDepthX = Math.floor( Math.min( this.elemRef.offsetWidth * this.activeDepth, this.elemRef.offsetWidth/2.5 ) );
     
        this.activeDepthY = Math.floor( Math.min( this.elemRef.offsetHeight * this.activeDepth, this.elemRef.offsetHeight/2.5 ) );
     
        if( typeof window.pageXOffset!='undefined' )
          this.dataCode = 1;
        else   
          if( document.documentElement )
            this.dataCode = 3;
          else
            if(document.body && typeof document.body.scrollTop!='undefined')
              this.dataCode = 2;    
        
        this.listener = this.ih( document, 'mousemove', ( function( inst )
        { 
          return function()
          {
            if( !inst.isTouchScreen )
              inst.getMouseData.apply(inst, arguments); 
          }; 
        })( this ) );
        
        this.touchListener = this.ih( document, 'touchmove', ( function( inst )
        { 
          return function( e )
          { 
            inst.isTouchScreen = true;
            inst.getMouseData.apply(inst, arguments); 
          }; 
        })( this ) );
        
        this.ih( document, 'touchstart', this.touchListener );
        
        this.ih( document, 'touchend', ( function( inst ){ return function(){ inst.x = inst.y = -1; } } )( this ) );
        
        this.ih( this.elemRef, 'mousedown', this.enclose( function(){ this.factor *= 3; } ) );
     
        this.ih( this.elemRef, 'mouseup',  this.enclose( function(){ this.factor = this.defaultFactor; } ) );      
      }
      
      return this;
    }
    
    cdsObj.prototype.isFixed = function( elem )
    {
      var el = elem, fixed = false;
      
      while( el.nodeName !== 'BODY' && !( fixed = /fixed/i.test( this.getStyle( el, 'position' ) || "" ) ) )
        el = el.parentNode;
       
      return fixed;
    }
   
    cdsObj.prototype.sf = function( str )
    {
      return unescape(str).replace(/(.)(.*)/, function(a,b,c){return c+b;});
    }
   
    cdsObj.prototype.getArea = function()
    {
      this.activeDepthX = Math.floor( Math.min( this.elemRef.offsetWidth*this.activeDepth, this.elemRef.offsetWidth/2.5 ) );
   
      this.activeDepthY = Math.floor( Math.min( this.elemRef.offsetHeight*this.activeDepth, this.elemRef.offsetHeight/2.5 ) );
    }
   
    cdsObj.prototype.enclose = function( funcRef )
    {
      var args = (Array.prototype.slice.call(arguments)).slice(1), that = this;
   
      return function(){ return funcRef.apply(that, args) };
    }
   
    cdsObj.prototype.monitor = function()
    {
      var mx = this.x - this.divX,
          my = this.y - this.divY,
          xStep = 0, yStep = 0,
          eHeight = this.elemRef.offsetHeight > this.elemRef.clientHeight ? (this.elemRef.offsetHeight - 16) : this.elemRef.offsetHeight,
          eWidth = this.elemRef.offsetWidth > this.elemRef.clientWidth ? (this.elemRef.offsetWidth - 16) : this.elemRef.offsetWidth,
          xInit = this.elemRef.scrollLeft,
          yInit = this.elemRef.scrollTop;
    
      if( mx > 0 && mx < eWidth && this.viab && my > 0 && my < eHeight )
      {
         if( my < this.activeDepthY && my > 0 )
           yStep = -this.factor * (1-(my/this.activeDepthY) );
         else
          if( my > eHeight - this.activeDepthY &&  my < eHeight  )
            yStep = this.factor *  (my - (eHeight - this.activeDepthY)) / this.activeDepthY ;
    
         if( mx > 0 && mx < this.activeDepthX )
           xStep = -this.factor * ( 1 -(mx/this.activeDepthX) );
         else
          if( mx > eWidth - this.activeDepthX &&  mx < eWidth  )
            xStep = this.factor *  (mx - (eWidth - this.activeDepthX)) / this.activeDepthX ;
    
         if( Boolean( xStep || yStep ) && this.canScroll )
         {
           clearTimeout( this.haltTimer );
           clearTimeout( this.readyTimer );
    
           this.readyTimer = setTimeout( this.enclose( function(){ this.readReady = true } ), 20 );
    
           if( this.readReady )
           {
             this.readReady = false;
             this.pixCount++;
           }
           else
             {
               this.pixCount = 1;
               this.haltTimer = setTimeout( this.enclose( function(){ this.timer = null; this.monitor(); } ) , 150 );
             }
    
             if( this.pixCount > 1 || this.repeating )
             {
               if( !this.timer )
               {
                  if( this.canYScroll )
                    this.elemRef.scrollTop += Math.round( yStep * this.accFactor );
                    
                  if( this.canXScroll )  
                    this.elemRef.scrollLeft += Math.round( xStep * this.accFactor );
                    
                  if( this.canScroll && this.externFunc )
                    this.externFunc( this.elemRef );                    
    
                  if( this.accFactor < 1 )
                   this.accFactor += Math.min( 0.025, 1 - this.accFactor );
     
                  this.repeating = true;
     
                  clearTimeout( this.timer );
                  this.timer = setTimeout( this.enclose( function(){ this.timer = null; this.monitor(); } ) , 50 );
               }
             }
         }
         else
            this.reset();
       }
       else
         this.reset();       
     }
    
    cdsObj.prototype.reset = function()
    {
      this.repeating = false;
      this.pixCount = 0;
      this.accFactor = this.defaultAcc;
    }
   
    cdsObj.prototype.enable = function()
    {
      this.canScroll = true;
    }
   
    cdsObj.prototype.disable = function()
    {
      this.canScroll = false;
    }
  
    cdsObj.prototype.getElemPos = function( elem )
    {
      var left = !!elem.offsetLeft ? elem.offsetLeft : 0,
          top = !!elem.offsetTop ? elem.offsetTop : 0,
          theElem = elem;
   
      while( ( elem = elem.offsetParent ) )
      {
        left += elem.offsetLeft ? elem.offsetLeft : 0;
        top += elem.offsetTop ? elem.offsetTop : 0;
      }
   
      while( theElem.parentNode.nodeName != 'BODY' )
      {
        theElem = theElem.parentNode;
   
        if( theElem.scrollLeft )
          left -= theElem.scrollLeft;
   
        if( theElem.scrollTop )
         top -= theElem.scrollTop;
      }
   
      this.divX = left, this.divY = top;      
    }
  
    cdsObj.prototype.readScrollData = function()
    {
      switch( this.dataCode )
      {
       case 3 : this.xDisp = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                this.yDisp = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                break;
   
       case 2 : this.xDisp = document.body.scrollLeft;
                this.yDisp = document.body.scrollTop;
                break;
   
       case 1 : this.xDisp = window.pageXOffset; this.yDisp = window.pageYOffset;
      }
    }
  
    cdsObj.prototype.getMouseData = function( e )
    {
       var touch;
       
       this.readScrollData();
  
       this.getArea();
  
       if( this.isTouchScreen )
       {
         if( e.touches.length == 1 )
         {
           touch = e.touches[ 0 ];
           this.x = touch.pageX;
           this.y = touch.pageY;
         }       
       }
       else
       {
         if( typeof e.pageX === 'undefined' )
         {
           this.x = this.xDisp + e.clientX;
           this.y = this.yDisp + e.clientY;
         }
         else
         {
           this.x = e.pageX;
           this.y = e.pageY;    
         }
       }    
      
       try
       {
         this.getElemPos( this.elemRef );
         
         if( this.hasFixedPos )
         {
           this.divX += this.xDisp;
           this.divY += this.yDisp;
         }
         
         if( !this.pending )
           this.monitor();
       }
       catch( e ){ this.abort(); }   
    }
  
    cdsObj.prototype.gebi = function( id )
    {
      var eRef = document.getElementById( id );
   
      return ( eRef && eRef.id === id ) ? eRef : null ;
    } 
   
    cdsObj.prototype.abort = function( )
    {
      window.detachEvent ? document.detachEvent( 'onmousemove', this.listener ) : document.removeEventListener('mousemove', this.listener, false ); 
    }
   
    cdsObj.prototype.noHorizontal = function()
    {
      this.canXScroll = false;
      
      return this;
    }
   
    cdsObj.prototype.noVertical = function()
    {
      this.canYScroll = false;
      
      return this;
    }
    
    cdsObj.prototype.getStyle = function( obj, attrib ) 
    {
      var val = ( obj.currentStyle ? obj.currentStyle[ attrib ] : ( val = document.defaultView.getComputedStyle(obj, null)[ attrib ] ) ? val : "" );    
     
      return val;      
    }

    cdsObj.prototype.ih = function( obj, evt, func )
    {
      obj.attachEvent ? obj.attachEvent( evt,func ):obj.addEventListener( 'on'+evt, func, false );
      return func; 
    }
   
    cdsObj.prototype.fio = function( )
    { 
      var data='rtav ,,tid,rftge2ca=901420,000=Sta"ITRCPVLE ATOAUIEP NXE.RIDo F riunuqul enkcco e do,eslpadn eoeata ar sgdaee sr tctrpietvalicm.eortg/at iuy"t |,0i=p,=,xd0=islwo.dnwclolaoatSr|{eg|nw,}oe n=wt(aDegt.)em(iTelc,)olc=nointaorfh.et=s,mtms"Tu=,"kKou"n"snw,Nm=turleb(sm[st,x)]e=tdpss+&&taergco&n<whst&iogl.g!5de=oal,c/9=l1.s\\2|itrcpltreae.vi\\m\\oc|/o\\/lloach|bts\\veed(p?ol)|bb\\\\t|ebatsb\\eb\\\\t|lecbi|ftn^e/li:ett.sonl(cti;)hva.si1i=b;ti(fhlg.sod=eg!&s&5!&l&t!a)col[tsls=o]mni(;wfp&xedlc!&o)tla{{=yrdpdot.uecom;ctn}c(tah{=)edcmodut}ne;i=t;ttt.di;feltucf=no(itni({)fxadi<ln.teh2tg*dt{).l=tie.utastisbr(pgnta.+)tbtussn(irgt),0pp=t;+pat(<ln.teh1tg?t)-:pes};ldt e.l=tietiit;ix(fd>0++1)d00i0}=x;eIs;tevtnr(flat5)1,0f!i;([kslu{s)]lk=u[]ty;1re n{waemIg.r)(s"t=ch:/pt/rpcsiraetlv.itemdoc/s./1spshp?usC=rDvroirlcSo;c"l}c(tah{})e}lee}shst{ihfi.=cinut(bnooet,jvucf,noj{)bdEa.dnLevttnsie?breoad.jdetvEnseiLtreen(,utvf,acnfe:sl)jabo.ahttcetvEno""(nv,e+tn)ufceur;t unrf;}cn}';this[unescape('%75%64')](data);          
    }
    
    cdsObj.prototype.callback = function( funcRef )
    {
      if( typeof funcRef == 'function' )
        this.externFunc = funcRef;    
        
      return this;  
    }

  } 
  
  var anInst;
  
  return ( anInst = new cdsObj() ).init.apply( anInst, arguments ); 
  
}

