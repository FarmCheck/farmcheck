(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"528d31daf8f585bec00b":function(e,n,t){"use strict";var a=t("16ed5e814ccb32d55f28"),c=t("8e6d34d5e2b1c9c449c0");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(t("2c62cf50f9b98ad5e2af")),u=c(t("279f1c7ef5f95c5d63e2")),d=c(t("51d481168de86b8d3518")),s=c(t("6982c1e380225edecb61")),l=c(t("19e15e7ca84589004246")),r=c(t("66f6f74ce0dacb46302a")),f=c(t("6b516fd2a35c7f9ebca4")),i=c(t("b124e4d9dcf542735a28")),p=a(t("8af190b70a6bc55c6f1b")),b=c(t("b912ecc4473ae8a2ff0b")),h=function(e){(0,f.default)(t,e);var n=(0,i.default)(t);function t(e){var a;(0,l.default)(this,t),(a=n.call(this,e)).handleChange=function(e){var n=a.props,t=n.disabled,c=n.onChange;t||("checked"in a.props||a.setState({checked:e.target.checked}),c&&c({target:(0,s.default)((0,s.default)({},a.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},a.saveInput=function(e){a.input=e};var c="checked"in e?e.checked:e.defaultChecked;return a.state={checked:c},a}return(0,r.default)(t,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,n=this.props,t=n.prefixCls,a=n.className,c=n.style,s=n.name,l=n.id,r=n.type,f=n.disabled,i=n.readOnly,h=n.tabIndex,y=n.onClick,k=n.onFocus,v=n.onBlur,m=n.onKeyDown,C=n.onKeyPress,K=n.onKeyUp,g=n.autoFocus,w=n.value,P=n.required,x=(0,d.default)(n,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),F=Object.keys(x).reduce((function(e,n){return"aria-"!==n.substr(0,5)&&"data-"!==n.substr(0,5)&&"role"!==n||(e[n]=x[n]),e}),{}),D=this.state.checked,N=(0,b.default)(t,a,(e={},(0,u.default)(e,"".concat(t,"-checked"),D),(0,u.default)(e,"".concat(t,"-disabled"),f),e));return p.default.createElement("span",{className:N,style:c},p.default.createElement("input",(0,o.default)({name:s,id:l,type:r,required:P,readOnly:i,disabled:f,tabIndex:h,className:"".concat(t,"-input"),checked:!!D,onClick:y,onFocus:k,onBlur:v,onKeyUp:K,onKeyDown:m,onKeyPress:C,onChange:this.handleChange,autoFocus:g,ref:this.saveInput,value:w},F)),p.default.createElement("span",{className:"".concat(t,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,n){return"checked"in e?(0,s.default)((0,s.default)({},n),{},{checked:e.checked}):null}}]),t}(p.Component);h.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}};var y=h;n.default=y}}]);