!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){t.exports=i.p+"chart_data.txt"},function(t,e,i){"use strict";i.r(e);var s=class{constructor(t,e){this._element=t,this._data=e}getData(){return this._data}getHTMLElement(){return this._element}},n=function(t){const e=document.createElement("canvas");return e.style.cssText="width: 100%; height: 100%; position: absolute; top: 0; left: 0",t.append(e),e};class o extends s{constructor(t,e,i,s){super(t,e),this.key=i,this._color=s,this.displayed=!0,this._togglingAnimationInProcess=!1,this.min=Math.min(...e),this.max=Math.max(...e),this.getHTMLElement().width=this.getHTMLElement().offsetWidth*w.QUALITY_MODIFIER,this.getHTMLElement().height=this.getHTMLElement().offsetHeight*w.QUALITY_MODIFIER}drawChart(t,e,i=1){this._lastMin=t,this._lastMax=e;const s=this.getHTMLElement().getContext("2d"),n=this.getHTMLElement().height,o=this.getHTMLElement().width,r=this.getData();let a=e-t;e+=Math.abs(a*w.PREVIEW_PADDING_MODIFIER),t-=Math.abs(a*w.PREVIEW_PADDING_MODIFIER),a=e-t,s.beginPath(),s.resetTransform(),s.transform(1,0,0,-1,0,n),s.globalAlpha=i,s.lineWidth=1*w.QUALITY_MODIFIER,s.lineJoin="round",s.strokeStyle=this._color,s.clearRect(0,0,o,n),r.forEach((e,i,r)=>{const h=(e-t)/a*n,l=i/(r.length-1)*o;i||s.moveTo(l,h),s.lineTo(l,h)}),s.stroke()}toggleLine(t,e=this._lastMin,i=this._lastMax){this.displayed=t,this._togglingAnimationInProcess||this._runToggleAnimation(e,i)}_runToggleAnimation(t,e){this._togglingAnimationInProcess=!0;const i=this.displayed?1:10,s=(n=i)=>{const o=n/10;this.drawChart(t,e,o),requestAnimationFrame(()=>{this._togglingAnimationInProcess&&(this.displayed&&n<10?s(++n):!this.displayed&&n>0?s(--n):this._togglingAnimationInProcess=!1)})};s()}changeLimits(t,e){this._changeLimitsAnimation&&cancelAnimationFrame(this._changeLimitsAnimation),this._runChangeLimitsAnimation(t,e)}_runChangeLimitsAnimation(t,e){const i=t-this._lastMin,s=e-this._lastMax,n=(o=1)=>{const r=o/15,a=t-i*(1-r),h=e-s*(1-r);this.drawChart(a,h),this._changeLimitsAnimation=requestAnimationFrame(()=>{o<15&&n(++o)})};n()}}class r extends s{constructor(t,e,i,s,n){super(t,s),this._parentGraph=n,this._chartLayer=e,this._controlLayer=i,this.PADDING_MODIFIER=.3,this.controlPosition={start:.5,end:.7},this._controlFrameVerticalBorderWidth=.012,this._controlFrameHorizontalBorderWidth=.05,this._minFrameWidth=.1,this._chartLines=[],this._initCharts(),this.redraw(),this._controlLayer.addEventListener("mousedown",this._mouseDown.bind(this)),this._controlLayer.addEventListener("touchstart",this._touchStart.bind(this)),document.addEventListener("mouseup",this._mouseReleasedOverDocument.bind(this)),document.addEventListener("mousemove",this._mouseMoveOverDocument.bind(this)),document.addEventListener("touchmove",t=>this._mouseMoveOverDocument(t.touches[0])),document.addEventListener("contextmenu",t=>{(this._frameStickedToMouse||this._leftBorderStickedToMouse||this._rightBorderStickedToMouse)&&(t.preventDefault(),t.stopPropagation(),this.touched||this._mouseReleasedOverDocument())}),document.addEventListener("touchend",this._mouseReleasedOverDocument.bind(this))}_initCharts(){const t=this.getData();this._chartLines=t.columns.filter(e=>"line"===t.types[e[0]]).map(e=>{const i=e[0],s=e.slice(1),r=t.colors[i],a=n(this._chartLayer);return new o(a,s,i,r)});const e=Math.min(...this._chartLines.map(t=>t.min)),i=Math.max(...this._chartLines.map(t=>t.max));this._chartLines.forEach(t=>t.drawChart(e,i))}redraw(){this._defineSize(),this._drawControl(),this.onControlChange&&this.onControlChange()}_defineSize(){this._chartLayer.width=this._chartLayer.offsetWidth*w.QUALITY_MODIFIER,this._chartLayer.height=this._chartLayer.offsetHeight*w.QUALITY_MODIFIER,this._controlLayer.height=this._controlLayer.offsetHeight*w.QUALITY_MODIFIER,this._controlLayer.width=this._controlLayer.offsetWidth*w.QUALITY_MODIFIER}_drawControl(){const t=this._controlLayer.getContext("2d"),e=this._controlLayer.height,i=this._controlLayer.width;t.clearRect(0,0,i,e),t.fillStyle=w.colors.previewChart.overlay,t.fillRect(0,0,i,e);const s=this.controlPosition.start*i,n=this.controlPosition.end*i-s;t.fillStyle=w.colors.previewChart.activeFrame,t.clearRect(s,0,n,e),t.fillRect(s,0,n,e),t.clearRect(s+i*this._controlFrameVerticalBorderWidth,e*this._controlFrameHorizontalBorderWidth,n-i*this._controlFrameVerticalBorderWidth*2,e*(1-2*this._controlFrameHorizontalBorderWidth))}_moveControlPosition(t){const{start:e,end:i}=this.controlPosition,s=i-e,n=Math.max(Math.min(t,1-s/2),s/2);this.controlPosition={start:Math.max(n-s/2),end:Math.max(n+s/2)},this._drawControl(),this.onControlChange&&this.onControlChange()}_moveLeftBorder(t){const{end:e}=this.controlPosition,i=Math.max(Math.min(t,e-this._minFrameWidth),0);this.controlPosition.start=i,this._drawControl(),this.onControlChange&&this.onControlChange()}_moveRightBorder(t){const{start:e}=this.controlPosition,i=Math.max(Math.min(t,1),e+this._minFrameWidth);this.controlPosition.end=i,this._drawControl(),this.onControlChange&&this.onControlChange()}_touchStart(t){const e=t.touches[0].clientX-this._controlLayer.getBoundingClientRect().left;this._touched=!0,this._mouseDown({offsetX:e}),t.cancelable&&t.preventDefault()}_mouseDown({offsetX:t}){const e=t*w.QUALITY_MODIFIER/this._controlLayer.width,{start:i,end:s}=this.controlPosition,n=s-i,o=i,r=i+this._controlFrameVerticalBorderWidth,a=s-this._controlFrameVerticalBorderWidth,h=s;let l=0,c=0;this._touched&&(l=6*this._controlFrameVerticalBorderWidth,c=.2*n),e<=r+c&&e>=o-l?(this._leftBorderStickedToMouse=!0,this._stickOffset=e-o):e<=h+l&&e>=a-c?(this._rightBorderStickedToMouse=!0,this._stickOffset=e-h):(this._frameStickedToMouse=!0,e>=this.controlPosition.start&&e<=this.controlPosition.end?this._stickOffset=e-(s+i)/2:(this._stickOffset=0,e>0&&e<1&&this._moveControlPosition(e)))}_mouseReleasedOverDocument(){this._frameStickedToMouse=!1,this._leftBorderStickedToMouse=!1,this._rightBorderStickedToMouse=!1,this.stickOffset=0,this._touched=!1}_mouseMoveOverDocument(t){if(this._frameStickedToMouse||this._leftBorderStickedToMouse||this._rightBorderStickedToMouse){const e=(t.clientX-this._controlLayer.getBoundingClientRect().left)*w.QUALITY_MODIFIER/this._controlLayer.width-this._stickOffset;this._frameStickedToMouse?this._moveControlPosition(e):this._leftBorderStickedToMouse?this._moveLeftBorder(e):this._rightBorderStickedToMouse&&this._moveRightBorder(e)}}toggleLine(t,e){const i=this._chartLines.filter(i=>i.key!==t&&i.displayed||i.key===t&&e),s=Math.min(...i.map(t=>t.min)),n=Math.max(...i.map(t=>t.max)),o=this._chartLines.find(e=>e.key===t);e?o.toggleLine(e,s,n):o.toggleLine(e),this._chartLines.filter(e=>e.key!==t&&e.displayed).forEach(t=>t.changeLimits(s,n))}redrawColor(){this._drawControl()}}var a=function(t){const e=document.createElement("div"),i=document.createElement("div"),s=document.createElement("canvas");return t.append(e),e.append(i,s),e.style.cssText="width: 100%; height: 50px; position: relative",i.style.cssText="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1",s.style.cssText="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 2",{previewContainer:e,chartLayer:i,controlLayer:s}},h=function(t){const e=document.createElement("div");return e.style.cssText="margin-top: 15px",t.append(e),e},l=function(t,e){const i=document.createElement("div");i.style.cssText=`\n\t\tpadding: 10px;\n\t\tuser-select: none; \n\t\t-webkit-user-select: none; \n\t\t-webkit-mask-image: -webkit-radial-gradient(white, black);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\theight: 45px;\n\t\tpadding: 10px 15px 10px 50px; \n\t\tborder-radius: 22.5px; \n\t\tposition: relative; \n\t\tdisplay: inline-flex; \n\t\talign-items: center;\n\t\tbox-sizing: border-box; \n\t\tmargin-right: 15px;\n\t\tcolor: ${w.colors.lineToggler.textColor}; \n\t\tfont-family: sans-serif; \n\t\toverflow: hidden; \n\t\tfont-weight: 400;\n\t\t-webkit-box-shadow: inset 0px 0px 0px 1px ${w.colors.lineToggler.borderColor};`,i.innerText=e;const s=document.createElement("canvas"),n=document.createElement("canvas");return s.style.cssText="height: 100%; width: 100%; top: 0; left: 0; position: absolute",n.style.cssText="height: 100%; width: 100%; top: 0; left: 0; position: absolute",t.append(i),i.append(n),i.append(s),{htmlContainer:i,canvasLayer:s,effectCanvasLayer:n}},c=function(t){const e=document.createElement("div");e.style.cssText="width: 100%; height: 360px; position: relative; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;",t.append(e);const i=document.createElement("canvas");i.style.cssText="width: 100%; height: 10%; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;";const s=document.createElement("canvas");s.style.cssText="width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 1; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;";const n=document.createElement("div");n.style.cssText="width: 100%; height: 90%; position: relative; z-index: 2; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;";const o=document.createElement("canvas");o.style.cssText="width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 3; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;";const r=document.createElement("div");r.style.cssText="width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 4; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;";const a=document.createElement("div");return a.style.cssText="width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 5; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;",e.append(s),e.append(n),e.append(i),e.append(o),e.append(r),e.append(a),{xAxisLayer:i,yAxisLayer:s,linesContainer:n,selectorLayer:o,selectorDescriptionLayer:r,selectorDetectionLayer:a}};class d extends s{constructor(t,e,i,s,n){super(t,i),this._canvasLayer=e,this._effectCanvasLayer=s,this._toggled=!0,this._animationInProgress=!1,this._parentGraph=n,this._canvasLayer.height=this._canvasLayer.offsetHeight*w.QUALITY_MODIFIER,this._canvasLayer.width=this._canvasLayer.offsetWidth*w.QUALITY_MODIFIER,this._effectCanvasLayer.height=this._effectCanvasLayer.offsetHeight*w.QUALITY_MODIFIER,this._effectCanvasLayer.width=this._effectCanvasLayer.offsetWidth*w.QUALITY_MODIFIER,this._drawCheckBox(1),this.getHTMLElement().addEventListener("mousedown",this._toggleClick.bind(this))}_drawCheckBox(t){const e=this._canvasLayer.getContext("2d"),i=this.getData(),s=this._canvasLayer.height,n=this._canvasLayer.width,o=10*w.QUALITY_MODIFIER,r=s/2-o,a=r+o,h=s/2;e.clearRect(0,0,s,n),this._drawCheckBoxCircle(e,a,h,i.color,r,t),this._drawCheckBoxIcon(e,a,h,t)}_drawCheckBoxIcon(t,e,i,s){if(!s)return;const n=2*w.QUALITY_MODIFIER*s,o=e-.5*n,r=i+2*n;t.beginPath(),t.strokeStyle="white",t.lineJoin="round",t.lineCap="round",t.lineWidth=2*w.QUALITY_MODIFIER,t.moveTo(o-1.5*n*s,r-2*n*s),t.lineTo(o,r),t.lineTo(o+3*n*s,r-3.5*n*s),t.stroke()}_drawCheckBoxCircle(t,e,i,s,n,o){const r=.8*n;t.fillStyle=s,t.beginPath(),t.arc(e,i,n,0,2*Math.PI*2),t.fill(),t.beginPath(),t.fillStyle=w.colors.appWrapper.backgroundColor,t.arc(e,i,r*(1-o),0,2*Math.PI*2),t.fill()}_toggleClick(){const t=this._parentGraph.getTogglersList().filter(t=>t.isToggled()).length;this._drawRipple(),t<2&&this._toggled||(this._toggled=!this._toggled,this._animationInProgress||this._runAnimation(),this._parentGraph.chartToggled(this._data.key,this._toggled))}_drawRipple(){const t=this._effectCanvasLayer.getContext("2d"),e=this._effectCanvasLayer.height,i=this._effectCanvasLayer.width,s=6*w.QUALITY_MODIFIER;let n=e/2-s;const o=n+s,r=e/2;t.fillStyle=w.colors.lineToggler.rippleColor;const a=(s=1)=>{const h=s/20;t.clearRect(0,0,i,e),t.globalAlpha=.1*(1-h),t.beginPath(),t.fillStyle=w.colors.lineToggler.rippleColor,t.arc(o,r,n*(1+6*h),0,2*Math.PI*2),t.fill(),requestAnimationFrame(()=>{s<=20?a(++s):t.clearRect(0,0,i,e)})};a()}_runAnimation(){let t=this._toggled?1:10;const e=(i=t)=>{const s=i/10;this._drawCheckBox(s),requestAnimationFrame(()=>{!this._toggled&&i>0?e(--i):this._toggled&&i<10&&e(++i)})};e(),this._animationInProgress=!1}isToggled(){return this._toggled}redrawColor(){this.getHTMLElement().style.color=w.colors.lineToggler.textColor,this.getHTMLElement().style.webkitBoxShadow=`inset 0px 0px 0px 1px ${w.colors.lineToggler.borderColor}`,this._drawCheckBox(Number(this._toggled))}}class _ extends s{constructor(t,e,i,s,n){super(t,e),this.key=i,this.enabled=!0,this._color=s,this._mainGraph=n,this._lastOpacity=1,this.getHTMLElement().width=this.getHTMLElement().offsetWidth*w.QUALITY_MODIFIER,this.getHTMLElement().height=this.getHTMLElement().offsetHeight*w.QUALITY_MODIFIER}getLimits(t,e){const i=this.getData(),s=1/(i.length-1),n=Math.max(Math.round((t-t%s)/s),0),o=Math.min(Math.round((e-e%s+s)/s),i.length-1);let r=i[n],a=i[n];for(let t=n+1;t<=o;t++)r=r>i[t]?i[t]:r,a=a<i[t]?i[t]:a;return{min:r,max:a}}drawChart(t,e,i,s,n){this._lastMin=t,this._lastMax=e,this._lastStart=s,this._lastEnd=n,this._lastOpacity=i;const o=this.getHTMLElement().getContext("2d"),r=this.getHTMLElement().height,a=this.getHTMLElement().width,h=this.getData(),l=1/(h.length-1),c=s-s%l,d=n-n%l+2*l;t=Math.max(t-Math.abs((e-t)*w.MAIN_PADDING_MODIFIER),0);let _=(e+=Math.abs((e-t)*w.MAIN_PADDING_MODIFIER))-t;o.beginPath(),o.resetTransform(),o.transform(1,0,0,-1,0,r),o.globalAlpha=i,o.lineWidth=2*w.QUALITY_MODIFIER,o.lineJoin="round",o.strokeStyle=this._color,o.clearRect(0,0,a,r);for(let e=c;e<=d;e+=l){const i=(h[Math.round(e/l)]-t)/_*r,d=(e-s)/(n-s)*a;e===c&&o.moveTo(d,i),o.lineTo(d,i)}o.stroke()}redraw(){this._runAnimation()}updateLimits(t,e){this._newMin=t,this._newMax=e}updatePosition(t,e){this._lastStart=t,this._lastEnd=e,this._animationLink||this.drawChart(this._lastMin,this._lastMax,this._lastOpacity,t,e)}hideLine(){this._newOpacity=0,this.enabled=!1}showLine(){this._newOpacity=1,this.enabled=!0}_runAnimation(){this._newMax=isNaN(this._newMax)?this._lastMax:this._newMax,this._newMin=isNaN(this._newMin)?this._lastMin:this._newMin,this._newOpacity=isNaN(this._newOpacity)?this._lastOpacity:this._newOpacity,this._animationLink&&cancelAnimationFrame(this._animationLink),this._animationInProgress=!0;const t=this._newMin-this._lastMin,e=this._newMax-this._lastMax,i=this._newOpacity-this._lastOpacity,s=(n=1)=>{const o=1-n/10,r=this._newMin-t*o,a=this._newMax-e*o,h=this._newOpacity-i*o;this.drawChart(r,a,h,this._lastStart,this._lastEnd),this._animationLink=requestAnimationFrame(()=>{n<10?s(++n):this._animationLink=null})};s()}getValueByIndex(t){let[e,i]=[this._lastMin,this._lastMax];const s=this.getData()[t];return e=Math.max(e-Math.abs((i-e)*w.MAIN_PADDING_MODIFIER),0),i+=Math.abs((i-e)*w.MAIN_PADDING_MODIFIER),{key:this.key,value:s,layerPosition:(s-e)/(i-e)}}}class g extends s{constructor(t,e,i){super(t,e),this._mainGraph=i,this._firstDraw=!0,this._initCharts()}_initCharts(){const t=this.getData();this._chartLines=t.columns.filter(e=>"line"===t.types[e[0]]).map(e=>{const i=e[0],s=e.slice(1),o=t.colors[i],r=n(this.getHTMLElement());return new _(r,s,i,o,this._mainGraph)})}_initDraw(){const{start:t,end:e}=this._mainGraph.getControlPostion();this._prevStart=t,this._prevEnd=e,this._prevMin=Math.min(...this._chartLines.map(i=>i.getLimits(t,e).min)),this._prevMax=Math.max(...this._chartLines.map(i=>i.getLimits(t,e).max)),this._chartLines.forEach(i=>i.drawChart(this._prevMin,this._prevMax,1,t,e)),this.limitsUpdated&&this.limitsUpdated(this._prevMin,this._prevMax)}frameChanged(){if(this._firstDraw)return this._firstDraw=!1,void this._initDraw();const{start:t,end:e}=this._mainGraph.getControlPostion();this._chartLines.forEach(i=>i.updatePosition(t,e));const i=this._chartLines.filter(t=>t.enabled),s=Math.min(...i.map(i=>i.getLimits(t,e).min)),n=Math.max(...i.map(i=>i.getLimits(t,e).max));s===this._prevMin&&n===this._prevMax||(this._changeLimitTimeout&&clearTimeout(this._changeLimitTimeout),this._prevMin=s,this._prevMax=n,this._changeLimitTimeout=setTimeout(()=>{this._chartLines.forEach(t=>{t.updateLimits(this._prevMin,this._prevMax),t.redraw()}),this.limitsUpdated&&this.limitsUpdated(this._prevMin,this._prevMax)},50))}toggleLine(t,e){const{start:i,end:s}=this._mainGraph.getControlPostion(),n=this._chartLines.find(e=>e.key===t);e?n.showLine():n.hideLine();const o=this._chartLines.filter(t=>t.enabled);this._prevMin=Math.min(...o.map(t=>t.getLimits(i,s).min)),this._prevMax=Math.max(...o.map(t=>t.getLimits(i,s).max)),this._chartLines.forEach(t=>{t.updateLimits(this._prevMin,this._prevMax),t.redraw(),this.limitsUpdated&&this.limitsUpdated(this._prevMin,this._prevMax)})}getActiveLineValuesByIndex(t){return this._chartLines.filter(t=>t.enabled).map(e=>e.getValueByIndex(t))}}class p extends s{constructor(t,e,i=new f){super(t,e),this._parentGraph=i,this._setSizings(),this._precisionDenominator=Math.log(2),this._precisionBarier=Math.log(4/3)/this._precisionDenominator,this._textMap={}}_setSizings(){const t=this.getHTMLElement();t.height=t.offsetHeight*w.QUALITY_MODIFIER,t.width=t.offsetWidth*w.QUALITY_MODIFIER}updateControlPosition(){const t=this.getHTMLElement().getContext("2d"),{width:e,height:i}=this.getHTMLElement(),{start:s,end:n}=this._parentGraph.getControlPostion(),o=this.getData(),r=n-s,{maxPrecision:a,diff:h}=this._getPrecision(r),l=1/2**a,c=s-s%l-l,d=n-n%l+2*l,_=h>this._precisionBarier&&h<1.5*this._precisionBarier,g=(h-this._precisionBarier)/(.5*this._precisionBarier);t.clearRect(0,0,e,i),t.font="24px Arial",t.fillStyle=w.colors.axis.text;for(let i=c;i<=d;i+=l){const n=o[Math.round((o.length-1)*i)],a=this._getText(n),h=(i-s)/r*e;t.textAlign=0===i?"start":1===i?"end":"center",_&&i/l%2==1&&(t.globalAlpha=g),t.fillText(a,h,30),t.globalAlpha=1}}_getPrecision(t=3){const e=Math.log(4/t)/this._precisionDenominator,i=Math.floor(e),s=e-i;return{maxPrecision:s>=this._precisionBarier?i+1:i,diff:s}}_getText(t=0,e=!1){if(this._textMap[t]&&!e)return this._textMap[t];{const i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],s=new Date(t);let n=i[s.getMonth()]+" "+s.getDate();if(this._textMap[t]=n,e){n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][s.getDay()]+", "+n}return n}}getLabel(t){const{start:e,end:i}=this._parentGraph.getControlPostion(),s=this.getData(),n=s.length-1,o=1/n,r=Math.round((e+(e%o&&o-e%o))*n),a=Math.round((i-i%o)*n);let h=Math.round(t*n);const l=((h=Math.min(Math.max(h,r),a))*o-e)/(i-e);return{value:s[h],text:this._getText(s[h],!0),layerPosition:l,idx:h}}redrawColor(){this.updateControlPosition()}}class m extends s{constructor(t,e,i){super(t,e),this._parentGraph=i,this.axisesArr=[],this.getHTMLElement().width=this.getHTMLElement().offsetWidth*w.QUALITY_MODIFIER,this.getHTMLElement().height=this.getHTMLElement().offsetHeight*w.QUALITY_MODIFIER}updateLimits(t,e){t=Math.max(t-Math.abs((e-t)*w.MAIN_PADDING_MODIFIER),0),e+=Math.abs((e-t)*w.MAIN_PADDING_MODIFIER);const i={min:t,max:e,opacity:0,active:!0};if(!this.axisesArr.length)return i.opacity=1,this._prevMin=t,this._prevMax=e,this.axisesArr.push(i),void this._drawAxis(i);{const s=this.axisesArr.find(i=>i.min===t&&i.max===e);this.axisesArr.forEach(t=>{t.active=!1}),s?s.active=!0:this.axisesArr.push(i),this._runAnimation()}}_clearCanvas(){const t=this.getHTMLElement().getContext("2d"),{height:e,width:i}=this.getHTMLElement();t.clearRect(0,0,i,e)}_runAnimation(){this._animationLink&&cancelAnimationFrame(this._animationLink);const t=this.axisesArr.find(t=>t.active),e=t.min-this._prevMin,i=t.max-this._prevMax,s=(t=1)=>{this._prevMin+=e/15,this._prevMax+=i/15,this._clearCanvas(),this.axisesArr=this.axisesArr.filter(t=>(t.active&&t.opacity<1?t.opacity=Math.min(t.opacity+1/15,1):t.active||(t.opacity=Math.max(t.opacity-1/15,0)),t.opacity>0&&(this._drawAxis(t),!0))),this._animationLink=requestAnimationFrame(()=>{t<15&&s(++t)})};s()}_drawAxis({min:t,max:e,opacity:i}){const s=this._prevMin,n=this._prevMax,o=this.getHTMLElement().getContext("2d");o.font="lighter 26px sans-serif",o.textAlign="left",o.fillStyle=w.colors.axis.text,o.strokeStyle=w.colors.axis.line,o.lineWidth=1.5*w.QUALITY_MODIFIER;const r=((e-=.2*(e-t))-t)/5,a=n-s,{height:h,width:l}=this.getHTMLElement();for(let c=t;c<=e+.001;c+=r)if(c>=s-.001&&c<n+.001){o.globalAlpha=i;const t=h*(1-(c-s)/a);o.beginPath(),o.moveTo(0,t-3),o.lineTo(l,t-3),o.stroke(),o.fillText(this._getValue(c),0,t-10)}}_getValue(t){return(t=Math.round(t))>=1e3&&t<1e6?Math.round(t/100)/10+"k":t>=1e6?Math.round(t/1e5)/10+"m":t}redrawColor(){this._clearCanvas(),this.axisesArr.forEach(t=>this._drawAxis(t))}}class u extends s{constructor(t,e,i,s,n){super(t,e),this._mainGraph=i,this._descriptionLayer=s,this._detectionLayer=n,t.height=t.offsetHeight,t.width=t.offsetWidth,this._detectionLayer.addEventListener("mousemove",this._onMouseMove.bind(this)),this._detectionLayer.addEventListener("touchmove",this._onTouchMove.bind(this)),this._detectionLayer.addEventListener("touchstart",this._onTouchMove.bind(this)),this._detectionLayer.addEventListener("mouseout",this._onMouseOut.bind(this)),window.addEventListener("touchstart",this._onMouseOut.bind(this))}_onTouchMove(t){const e=t.touches[0].clientX-this._detectionLayer.getBoundingClientRect().left;t.stopPropagation(),this._onMouseMove({offsetX:e})}_onMouseMove({offsetX:t}){const e=this._getLabelsFromOffset(t);this._redrawCursor(e)}_onMouseOut(){const t=this.getHTMLElement().getContext("2d"),{height:e,width:i}=this.getHTMLElement();t.clearRect(0,0,i,e),this._descriptionLayer.innerHTML=""}_redrawCursor(t){const e=this.getHTMLElement().getContext("2d"),i=this.getData(),{height:s,width:n}=this.getHTMLElement(),o=t.layerPosition*n,r=this._mainGraph._mainChart.getActiveLineValuesByIndex(t.idx);e.clearRect(0,0,n,s),e.strokeStyle=w.colors.cursor.line,e.beginPath(),e.moveTo(o,0),e.lineTo(o,s),e.stroke(),r.forEach(t=>{const n=s*(1-t.layerPosition),r=i.colors[t.key];e.fillStyle=r,e.beginPath(),e.arc(o,n,5,0,2*Math.PI),e.fill(),e.fillStyle=w.colors.appWrapper.backgroundColor,e.beginPath(),e.arc(o,n,3,0,2*Math.PI),e.fill()}),this._descriptionLayer.innerHTML="";const a=document.createElement("div");a.style.cssText=`\n\t\t\tposition: absolute; \n\t\t\tbackground: ${w.colors.cursor.background}; \n\t\t\tpadding: 3px 12px;\n\t\t\tborder: 1px solid ${w.colors.cursor.border};\n\t\t\tbox-shadow: 0px 2px 4px -1px rgba(0,0,0,0.15);\n\t\t\ttop: 10px;\n\t\t\twhite-space: nowrap;\n\t\t\tborder-radius: 3px`,a.innerHTML=`\n\t\t\t<div style="font:14px sans-serif; font-weight: 500; margin-bottom: 6px; color: ${w.colors.cursor.text}">${t.text}</div>\n\t\t\t<div style="display: flex">\n\t\t\t\t${r.map(t=>`\n\t\t\t\t\t\t<div style="color: ${i.colors[t.key]}; margin-right: 14px;">\n\t\t\t\t\t\t\t<div style="font: 16px Arial; font-weight: 700;">${this._mainGraph._yAxis._getValue(t.value)}</div>\n\t\t\t\t\t\t\t<div style="font: 12px Arial; font-weight: 200;">${i.names[t.key]}</div>\n\t\t\t\t\t\t</div>`).join("")}\n\t\t\t</div>`,this._descriptionLayer.append(a);const h=a.offsetWidth;let l=this._descriptionLayer.offsetWidth*t.layerPosition-h/2;l=Math.max(Math.min(l,this._descriptionLayer.offsetWidth-h),0),a.style.left=l+"px"}_getLabelsFromOffset(t){const{start:e,end:i}=this._mainGraph.getControlPostion(),s=t/this.getHTMLElement().offsetWidth*(i-e)+e;return this._mainGraph.xAxis.getLabel(s)}}class f extends s{constructor(t,e){super(t,e),this._mainChartWrapperInit(),this._previewControlInit(),this._togglersControlsInit()}_mainChartWrapperInit(){const t=this.getData(),{xAxisLayer:e,yAxisLayer:i,linesContainer:s,selectorLayer:n,selectorDescriptionLayer:o,selectorDetectionLayer:r}=c(this.getHTMLElement());this._mainChart=new g(s,this.getData(),this);const a=t.columns.find(e=>"x"===t.types[e[0]]).slice(1);this.xAxis=new p(e,a,this),this._yAxis=new m(i,null,this),this._selectorLayer=new u(n,this.getData(),this,o,r),this._mainChart.limitsUpdated=((t,e)=>{this._yAxis.updateLimits(t,e)})}_previewControlInit(){const{previewContainer:t,chartLayer:e,controlLayer:i}=a(this.getHTMLElement());this._previewChart=new r(t,e,i,this.getData(),this),this._previewChart.onControlChange=(()=>{this.xAxis.updateControlPosition(),this._mainChart.frameChanged()}),this._previewChart.onControlChange()}_togglersControlsInit(){const t=this.getData();this._togglersContainer=h(this.getHTMLElement()),this._togglersList=Object.keys(t.names).map(e=>{const i={key:e,name:t.names[e],color:t.colors[e]},{htmlContainer:s,canvasLayer:n,effectCanvasLayer:o}=l(this._togglersContainer,i.name);return new d(s,n,i,o,this)})}getTogglersList(){return this._togglersList}chartToggled(t,e){this._previewChart.toggleLine(t,e),this._mainChart.toggleLine(t,e)}getControlPostion(){return this._previewChart.controlPosition}redrawColors(){this._togglersList.forEach(t=>t.redrawColor()),this._previewChart.redrawColor(),this.xAxis.redrawColor(),this._yAxis.redrawColor()}}var x=function(t,e){const i=document.createElement("div");return i.id=`graph-container-${e}`,i.style.cssText="width: 450px;position: relative; max-width: 100%; padding: 10px; margin: 10px auto; box-sizing: border-box",t.append(i),i},M=function(t){const e=document.createElement("div");return t.style.paddingBottom="150px",e.style.cssText="position: fixed; bottom: 0; width: 100%; height: 150px; display: flex; justify-content: center; align-items: center; font-family: sans-serif; z-index: 10; user-select: none; -webkit-user-select: none; font-weight: 300",t.append(e),e},L={appWrapper:{backgroundColor:"#ffffff"},colorSwitcher:{textColor:"#2096e6"},lineToggler:{borderColor:"#e9eef2",textColor:"#525759",rippleColor:"blue"},previewChart:{overlay:"rgba(246, 249, 255, 0.8)",activeFrame:"rgba(10, 10, 255, 0.1)"},axis:{text:"#a0abb3",line:"#f4f5f6"},cursor:{line:"rgba(181, 186, 189, 0.8)",text:"#323232",background:"#ffffff",border:"#e6e6e6"}},y={appWrapper:{backgroundColor:"#343f4d"},colorSwitcher:{textColor:"#45b1f3"},lineToggler:{borderColor:"#435566",textColor:"#ebeef0",rippleColor:"white"},previewChart:{overlay:"rgba(45, 57, 70, 0.7)",activeFrame:"rgba(91, 100, 150, 0.5)"},axis:{text:"#627484",line:"#394453"},cursor:{line:"rgba(89, 107, 124, 0.8)",text:"#ffffff",background:"#354250",border:"#303c49"}};var w=new class{constructor(){this._element=null,this._data=null,this._graphList=null,this.QUALITY_MODIFIER=2,this.PREVIEW_PADDING_MODIFIER=.1,this.MAIN_PADDING_MODIFIER=.1,this.TICKS_COUNT=5,this.colors=L}setElement(t){this._element=t}drawData(t){this._data=t,this._graphList=t.map((t,e)=>new f(x(this._element,e),t)),this._styleSwitcherContainer=M(this._element),this._styleSwitcherContainer.addEventListener("mousedown",this._switchColors.bind(this)),this._updateStyleSwitcher()}_switchColors(){this.colors=this.colors===L?y:L,this._updateStyleSwitcher(),this._graphList.forEach(t=>t.redrawColors())}getData(){return this._data}_updateStyleSwitcher(){const t=this.colors===L?"Switch to Night Mode":"Switch to Day Mode";this._styleSwitcherContainer.innerHTML=t,this._styleSwitcherContainer.style.backgroundColor=this.colors.appWrapper.backgroundColor,this._styleSwitcherContainer.style.color=this.colors.colorSwitcher.textColor,this._element.style.backgroundColor=this.colors.appWrapper.backgroundColor}};i(0);(()=>{const t=function(){const t=document.querySelector("body"),e=document.createElement("div");return t.append(e),e.id="graph-application",t.style.cssText="margin: 0",e.style.cssText="width: 100%; height: 100%; display: flex; flex-direction: column; position: relative",e}();w.setElement(t),function(t,e){const i=new XMLHttpRequest;i.open("GET",t),i.responseType="json",i.onload=(()=>e(i.response)),i.send()}("./chart_data.txt",t=>{w.drawData(t)})})()}]);